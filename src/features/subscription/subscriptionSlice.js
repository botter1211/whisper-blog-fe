import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
};

const slice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    buySubscription30Success(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    buySubscription180Success(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    buySubscription365Success(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default slice.reducer;

export const buySubscription30 = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post(`/subscriptions/30days`);
    dispatch(slice.actions.buySubscription30Success(response.data));
    toast.success("Buy Subscription successful");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};
export const buySubscription180 = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post(`/subscriptions/180days`);
    dispatch(slice.actions.buySubscription180Success(response.data));
    toast.success("Buy Subscription successful");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};
export const buySubscription365 = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post(`/subscriptions/365days`);
    dispatch(slice.actions.buySubscription365Success(response.data));
    toast.success("Buy Subscription successful");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};
