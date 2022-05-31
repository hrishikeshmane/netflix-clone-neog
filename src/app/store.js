import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import listReducer from "../features/mylist/listSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    mylist: listReducer,
  },
});
