import { Box } from "@mui/material";
import React from "react";

function PaymentPriceSelector({ onSelectPrice }) {
  const handlePriceChange = (e) => {
    onSelectPrice(e.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          p: 2,
          width: "100%",

          flexDirection: { xs: "column", md: "row" },
        }}
        display="flex"
        justifyContent="space-around"
      >
        <label>
          <input
            type="radio"
            name="price"
            value="5"
            onChange={handlePriceChange}
            defaultChecked
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
      </Box>
    </div>
  );
}

export default PaymentPriceSelector;
