// remitly.js
class Remitly {
    constructor() {
      this.exchangeRate = 0.0; // Default exchange rate
      this.extraCharges = 0.0; // Default extra charges
    }
  
    updateExchangeRate(newRate) {
      this.exchangeRate = parseFloat(newRate);
    }
  
    updateExtraCharges(newCharges) {
      this.extraCharges = parseFloat(newCharges);
    }
  
    getExchangeRate() {
      return this.exchangeRate;
    }
  
    getExtraCharges() {
      return this.extraCharges;
    }
  }
  
  export default Remitly;
  