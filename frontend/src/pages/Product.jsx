import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../utils/Loader";
import useCart from "../context/CartContext";
import { Link } from "react-router-dom";
import { BsBookmarkStar } from "react-icons/bs";

function Product() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { cart, addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/v1/products/get-all-products")
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
  }, []);

  return (
    <Loader loading={loading}>
      <div className="flex flex-wrap p-10 gap-10 justify-center">
        {data &&
          data.map((product, index) => (
              <div
                key={index}
                className="card w-[300px] mt-4 hover:border hover:border-blue-500 bg-base-100 shadow-xl"
              >
            <Link
              to={`/product/p/${product._id}`}
            >
                <figure>
                  <img src={product.images[0].url} alt={product.name} />
                </figure>
            </Link>
                <div className="card-body">
                  <Link
                    to={`/product/${product._id}`}
                  >
                    <h2 className="card-title">{product.name}!</h2>
                  </Link>
                  <p>
                    {product.description.slice(0, 50)}
                    {product.description.slice(51) ? "..." : ""}
                  </p>
                  <div className="card-actions items-center justify-between">
                    <p className="text-green-500">{product.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const {_id, name, price, images} = product
                        addToCart({_id, name, price, images})
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
          ))}
      </div>
      
      <div className="join">
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-active">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button>
      </div>
    </Loader>
  );
}

export default Product;
