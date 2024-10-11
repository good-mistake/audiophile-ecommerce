import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../../../data.json";
import Button from "../../button/Button.tsx";
import useWindowSize from "../../../hooks/useWindowSize.tsx";
import NumberInput from "../../number/NumberInput.tsx";
import "./productDetail.scss";
import Header from "../../header/Header.tsx";
import CustomLink from "../../customlink/CustomLink.tsx";
import Nav from "../../header/nav/Nav.tsx";
import Footer from "../../footer/Footer.tsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/addToCartSlice.ts";
import { useEffect } from "react";
const ProductDetail: React.FC = () => {
  const { category, product } = useParams();
  const width = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState<number>(1);
  const currentProduct = data.find(
    (item) => item.category === category && item.slug === product
  );
  if (!currentProduct) {
    return <div>Product not found</div>;
  }
  const handleAddToCart = () => {
    const product = {
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      quantity,
      image: currentProduct.image,
    };

    dispatch(addToCart(product));
  };
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const getImageSource = (product: any) => {
    if (width < 550) {
      return product.image.mobile.substring(1);
    } else if (width <= 770 && width > 550) {
      return product.image.tablet.substring(1);
    } else {
      return product.image.desktop.substring(1);
    }
  };
  const getImageGallery = (product: any, key: string) => {
    if (width < 550) {
      return product.gallery[key].mobile.substring(1);
    } else if (width <= 770 && width > 550) {
      return product.gallery[key].tablet.substring(1);
    } else {
      return product.gallery[key].desktop.substring(1);
    }
  };
  const getImageOther = (product: any, index: number) => {
    if (width < 550) {
      return product.others[index].image.mobile.substring(1);
    } else if (width <= 770 && width > 550) {
      return product.others[index].image.tablet.substring(1);
    } else {
      return product.others[index].image.desktop.substring(1);
    }
  };
  return (
    <>
      <Header type="secondary" title="" />
      <Button variant="goBack" text="Go Back" onClick={() => navigate(-1)} />
      <div className="productDetail">
        <section className="desc">
          <div>
            <img
              src={getImageSource(currentProduct)}
              alt={currentProduct.name}
            />
          </div>
          <div className="detailsContainerProduct">
            <p className="new">{currentProduct.new ? "NEW PRODUCT" : ""}</p>
            <h3>{currentProduct.name}</h3>
            <p className="desc">{currentProduct.description}</p>
            <p className="price">$ {currentProduct.price?.toLocaleString()}</p>
            <div className="numberAndButton">
              <NumberInput
                value={quantity}
                plus={increment}
                minus={decrement}
              />{" "}
              <Button
                onClick={handleAddToCart}
                variant="light"
                text="Add to Cart"
              />
            </div>
          </div>
        </section>
        <section className="featuresAndBox">
          <div className="features">
            <h4>FEATURES</h4>
            <p>{currentProduct.features}</p>
          </div>
          <div className="box">
            <h4>in the box</h4>
            <ul>
              {currentProduct.includes.map((e) => {
                return (
                  <li>
                    <span>{e.quantity}x</span> {e.item}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="gallery">
          <img src={getImageGallery(currentProduct, "first")} alt="Gallery1" />
          <img src={getImageGallery(currentProduct, "second")} alt="Gallery2" />
          <img src={getImageGallery(currentProduct, "third")} alt="Gallery3" />
        </section>

        <div className="like">
          <h4>You May Also Like</h4>
          <ul>
            {currentProduct.others.map((relatedProduct, index) => (
              <li key={index}>
                <img
                  src={getImageOther(currentProduct, index)}
                  alt={relatedProduct.name}
                />
                <h3>{relatedProduct.name}</h3>

                <CustomLink
                  to={`/${
                    relatedProduct.slug.split("-").slice(-1)[0] === "speaker"
                      ? "speakers"
                      : relatedProduct.slug.split("-").slice(-1)[0]
                  }/${relatedProduct.slug}`}
                >
                  <Button variant="light" text="See Product" />
                </CustomLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Nav />
      <Footer />
    </>
  );
};

export default ProductDetail;
