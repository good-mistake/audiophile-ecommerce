import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNavOpen } from "../../../redux/headerSlice.ts";
import Button from "../../button/Button.tsx";
import "./nav.scss";
import CustomLink from "../../customlink/CustomLink.tsx";
import { useLocation } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize.tsx";
const Nav = () => {
  const isNavOpen = useSelector((state: RootState) => state.header.isNavOpen);
  const dispatch = useDispatch();
  const location = useLocation();
  const windowWidth = useWindowSize();
  useEffect(() => {
    const handlePopState = () => {
      dispatch(setNavOpen(false));
    };

    window.addEventListener("popstate", handlePopState);

    dispatch(setNavOpen(false));

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch, location]);
  return (
    <nav className={` ${isNavOpen === true ? "openNav" : "closeNav"}`}>
      <ul className={` ${isNavOpen === true ? "openUl" : "closeUl"}`}>
        {["headphones", "speakers", "earphones"].map((item, index) => (
          <li key={index} className={isNavOpen ? "open" : ""}>
            {" "}
            <img
              src={`/assets/shared/desktop/image-category-thumbnail-${item}.png`}
              alt={item}
              className="cover"
            />
            <CustomLink to={`/${item}`}>
              <p>{item.toUpperCase()}</p>
              <Button variant="shop" text="shop" />
            </CustomLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
