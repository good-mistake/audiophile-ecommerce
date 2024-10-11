import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CheckoutState {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  zipCode: string;
  address: string;
  city: string;
  country: string;
  payment: string;
  emoney: string;
  emoneyPin: string;
  errors: {
    fullName?: string;
    emailAddress?: string;
    phoneNumber?: string;
    zipCode?: string;
    address?: string;
    city?: string;
    country?: string;
    emoney?: string;
    emoneyPin?: string;
  };
}
const initialState: CheckoutState = {
  fullName: "",
  emailAddress: "",
  phoneNumber: "",
  zipCode: "",
  address: "",
  city: "",
  country: "",
  payment: "e-money",
  emoney: "",
  emoneyPin: "",
  errors: {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    zipCode: "",
    address: "",
    city: "",
    country: "",
    emoney: "",
    emoneyPin: "",
  },
};
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof CheckoutState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
      state.errors[action.payload.field] = "";
    },
    setError(
      state,
      action: PayloadAction<{
        field: keyof CheckoutState["errors"];
        message: string;
      }>
    ) {
      state.errors[action.payload.field] = action.payload.message;
    },
  },
});
export const { updateField, setError } = checkoutSlice.actions;

export default checkoutSlice.reducer;
