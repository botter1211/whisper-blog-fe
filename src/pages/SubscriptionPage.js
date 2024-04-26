import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "../features/subscription/Checkout";
import { Box, Card, Grid } from "@mui/material";
import MasterCard from "../components/MasterCard";

function SubscriptionPage() {
  const initialOptions = {
    "client-id":
      "AZENZqK31BnjjcY_ifwrGYf0a2Ohg0RN7entgVrg56G-EYkPi5gVDLmCjsPgyqe851QGlqY-EkZi_Elx",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item md={5} xs={12}>
          <MasterCard />
        </Grid>
        <Grid item md={7} xs={12}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ m: "auto" }}>
              <Checkout />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </PayPalScriptProvider>
  );
}

export default SubscriptionPage;
