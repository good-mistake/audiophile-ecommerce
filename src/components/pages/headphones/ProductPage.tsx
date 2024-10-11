import React from "react";
import { useParams } from "react-router-dom";

import Header from "../../reuseable/header/Header.tsx";
import Nav from "../../reuseable/header/nav/Nav.tsx";
import ProductList from "../../reuseable/product/ProductList.tsx";
import Footer from "../../reuseable/footer/Footer.tsx";
import "./headphones.scss";
interface ProductPageProps {
  category: string;
}
const ProductPage: React.FC<ProductPageProps> = () => {
  const { category } = useParams<{ category: string }>();
  return (
    <div className="headphoneContainer">
      <Header type="primary" title={category} />
      <div className="headphones">
        <ProductList category={category} others={false} />
      </div>
      <Nav />
      <Footer />
    </div>
  );
};

export default ProductPage;
