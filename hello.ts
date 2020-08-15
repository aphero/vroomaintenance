// Goals
// Record fluid (gas, oil, transmission, wiper, radiator) and part replacements (NoSQL)
// name: Short description of what is being recorded. ie - oil, oil filter, air filter, cabin air filter, etc
// category: fluid or part, for now
// cost: Per quantity of item
// part_number: Manufacturer part number
// brand: Brand of the manufacturer
// quantity: Quantity of the item, by unit of measurement (approx)
// unit: Unit of measurement.  For parts, this will be left blank.

// in the case of an oil change you would record the following items
// oil,        fluid, $7,    1234, WIX,     4, quart
// oil filter, part,  $5.00, 5678, Castrol, 1

// `npx tsc --init` to initialize the TS compiler
// `npm init` to initialize package management
// `npm i @types/node` to gain access to node functionality with TS
// `git init` to initialize version control

import * as fs from "fs";

type units = "oz" | "q" | "gal";

interface Entry {
  name: string;
  category: string;
  cost: number;
  part_number?: string;
  brand: string;
  quantity: number;
  unit: units;
}

function recordEntry(params: Entry) {
  const { name, category, cost, part_number, brand, quantity, unit } = params;
  const filePath: string = "./data/maintLog.csv";

  // Write this so that the user inputs each value separately
  // Validate each input in real time so we can get a new value if needed
  // Record values to file once you have them all

  const buffer = new Buffer(
    `${name}, ${category}, ${cost}, ${part_number}, ${brand}, ${quantity}, ${unit}`
  );

  fs.open(filePath, "w", (err, fd) => {
    if (err) {
      throw "file could not be opened" + err;
    }
    fs.write(fd, buffer, 0, buffer.length, null, (err) => {
      if (err) throw "error writing to file: " + err;
      fs.close(fd, function () {
        console.log("record has been saved successfully");
      });
    });
  });
}

// function displayEntries() {
//   fs.readFile('./data/maintLog.csv', )
// }

const testParams: Entry = {
  name: "gas",
  category: "fuel",
  cost: 17.65,
  brand: "pilot",
  quantity: 10.4,
  unit: "gal",
};

recordEntry(testParams);
