import { createSlice } from "@reduxjs/toolkit";

interface HeaderState {
  isCartOpen: boolean;
  isNavOpen: boolean;
  headerType: "home" | "primary" | "secondary";
  isOverlayVisible: boolean;
}
const initialState: HeaderState = {
  isCartOpen: false,
  isNavOpen: false,
  headerType: "home",
  isOverlayVisible: false,
};
const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
      if (state.isCartOpen) {
        state.isNavOpen = false;
      }
      state.isOverlayVisible = state.isCartOpen || state.isNavOpen;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
      state.isOverlayVisible = state.isNavOpen;
    },
    toggleNav: (state) => {
      state.isNavOpen = !state.isNavOpen;
      if (state.isNavOpen) {
        state.isCartOpen = false;
      }
      state.isOverlayVisible = state.isNavOpen || state.isCartOpen;
    },
    setNavOpen: (state, action) => {
      state.isNavOpen = action.payload;
      state.isOverlayVisible = action.payload;
    },
    setHeaderType: (state, action) => {
      state.headerType = action.payload;
    },
    closeOverlay: (state) => {
      state.isOverlayVisible = false;
      state.isCartOpen = false;
      state.isNavOpen = false;
    },
  },
});

export const {
  toggleCart,
  toggleNav,
  setNavOpen,
  setHeaderType,
  closeCart,
  closeOverlay,
} = headerSlice.actions;
export default headerSlice.reducer;
