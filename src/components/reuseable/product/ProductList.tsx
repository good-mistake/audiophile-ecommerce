import React from "react";
import data from "../../../data.json";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import Button from "../button/Button.tsx";
import CustomLink from "../customlink/CustomLink.tsx";
import "./product.scss";

interface ProductListProps {
  category: string;
}
const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const filteredProducts = data.filter((item) => item.category === category);
  const width = useWindowSize();
  const getImageSource = (product: any) => {
    if (width < 550) {
      return product.categoryImage.mobile;
    } else if (width < 770 && width > 551) {
      return product.categoryImage.tablet;
    } else {
      return product.categoryImage.desktop;
    }
  };
  return (
    <>
      {filteredProducts.map((product) => (
        <>
          <div className="productContainer" key={product.id}>
            <div>
              <img src={getImageSource(product)} alt="" />
            </div>
            <div>
              <p className="new">{product.new ? "NEW PRODUCT" : ""}</p>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <CustomLink to={`/${product.category}/${product.slug}`}>
                <Button variant="light" text="See Product" />
              </CustomLink>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default ProductList;
