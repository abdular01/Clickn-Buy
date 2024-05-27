import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { cartContext } from "./App";
import { useNavigate } from "react-router-dom";

function Home() {
  const [dataFromApi, setDataFromApi] = useState([]);
  const [animateButton, setAnimateButton] = useState(null);
  let { cartItems, setCartItems } = useContext(cartContext);

  let navigate = useNavigate();

  useEffect(() => {
    async function getApiData() {
      let api = "https://fakestoreapi.com/products";

      try {
        let apiData = await axios.get(api);
        setDataFromApi(apiData.data);
      } catch (err) {
        console.error(err);
      }
    }

    getApiData();
  }, []);

  function onClickProductView(id) {
    navigate("/viewproducts", { state: id });
  }

  function addToCart(item) {
    setCartItems((prev) => [...prev, item]);
  }

  function removeFromCart(itemId) {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  function handleCartAction(event, item) {
    event.stopPropagation();
    if (cartItems.some((cartItem) => cartItem.id === item.id)) {
      removeFromCart(item.id);
    } else {
      addToCart(item);
    }
    setAnimateButton(item.id);
    setTimeout(() => setAnimateButton(null), 500);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {dataFromApi.map((item) => (
          <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-4 aa">
            <div
              onClick={() => onClickProductView(item.id)}
              className="card h-100 pt-5"
            >
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body d-flex flex-column">
                <div className="mb-3">
                  <h5 className="card-title">
                    {item.title.length > 20
                      ? item.title.slice(0, 20) + "..."
                      : item.title}
                  </h5>
                  <p className="card-text">
                    <b>Category:</b> {item.category}
                  </p>
                  <p className="card-text">
                    <b>Rating:</b>{" "}
                    <span
                      className={`badge ${
                        item.rating.rate > 4 ? "bg-primary" : "bg-warning"
                      }`}
                    >
                      {item.rating?.rate}
                    </span>
                  </p>
                  <p className="card-text">
                    <b>Price: ₹ {Math.floor(item.price)}0</b>
                  </p>
                </div>
                <button
                  className={`btn mt-auto ${
                    animateButton === item.id ? "button-animate" : ""
                  } ${
                    cartItems.some((cartItem) => cartItem.id === item.id)
                      ? "btn-secondary"
                      : "btn-primary"
                  }`}
                  onClick={(event) => handleCartAction(event, item)}
                >
                  {cartItems.some((cartItem) => cartItem.id === item.id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
