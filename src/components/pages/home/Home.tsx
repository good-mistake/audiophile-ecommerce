import React from "react";
import "./home.scss";
import Header from "../../reuseable/header/Header.tsx";
import Nav from "../../reuseable/header/nav/Nav.tsx";
import Button from "../../reuseable/button/Button.tsx";
import CustomLink from "../../reuseable/customlink/CustomLink.tsx";
import Footer from "../../reuseable/footer/Footer.tsx";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import { useState, useEffect } from "react";
const Home = () => {
  const width = useWindowSize();
  const [imageSrc, setImageSrc] = useState(
    "/assets/home/mobile/image-earphones-yx1.jpg"
  );
  useEffect(() => {
    if (width <= 550) {
      setImageSrc("/assets/home/mobile/image-earphones-yx1.jpg");
    } else if (width > 550 && width <= 770) {
      setImageSrc("/assets/home/tablet/image-earphones-yx1.jpg");
    } else {
      setImageSrc("/assets/home/desktop/image-earphones-yx1.jpg");
    }
  }, [width]);
  return (
    <main className="mainHome">
      <Header type="home" title="XX99 Mark II HeadphoneS" />
      <Nav />
      <div className="topMain">
        <img
          srcSet="
          /assets/home/mobile/image-speaker-zx9.png 480w,
          /assets/home/tablet/image-speaker-zx9.png 286w,
          /assets/home/desktop/image-speaker-zx9.png 1200w
        "
          sizes="(max-width: 600px) 480px,
        800px"
          src="/assets/home/mobile/image-speaker-zx9.png"
          alt="speaker"
        />
        <div>
          <h2>ZX9 SPEAKER</h2>
          <p>
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <CustomLink to="/speakers/zx9-speaker">
            <Button variant="dark" text="See Product" />
          </CustomLink>
        </div>
      </div>
      <div className="midMain">
        <h3>ZX7 SPEAKER</h3>
        <CustomLink to="/speakers/zx7-speaker">
          <Button variant="border" text="See Product"></Button>
        </CustomLink>
      </div>
      <div className="botMain">
        <img src={imageSrc} alt="earphone" />

        <div>
          <h3>YX1 EARPHONES</h3>
          <CustomLink to="/earphones/yx1-earphones">
            <Button variant="border" text="See Product" />
          </CustomLink>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
