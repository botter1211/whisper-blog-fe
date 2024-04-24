import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Checkout from "../features/subscription/Checkout";
import { Box, Card, Typography } from "@mui/material";

function SubscriptionPage() {
  const initialOptions = {
    "client-id":
      "AZENZqK31BnjjcY_ifwrGYf0a2Ohg0RN7entgVrg56G-EYkPi5gVDLmCjsPgyqe851QGlqY-EkZi_Elx",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: "400px", p: 2 }}>
          <Checkout />
        </Card>
      </Box>
    </PayPalScriptProvider>
  );
}

export default SubscriptionPage;
