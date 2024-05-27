import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./viewProducts.css";
import { cartContext } from "./App";

function ViewProducts() {
  const [dataFromApi, setDataFromApi] = useState("");
  let { cartItems, setCartItems } = useContext(cartContext);
  const [animateButton, setAnimateButton] = useState(null);

  let useLoc = useLocation();
  let selectedProductID = useLoc.state;

  useEffect(() => {
    async function getApiData() {
      let api = `https://fakestoreapi.com/products/${selectedProductID}`;

      try {
        let apiData = await axios.get(api);
        setDataFromApi(apiData.data);
      } catch (err) {
        console.error(err);
      }
    }

    getApiData();
  }, [selectedProductID]);

  function addToCart(item) {
    setCartItems((prev) => [...prev, item]);
  }

  function removeFromCart(itemId) {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  function handleCartAction(item) {
    if (cartItems.some((cartItem) => cartItem.id === item.id)) {
      removeFromCart(item.id);
    } else {
      addToCart(item);
    }
    setAnimateButton(item.id);
    setTimeout(() => setAnimateButton(null), 500);
  }

  return (
    <div className="container mt-5 ">
      {dataFromApi ? (
        <div
          className="row  align-items-center justify-content-center vh-75"
          style={{ marginTop: "120px" }}
        >
          <div className="col-md-6 ">
            <a
              href={dataFromApi.image}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={dataFromApi.image}
                alt={dataFromApi.title}
                className="img"
              />
            </a>
          </div>
          <div className="col-md-6">
            <h3 className="mb-3">{dataFromApi.title}</h3>
            <h4 className="mb-4">{dataFromApi.description}</h4>

            <div className="d-flex flex-column gap-2">
              <h5>
                <b className="me-3">
                  Rating :{"  "}
                  <span
                    className={`badge  ${
                      dataFromApi.rating.rate > 4 ? "bg-primary" : "bg-warning"
                    }`}
                  >
                    {dataFromApi.rating?.rate}
                  </span>
                </b>
              </h5>
              <h5>
                <b>
                  Price : {"  "} ₹ {dataFromApi.price}
                </b>
              </h5>

              <button
                className={`btn mt-auto w-50 ${
                  animateButton === dataFromApi.id ? "button-animate" : ""
                } ${
                  cartItems.some((cartItem) => cartItem.id === dataFromApi.id)
                    ? "btn-secondary"
                    : "btn-primary"
                }`}
                onClick={() => handleCartAction(dataFromApi)}
              >
                {cartItems.some((cartItem) => cartItem.id === dataFromApi.id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ViewProducts;
