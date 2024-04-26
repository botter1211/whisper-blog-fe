import React, { useState } from "react";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  buySubscription180,
  buySubscription30,
  buySubscription365,
} from "./subscriptionSlice";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import PaymentPriceSelector from "./PaymentPriceSelector";
import { Box, Typography } from "@mui/material";

const Checkout = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  const [selectedPrice, setSelectedPrice] = useState(5);

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
  };
  const totalPrice = parseInt(selectedPrice);
  console.log(totalPrice);
  const { user } = useAuth();
  const navigate = useNavigate();
  const redispatch = useDispatch();

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalPrice,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then(() => {
      // if (totalPrice === 5) {
      //   redispatch(buySubscription30())
      //     .then(() => navigate(`/user/${user._id}`))
      //     .then(() => navigate(0));
      // }
      // if (totalPrice === 25) {
      //   redispatch(buySubscription180())
      //     .then(() => navigate(`/user/${user._id}`))
      //     .then(() => navigate(0));
      // } else if (totalPrice === 50) {
      //   redispatch(buySubscription365())
      //     .then(() => navigate(`/user/${user._id}`))
      //     .then(() => navigate(0));
      // }
      switch (totalPrice) {
        case 5:
          redispatch(buySubscription30())
            .then(() => navigate(`/user/${user.slug}`))
            .then(() => navigate(0));
          break;
        case 25:
          redispatch(buySubscription180())
            .then(() => navigate(`/user/${user.slug}`))
            .then(() => navigate(0));
          break;
        case 50:
          redispatch(buySubscription365())
            .then(() => navigate(`/user/${user.slug}`))
            .then(() => navigate(0));
          break;

        default:
          break;
      }
    });
  };

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <Box p={3}>
            <Typography>Only subscription can write blogs.</Typography>
            <Typography>
              We have 3 subscription packages for you to choose from
            </Typography>
          </Box>
          <PaymentPriceSelector onSelectPrice={handlePriceSelect} />
          <Typography sx={{ py: 5, px: 4 }} variant="h6" fontWeight={600}>
            You choose: {selectedPrice}$
          </Typography>

          <PayPalButtons
            forceReRender={[totalPrice]}
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
};

export default Checkout;
