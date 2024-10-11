import { createSlice } from "@reduxjs/toolkit";
interface FormState {
  radio: string;
  text: string;
  number: number;
}
const initialState: FormState = {
  text: "",
  radio: "option1",
  number: 1,
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    plus: (state) => {
      state.number += 1;
    },
    minus: (state) => {
      if (state.number > 0) state.number -= 1;
    },
  },
});
export const { setText, setRadio, plus, minus } = formSlice.actions;
export default formSlice.reducer;
