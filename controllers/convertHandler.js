function ConvertHandler() {
  
  this.getNum = function(input) {
   
    let unitIndex = input.search(/[a-z]/i);
    if (unitIndex === -1) unitIndex = input.length;
    let numStr = input.slice(0, unitIndex);
    
    // Default to 1
    if (numStr === "") return 1;
    
    // Check for double fractions 
    let splitNum = numStr.split('/');
    if (splitNum.length > 2) return "invalid number";
    
    // Handle fractions and decimals
    try {
      if (splitNum.length === 2) {
        // It's a fraction: divide the numerator by denominator
        let numerator = parseFloat(splitNum[0]);
        let denominator = parseFloat(splitNum[1]);
        if (isNaN(numerator) || isNaN(denominator)) return "invalid number";
        return numerator / denominator;
      } else {
        // It's a whole number or decimal
        let result = parseFloat(numStr);
        return isNaN(result) ? "invalid number" : result;
      }
    } catch(e) {
      return "invalid number";
    }
  };
  
  this.getUnit = function(input) {
    let unitIndex = input.search(/[a-z]/i);
    if (unitIndex === -1) return "invalid unit";
    
    let result = input.slice(unitIndex).toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (!validUnits.includes(result)) return "invalid unit";
    
    // Liter must be uppercase 'L', everything else lowercase
    return result === 'l' ? 'L' : result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'L':   result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg':  result = initNum / lbsToKg; break;
      case 'mi':  result = initNum * miToKm; break;
      case 'km':  result = initNum / miToKm; break;
      default: return undefined;
    }
    
    // Round to 5 decimal places
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
