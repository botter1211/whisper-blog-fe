import React from "react";

function PaymentPriceSelector({ onSelectPrice }) {
  const handlePriceChange = (e) => {
    onSelectPrice(e.target.value);
  };
  return (
    <div>
      <label>
        <input
          type="radio"
          name="price"
          value="5"
          onChange={handlePriceChange}
        />
        30 days (5$)
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="price"
          value="25"
          onChange={handlePriceChange}
        />
        180 days (25$)
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="price"
          value="50"
          onChange={handlePriceChange}
        />
        365 days (50$)
      </label>
    </div>
  );
}

export default PaymentPriceSelector;
