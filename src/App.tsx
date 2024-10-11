import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home.tsx";
import store from "./components/redux/store.ts";
import { Provider } from "react-redux";
import Headphones from "./components/pages/headphones/ProductPage.tsx";
import ProductDetail from "./components/reuseable/product/productDetail/ProductDetail.tsx";
import ScrollToTop from "./components/reuseable/scrolltop/Scroll.tsx";
import Checkout from "./components/pages/checkout/Checkout.tsx";
import ProductPage from "./components/pages/headphones/ProductPage.tsx";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/:category/:product" element={<ProductDetail />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
