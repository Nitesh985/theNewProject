import React from "react";
import useUserContext from "../context/UserContext";
import Carousel from "../utils/Carousel";
import { Link } from "react-router-dom";
import shopAd from "./homepage.png";
import shirt1 from "./Shirt3.jpg";
import shirt3 from "./casualShirt.jpg";
import shirt2 from "./Shirt2.jpg";

import "../home.css";
function Home() {
  return (
    <div className="main-container">
      <div class="container">
        <div class="text">
          <h1 class="h1">
            From wishlist to doorstep , making dreams tangible. Explore the
            magic of shopping at Dokan
          </h1>
          <Link to="/product">
            <button class="btn rounded-3xl bg-white w-[100px]">
              Explore now
            </button>
          </Link>
        </div>
        <img class="img" src={shopAd} width="400px" alt="pic" />
      </div>
      <div class="slider"></div>
      <div>
        <h1 className="latest-product-header">Latest Products</h1>
        <div className="products">
          <div className="product-container">
            <img className="pro-img" src={shirt1} alt="Shirt 1" />
            <p className="pro-description">Plane shirt </p>
            <p className="pro-price">$20.00</p>
          </div>
          <div className="product-container">
            <img className="pro-img" src={shirt2} alt="Shirt 2" />
            <p className="pro-description">Shirt 2</p>
            <p className="pro-price">$25.00</p>
          </div>
          <div className="product-container">
            <img className="pro-img" src={shirt3} alt="Shirt 3" />
            <p className="pro-description"> Shirt 3</p>
            <p className="pro-price">$30.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
