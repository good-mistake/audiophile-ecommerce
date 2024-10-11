import React from "react";
import "./footer.scss";
import CustomLink from "../customlink/CustomLink.tsx";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize.tsx";
const Footer = () => {
  const width = useWindowSize();
  const [imageSrc, setImageSrc] = useState(
    "/assets/shared/mobile/image-best-gear.jpg"
  );
  useEffect(() => {
    if (width <= 550) {
      setImageSrc("/assets/shared/mobile/image-best-gear.jpg");
    } else if (width > 550 && width <= 950) {
      setImageSrc("/assets/shared/tablet/image-best-gear.jpg");
    } else {
      setImageSrc("/assets/shared/desktop/image-best-gear.jpg");
    }
  }, [width]);
  return (
    <footer>
      <div className="topFooter">
        <img src={imageSrc} alt="best" />
        <div>
          <h3>
            Bringing you the <span>best</span> audio gear
          </h3>
          <p>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
      <div className="botFooter">
        <section>
          {" "}
          <div className="logo">
            <img src="/assets/shared/desktop/logo.svg" alt="Logo" />
          </div>
          <ul className="links">
            <CustomLink to="/">
              <li>home</li>
            </CustomLink>
            <CustomLink to="/headphones">
              <li>headphones</li>
            </CustomLink>
            <CustomLink to="/speakers">
              <li>speakers</li>
            </CustomLink>
            <CustomLink to="/earphones">
              <li>earphones</li>
            </CustomLink>
          </ul>
        </section>

        <p>
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>

        {width > 550 ? (
          <div className="copyrightLink">
            <p>Copyright 2021. All Rights Reserved</p>
            <div className="social">
              <img
                src="/assets/shared/desktop/icon-facebook.svg"
                alt="facebook"
              />
              <img
                src="/assets/shared/desktop/icon-twitter.svg"
                alt="twitter"
              />
              <img
                src="/assets/shared/desktop/icon-instagram.svg"
                alt="instagram"
              />
            </div>
          </div>
        ) : (
          <>
            <p>Copyright 2021. All Rights Reserved</p>
            <div className="social">
              <img
                src="/assets/shared/desktop/icon-facebook.svg"
                alt="facebook"
              />
              <img
                src="/assets/shared/desktop/icon-twitter.svg"
                alt="twitter"
              />
              <img
                src="/assets/shared/desktop/icon-instagram.svg"
                alt="instagram"
              />
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
