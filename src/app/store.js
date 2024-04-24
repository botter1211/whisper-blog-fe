import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import blogReducer from "../features/blog/blogSlice";
import commentReducer from "../features/comment/commentSlice";
import followReducer from "../features/follow/followSlice";
import subscriptionReducer from "../features/subscription/subscriptionSlice";

const rootReducer = {
  user: userReducer,
  blog: blogReducer,
  comment: commentReducer,
  follow: followReducer,
  subscription: subscriptionReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
