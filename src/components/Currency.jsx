import React from 'react';
import PreviousRate from './PreviousRate.jsx'


function Currency({charCode,Name,currencyValue,difference,onClickСurrency}) {

  const [isPreviousOpen, setIsPreviousOpen] = React.useState(false);
  const [previousItems, setPreviousItems] = React.useState([]);



  const onClickValute = async () => {
    setPreviousItems(await onClickСurrency(charCode));
    setIsPreviousOpen(!isPreviousOpen);
    console.log(previousItems);
  }

  const renderPreviousRate = () => {
    return (previousItems.map((item, index) => (
        <PreviousRate
          currentDate={item.Date}
          currencyValue={item.Value}
          difference={(item.Value - item.Previous * 100 / 100).toFixed(2)}
        />
    )))
  }
  
  return (
    <div>
      <div className="currency"
        onClick={onClickValute}>
        <p className="letterCode">{charCode}
        <span className="tooltiptext">{Name}</span></p>
        <p className="currencyValue">{currencyValue}</p>
        <p className="difference">{difference + " %"}</p>
      </div>
      {isPreviousOpen ? renderPreviousRate():null}

    </div>
    
  );
}

export default Currency;
