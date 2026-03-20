'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  // Define the GET route for the conversion API
  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    
    // Parse the number and unit from the input string
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

  
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.send("invalid number and unit");
    } else if (initNum === "invalid number") {
      return res.send("invalid number");
    } else if (initUnit === "invalid unit") {
      return res.send("invalid unit");
    }

    
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

   
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: toString
    });
  });

};
