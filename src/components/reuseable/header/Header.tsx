import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { toggleNav } from "../../redux/headerSlice.ts";
import { closeCart } from "../../redux/headerSlice.ts";
import "./header.scss";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import Cart from "./cart/Cart.tsx";
import Button from "../button/Button.tsx";
import CustomLink from "../customlink/CustomLink.tsx";
interface HeaderProps {
  type: "home" | "primary" | "secondary";
  title: string;
}

const Header: React.FC<HeaderProps> = ({ type, title }) => {
  const dispatch = useDispatch();
  const { isNavOpen, isCartOpen } = useSelector(
    (state: RootState) => state.header
  );
  const handleOverlayClick = () => {
    if (isCartOpen) {
      dispatch(closeCart());
    }
    if (isNavOpen) {
      dispatch(toggleNav());
    }
  };
  const width = useWindowSize();
  return (
    <header className={`header ${type}`}>
      {width < 578 && (
        <div className="headerContainer">
          <button
            onClick={() => dispatch(toggleNav())}
            className={`hamburger `}
          >
            <img
              src="/assets/shared/tablet/icon-hamburger.svg"
              alt="hamburger"
              className={`${isNavOpen ? "open" : ""}`}
            />
          </button>
          <CustomLink to="/" className="h">
            <div>
              <img src="/assets/shared/desktop/logo.svg" alt="Logo" />
            </div>
          </CustomLink>

          <Cart />
        </div>
      )}
      {width < 770 && width > 578 ? (
        <div className="headerContainer">
          <div className="tabletNav">
            <button
              onClick={() => dispatch(toggleNav())}
              className={`hamburger `}
            >
              <img
                src="/assets/shared/tablet/icon-hamburger.svg"
                alt="hamburger"
                className={`${isNavOpen ? "open" : ""}`}
              />
            </button>
            <CustomLink to="/" className="h">
              <div>
                <img src="/assets/shared/desktop/logo.svg" alt="Logo" />
              </div>
            </CustomLink>
          </div>

          <Cart />
        </div>
      ) : (
        ""
      )}
      {width > 770 && (
        <div className="headerContainer">
          <CustomLink to="/" className="h">
            <div>
              <img src="/assets/shared/desktop/logo.svg" alt="Logo" />
            </div>
          </CustomLink>
          <ul className={`headerDesktop`}>
            {["home", "headphones", "speakers", "earphones"].map(
              (item, index) => (
                <li key={index}>
                  <CustomLink to={`${item === "home" ? "/" : `/${item}`}`}>
                    <p>{item.toUpperCase()}</p>
                  </CustomLink>
                </li>
              )
            )}
          </ul>
          <Cart />
        </div>
      )}
      {isNavOpen || isCartOpen ? (
        <div className="overlay show" onClick={handleOverlayClick}></div>
      ) : null}
      {type === "home" ? (
        <div className="headerHome">
          <p className="new">NEW PRODUCT</p> <h1>{title}</h1>
          <p className="desc">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <CustomLink to="/headphones/xx99-mark-two-headphones">
            <Button variant="light" text="See Product" />
          </CustomLink>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
    </header>
  );
};

export default Header;
