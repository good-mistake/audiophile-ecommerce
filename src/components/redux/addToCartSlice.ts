import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
interface CartState {
  items: CartItem[];
}
const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        state.items.push(product);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeAllItems: (state) => {
      state.items = [];
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateItemQuantity,
  removeAllItems,
} = cartSlice.actions;
export default cartSlice.reducer;
