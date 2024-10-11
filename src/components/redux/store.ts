import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./headerSlice.ts";
import formReducer from "./formSlice.ts";
import cartReducer from "./addToCartSlice.ts";
import checkoutReducer from "./checkoutSlice.ts";
const store = configureStore({
  reducer: {
    header: headerReducer,
    form: formReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
