"use strict";
// Goals
// Record fluid (gas, oil, transmission, wiper, radiator) and part replacements (NoSQL)
// name: Short description of what is being recorded. ie - oil, oil filter, air filter, cabin air filter, etc
// category: fluid or part, for now
// cost: Per quantity of item
// part_number: Manufacturer part number
// brand: Brand of the manufacturer
// quantity: Quantity of the item, by unit of measurement (approx)
// unit: Unit of measurement.  For parts, this will be left blank.
exports.__esModule = true;
// in the case of an oil change you would record the following items
// oil,        fluid, $7,    1234, WIX,     4, quart
// oil filter, part,  $5.00, 5678, Castrol, 1
// `npx tsc --init` to initialize the TS compiler
// `npm init` to initialize package management
// `npm i @types/node` to gain access to node functionality with TS
// `git init` to initialize version control
var fs = require("fs");
function validateParam(val, T) {
    if (typeof val != T) {
        throw Error("");
    }
}
function paramIsString() {
    validateParam;
}
function paramIsNumber() { }
function paramInEnum() { }
function recordEntry(params) {
    var name = params.name, category = params.category, cost = params.cost, part_number = params.part_number, brand = params.brand, quantity = params.quantity, unit = params.unit;
    // Write this so that the user inputs each value separately
    // Validate each input in real time so we can get a new value if needed
    // Record values to file once you have them all
    paramIsString();
    var filePath = "./data/maintLog.csv";
    var buffer = new Buffer(name + ", " + category + ", " + cost + ", " + part_number + ", " + brand + ", " + quantity + ", " + unit);
    fs.open(filePath, "w", function (err, fd) {
        if (err) {
            throw "file could not be opened" + err;
        }
        fs.write(fd, buffer, 0, buffer.length, null, function (err) {
            if (err)
                throw "error writing to file: " + err;
            fs.close(fd, function () {
                console.log("record has been saved successfully");
            });
        });
    });
}
// function displayEntries() {
//   fs.readFile('./data/maintLog.csv', )
// }
var testParams = {
    name: "gas",
    category: "fuel",
    cost: 17.65,
    brand: "pilot",
    quantity: 10.4,
    unit: "gal"
};
recordEntry(testParams);
