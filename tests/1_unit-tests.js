const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      assert.equal(convertHandler.getNum('32L'), 32);
      done();
    });
    test('Decimal input', function(done) {
      assert.equal(convertHandler.getNum('3.2L'), 3.2);
      done();
    });
    test('Fractional input', function(done) {
      assert.equal(convertHandler.getNum('1/2L'), 0.5);
      done();
    });
    test('Fractional input with a decimal', function(done) {
      assert.equal(convertHandler.getNum('2.5/5L'), 0.5);
      done();
    });
    test('Error on a double-fraction', function(done) {
      assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
      done();
    });
    test('Default to 1 when no numerical input', function(done) {
      assert.equal(convertHandler.getNum('L'), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('Read each valid input unit', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele === 'l' || ele === 'L' ? 'L' : ele.toLowerCase());
      });
      done();
    });
    test('Error for an invalid input unit', function(done) {
      assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('Return unit for each valid input unit', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('Spelled-out string unit for each valid input unit', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('Convert gal to L', function(done) {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
      done();
    });
    test('Convert L to gal', function(done) {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
      done();
    });
    test('Convert mi to km', function(done) {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
      done();
    });
    test('Convert km to mi', function(done) {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
      done();
    });
    test('Convert lbs to kg', function(done) {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
      done();
    });
    test('Convert kg to lbs', function(done) {
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
      done();
    });
  });
});
