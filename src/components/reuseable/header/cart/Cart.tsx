import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toggleCart } from "../../../redux/headerSlice.ts";
import {
  updateItemQuantity,
  removeAllItems,
} from "../../../redux/addToCartSlice.ts";
import "./cart.scss";
import NumberInput from "../../number/NumberInput.tsx";
import Button from "../../button/Button.tsx";
import CustomLink from "../../customlink/CustomLink.tsx";
const Cart = ({ title = "Cart", checkout = false }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.header.isCartOpen);

  const dispatch = useDispatch();
  const cartRef = useRef<HTMLDivElement>(null);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (id: any, newQuantity: number) => {
    dispatch(updateItemQuantity({ id, quantity: newQuantity }));
  };
  const handleRemoveAll = () => {
    dispatch(removeAllItems());
  };

  const cleanName = (name: string) => {
    const keywordsToRemove = ["headphones", "earphones", "speakers"];

    const nameParts = name
      .split(" ")
      .filter((word) => !keywordsToRemove.includes(word.toLowerCase()))
      .join(" ");

    const regex = new RegExp("mark", "gi");
    return nameParts.replace(regex, () => "MK");
  };
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <>
      <div ref={cartRef} className="cartContainer">
        <div>
          <button
            onClick={() => dispatch(toggleCart())}
            aria-expanded={isCartOpen}
            aria-label="Toggle Cart"
            className="cartIcon"
          >
            <img src="/assets/shared/desktop/icon-cart.svg" alt="cart" />
            {totalItems > 0 && <span className="cartCount">{totalItems}</span>}
          </button>
        </div>
      </div>
      <div
        className={`cartDropdown ${isCartOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dropDownIntro">
          <p className="cartName">
            {title}
            {totalItems > 0 ? (
              <span className="cartCount">({totalItems})</span>
            ) : (
              <span className="cartCount">(0)</span>
            )}
          </p>
          <button className="removeAll" onClick={handleRemoveAll}>
            Remove all
          </button>
        </div>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="items">
                <div className="imgInCart">
                  <img src={item.image.mobile.substring(1)} alt={item.name} />
                </div>
                <div>
                  <p>{cleanName(item.name)}</p>
                  <p>${item.price.toLocaleString()}</p>
                </div>
                {checkout ? (
                  <p className="quantity">x{item.quantity}</p>
                ) : (
                  <NumberInput
                    value={item.quantity}
                    plus={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    minus={() =>
                      handleQuantityChange(
                        item.id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  />
                )}
              </div>
            ))}
            <div className="cartTotal">
              {checkout ? (
                <>
                  <h3>
                    Total <span>${totalPrice.toLocaleString()}</span>
                  </h3>
                  <h3>
                    SHIPPING <span>$50</span>
                  </h3>
                  <h3>
                    VAT (INCLUDED) <span>$ 1,079</span>
                  </h3>
                  <h3 className="grandTotal">
                    GRAND TOTAL{" "}
                    <span>${(totalPrice + 1079 + 50).toLocaleString()}</span>
                  </h3>
                </>
              ) : (
                <h3>
                  Total <span>${totalPrice.toLocaleString()}</span>
                </h3>
              )}
            </div>
            <CustomLink to="/checkout">
              <div className="checkout">
                <Button variant="light" text="checkout" />
              </div>
            </CustomLink>
          </>
        ) : (
          <p className="emptyCart">Your cart is empty.</p>
        )}
      </div>
    </>
  );
};

export default Cart;
