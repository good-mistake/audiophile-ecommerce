import React from "react";
import { useState, useEffect, useRef } from "react";
import Header from "../../reuseable/header/Header.tsx";
import Nav from "../../reuseable/header/nav/Nav.tsx";
import Button from "../../reuseable/button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import {
  updateField,
  setError,
  CheckoutState,
} from "../../redux/checkoutSlice.ts";
import "./checkout.scss";
import Cart from "../../reuseable/header/cart/Cart.tsx";
import Footer from "../../reuseable/footer/Footer.tsx";
import CustomLink from "../../reuseable/customlink/CustomLink.tsx";
import { clearCart } from "../../redux/addToCartSlice.ts";
const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.checkout);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [success, setSuccess] = useState<boolean>(false);
  const [resetCart, setResetCart] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const modalRef = useRef(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    dispatch(updateField({ field: name as keyof CheckoutState, value }));
    let errorMessage = "";

    if (name === "emailAddress") {
      if (!value.includes("@")) {
        errorMessage = "Invalid email address.";
      }
    } else if (name === "phoneNumber") {
      if (value.length < 10) {
        errorMessage = "Phone number is too short.";
      }
    } else if (name === "zipCode") {
      if (!value || parseInt(value) <= 0) {
        errorMessage = "ZIP Code must be a positive number.";
      }
    } else if (
      type === "text" &&
      (name === "fullName" ||
        name === "address" ||
        name === "city" ||
        name === "country")
    ) {
      if (!value) {
        errorMessage = "This field is required.";
      }
    }
    dispatch(
      setError({
        field: name as keyof CheckoutState["errors"],
        message: errorMessage,
      })
    );
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const requiredFields = [
      "fullName",
      "emailAddress",
      "phoneNumber",
      "address",
      "zipCode",
      "city",
      "country",
    ];
    let formHasErrors = false;

    requiredFields.forEach((field) => {
      if (!form[field as keyof CheckoutState]) {
        dispatch(
          setError({
            field: field as keyof CheckoutState["errors"],
            message: "This field is required.",
          })
        );
        formHasErrors = true;
      }
    });

    if (formHasErrors) {
      setFormError("Please fill all the inputs.");

      return;
    }
    setSuccess(true);
  };
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  const cleanName = (name: string) => {
    const keywordsToRemove = ["headphones", "earphones", "speakers"];

    const nameParts = name
      .split(" ")
      .filter((word) => !keywordsToRemove.includes(word.toLowerCase()))
      .join(" ");

    const regex = new RegExp("mark", "gi");
    return nameParts.replace(regex, () => "MK");
  };
  useEffect(() => {
    if (resetCart) {
      dispatch(clearCart());
    }
  }, [resetCart, dispatch]);
  useEffect(() => {
    if (success && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      document.body.style.overflow = "auto";
    }
  }, [success]);
  return (
    <main className={`mainCheckout ${success ? "restricted" : ""}`}>
      <Header type="secondary" title="" />
      <Button variant="goBack" text="Go Back" onClick={() => navigate(-1)} />
      <Nav />
      <form onSubmit={handleSubmit}>
        <section className="formInfo">
          <h2>CHECKOUT</h2>
          <fieldset className="billingDetailInfo">
            <h3>Billing details</h3>
            <label htmlFor="fullName">
              Name
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Alexei Ward"
                onChange={handleInputChange}
              />{" "}
              {form.errors?.fullName && (
                <p className="error">{form.errors.fullName}</p>
              )}
            </label>
            <label htmlFor="emailAddress">
              Email Address
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                placeholder="alexei@mail.com"
                onChange={handleInputChange}
              />{" "}
              {form.errors.emailAddress && (
                <p className="error">{form.errors.emailAddress}</p>
              )}
            </label>
            <label htmlFor="phoneNumber">
              Phone Number
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+1 202-555-0136"
                onChange={handleInputChange}
              />
              {form.errors.phoneNumber && (
                <p className="error">{form.errors.phoneNumber}</p>
              )}
            </label>
          </fieldset>
          <fieldset>
            <h3>shipping info</h3>
            <label htmlFor="address">
              Your Address
              <input
                type="text"
                id="address"
                name="address"
                placeholder="1137 Williams Avenue"
                onChange={handleInputChange}
              />{" "}
              {form.errors.address && (
                <p className="error">{form.errors.address}</p>
              )}
            </label>
            <label htmlFor="zipCode">
              ZIP Code
              <input
                type="number"
                id="zipCode"
                name="zipCode"
                placeholder="10001"
                onChange={handleInputChange}
              />{" "}
              {form.errors.zipCode && (
                <p className="error">{form.errors.zipCode}</p>
              )}{" "}
            </label>
            <label htmlFor="city">
              City
              <input
                type="text"
                id="city"
                name="city"
                placeholder="New York"
                onChange={handleInputChange}
              />{" "}
              {form.errors.city && <p className="error">{form.errors.city}</p>}
            </label>
            <label htmlFor="country">
              Country
              <input
                type="tel"
                id="country"
                name="country"
                placeholder="United States"
                onChange={handleInputChange}
              />{" "}
              {form.errors.country && (
                <p className="error">{form.errors.country}</p>
              )}
            </label>
          </fieldset>
          <fieldset className="radio">
            <h3>payment details</h3>
            <h5>Payment Method</h5>
            <label>
              <input
                type="radio"
                name="payment"
                value="e-money"
                checked={form.payment === "e-money"}
                onChange={handleInputChange}
              />
              e-Money
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={form.payment === "cash"}
                onChange={handleInputChange}
              />
              Cash on Delivery
            </label>
          </fieldset>
          <fieldset
            className={`${
              form.payment === "e-money" ? "showForm" : "hideForm"
            }`}
          >
            <label htmlFor="eMoney">
              e-Money Number
              <input
                type="number"
                id="eMoney"
                name="eMoney"
                checked={form.payment === "e-money"}
                onChange={handleInputChange}
                placeholder="238521993"
              />
            </label>
            <label htmlFor="pin">
              e-Money PIN
              <input
                type="num"
                id="pin"
                name="pin"
                checked={form.payment === "cash"}
                onChange={handleInputChange}
                placeholder="6891"
              />
            </label>
          </fieldset>

          {form.payment === "cash" && (
            <div className="cashPayment">
              <img
                src="/assets/checkout/icon-cash-on-delivery.svg"
                alt="confirmed"
              />
              <p>
                The ‘Cash on Delivery’ option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
              </p>
            </div>
          )}
        </section>
        <section className="formSummary">
          <Cart title="Summary" checkout />
          <Button variant="light" text="CONTINUE & PAY" type="submit" />
          {formError && <p className="error">{formError}</p>}
        </section>
        <div
          className={`confirmed ${
            success === true ? "showSuccess" : "hideSuccess"
          }`}
        >
          <div ref={modalRef} className={`confirmationContainer`}>
            <img
              src="/assets/checkout/icon-order-confirmation.svg"
              alt="confirmed"
            />
            <h2>
              THANK YOU <span>FOR YOUR ORDER</span>
            </h2>
            <p>You will receive an email confirmation shortly.</p>
            <div className="confirmationOrder">
              {cartItems.length > 0 && (
                <div>
                  <div>
                    <div>
                      <img
                        src={`${cartItems[0].image.mobile.substring(1)}`}
                        alt=""
                      />
                      <div>
                        <h4>{cleanName(cartItems[0].name)}</h4>
                        <p>${cartItems[0].price.toLocaleString()}</p>
                      </div>
                    </div>
                    {cartItems.length > 1 && (
                      <p className="moreItems">
                        and {cartItems.length - 1} other{" "}
                        {cartItems.length - 1 === 1 ? "item" : "item(s)"}
                      </p>
                    )}
                  </div>
                  <h4 className="grand">
                    Grand Total
                    <span> ${(totalPrice + 50 + 1079).toLocaleString()}</span>
                  </h4>
                </div>
              )}{" "}
            </div>
            <CustomLink to="/">
              <Button
                variant="light"
                text="BACK TO HOME"
                onClick={() => {
                  dispatch(clearCart());
                  localStorage.removeItem("cartItems");
                  setTimeout(() => {
                    setResetCart(true);
                    navigate("/");
                  }, 100);
                }}
              />
            </CustomLink>
          </div>
        </div>
      </form>
      <Footer />
    </main>
  );
};

export default Checkout;
