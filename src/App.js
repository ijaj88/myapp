// App.js
import React, { useState } from 'react';
//import { updateRemitlyExchangeRate, updateExtraCharges, getRemitlyExchangeRate, getExtraCharges } from './remitly';
//import { updateXeExchangeRate, updateExtraCharges, getXeExchangeRate, getExtraCharges} from './xe';
import './styles.css'; // Import your CSS file

import Remitly from './remitly';
import Xe from './xe';
const remitly = new Remitly();
const xe = new Xe();


function App() {
  const [usdToInrRate, setUsdToInrRate] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);
  const [remitlyExRate, setRemitlyExRate] = useState('');
  const [remitlyExtraCharge, setRemitlyExtraCharges] = useState('');
  const [xeExchangeRate, setXeExRate] = useState('');
  const [xeExtraCharges, setXeExtraCharges] = useState('');





  // Actual Exchage rate
  const handleUsdToInrRateChange = (event) => {
    setUsdToInrRate(parseFloat(event.target.value));
  };


  const handleUsdAmountChange = (event) => {
    setUsdAmount(parseFloat(event.target.value));
  };

  const calculateActualConvertedAmount = () => {
    const totalAmount = (usdAmount) * usdToInrRate;
    return totalAmount;
  };
  // Remitly Exchage 
  const handleRemitlyEx = (event) => {
    remitly.updateExchangeRate(event.target.value);
    setRemitlyExRate(event.target.value);
  };

  const handleRemitlyCharges = (event) => {
    remitly.updateExtraCharges(event.target.value);
    setRemitlyExtraCharges(event.target.value);
  };
  const calculateRemitlyConvertedAmount = () => {
    const remitlyExchangeRate = remitly.getExchangeRate();
    //console.log("Remitly Exchange Rate:", remitlyExchangeRate); // Log the exchange rate

    const remitlyExtraCharge = remitly.getExtraCharges();
    const totalAmount = (usdAmount - remitlyExtraCharge) * remitlyExchangeRate;
    return totalAmount;
  };
  //Xe Exchage rate
  const handleXeEx = (event) => {
    xe.updateExchangeRate(event.target.value);
    setXeExRate(event.target.value);
  };

  const handleXeCharges = (event) => {
    xe.updateExtraCharges(event.target.value);
    setXeExtraCharges(event.target.value);
  };
  const calculateXeConvertedAmount = () => {
    const xeExR = xe.getExchangeRate();
    //console.log("Remitly Exchange Rate:", remitlyExchangeRate); // Log the exchange rate

    const xeExC = xe.getExtraCharges();
    const totalAmount = (usdAmount - xeExC) * xeExR;
    return totalAmount;
  };
  const handleInrConvert = () => {
    const amount = 100000;
    const xeExR = xe.getExchangeRate();

    const xeExC = xe.getExtraCharges();
    const remitlyExchangeRate = remitly.getExchangeRate();
    const remitlyExtraCharge = remitly.getExtraCharges();

    var remitlyDeposit = 0;
    var  xeDeposit =0;
    if(remitlyExchangeRate !== 0)
    remitlyDeposit = amount / remitlyExchangeRate + remitlyExtraCharge;
    if(xeExR !== 0)
    xeDeposit = amount / xeExR + xeExC;
    return { remitlyDeposit, xeDeposit };
  };
  
  const diff = calculateXeConvertedAmount() - calculateRemitlyConvertedAmount();
  const { remitlyDeposit, xeDeposit } = handleInrConvert();

  return (
    <div className="container">
      <h1 className="header">Evaluate Your Rate</h1>

      {/* Actual Exchange Rate */}
      <div className="section">
        <h2>Actual Exchange Rate</h2>
        <label className="input-label">
          Enter Actual Exchange Rate (USD to INR):
          <input type="number" className="input-field" value={usdToInrRate} onChange={handleUsdToInrRateChange} />
        </label>
      </div>

      {/* Remitly Exchange Rate */}
      <div className="section">
        <h2>Remitly Exchange Rate</h2>
        <div>
          <label  className="input-label">
            Remitly Exchange Rate:
            <input type="number" className="input-field" value={remitlyExRate} onChange={handleRemitlyEx} />
          </label>
        </div>
        <div>
          <label>
            Extra Charges:
            <input type="number" className="input-field" value={remitlyExtraCharge} onChange={handleRemitlyCharges} />
          </label>
        </div>
      </div>

      {/* Xe Exchange Rate */}
      <div className="section">
        <h2>Xe Exchange Rate</h2>
        <div>
          <label>
            Xe Exchange Rate:
            <input type="number" className="input-field" value={xeExchangeRate} onChange={handleXeEx} />
          </label>
        </div>
        <div>
          <label>
            Extra Charges:
            <input type="number" className="input-field" value={xeExtraCharges} onChange={handleXeCharges} />
          </label>
        </div>
      </div>

      {/* Enter the Amount You Want to Convert */}
      <h2>Enter the Amount You Want to Convert</h2>
      <div>
        <label>
          Enter Amount in USD $:
          <input type="number" className="input-field" value={usdAmount} onChange={handleUsdAmountChange} />
        </label>
      </div>

      {/* Summary */}
      <div className="summary">
        <div className="summary-item">
          <div className="summary-title">Todays Exchage deposit</div>
          <div className="summary-value">Actual deposit : ₹{calculateActualConvertedAmount()}</div>
        </div>

        <div className="summary-item">
          <div className="summary-title">Remitly Offer</div>
          <div className="summary-value">
            Remitly deposits: ₹{calculateRemitlyConvertedAmount()} Extra charges with Remitly: ₹{calculateActualConvertedAmount() - calculateRemitlyConvertedAmount()}
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-title">Xe Offer</div>
          <div className="summary-value">
            Xe deposits: ₹{calculateXeConvertedAmount()} Extra charges with Xe: ₹{calculateActualConvertedAmount() - calculateXeConvertedAmount()}
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-title">Best Deal Today</div>
          <div>
            <h3>
              <span style={{ color: diff > 0 ? 'green' : 'red' }}>
                {diff > 0 ?
                  `Xe with ₹${diff} savings` :
                  `Remitly with ₹${-diff} savings`
                }
              </span>

            </h3>
            <h3>You should deposit ₹{remitlyDeposit.toFixed(2)} in Remitly Account and ₹{xeDeposit.toFixed(2)} in Xe Account for 1 Lakh INR</h3>

          </div>        
        </div>
      </div>
    </div>
  );


}

export default App;
