import React from 'react';

function PreviousRate({currentDate,currencyValue,difference}) {

  return (
    <div className="previousRate">
      <p className="currentDate">{new Date(currentDate).toLocaleDateString()}</p>
      <p className="currencyValue">{currencyValue}</p>
      <p className="difference">{difference + " %"}</p>
    </div>
  );
}

export default PreviousRate;
