import React, { useContext } from "react";
import { cartContext } from "./App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function BuyNow() {
  const { cartItems, setCartItems, orderedItems, setOrderedItems } =
    useContext(cartContext);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + Math.floor(item.price),
    0
  );

  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Order placed successfully",
    });

    setOrderedItems([...cartItems, ...orderedItems]);

    setTimeout(() => {
      setCartItems([]);
      navigate("/");
    }, 3000);
  }

  return (
    <div className="container mt-5">
      {cartItems.length > 0 ? (
        <div>
          <h2>Buy Now</h2>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    // required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    // required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    rows="3"
                    // required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="payment" className="form-label">
                    Payment Method
                  </label>
                  <select className="form-select" id="payment">
                    <option value="">Select Payment Method</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Place Order
                </button>
              </form>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <div className="card mb-5">
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <ul className="list-group list-group-flush">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span className="item-title">
                          {item.title.length > 15
                            ? item.title.slice(0, 15) + "..."
                            : item.title}
                        </span>
                        <span className="item-price">
                          ₹ {Math.floor(item.price)}0
                        </span>
                      </li>
                    ))}
                  </ul>
                  <h5 className="mt-4 text-end">
                    <b> Total: ₹ {totalAmount}0 </b>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "70vh" }}
        >
          <h4 className="fw-bold">
            Your cart is empty <i className="bi bi-cart"></i>
          </h4>
          <h4 className="fw-bold">You have no products to buy</h4>
        </div>
      )}
    </div>
  );
}

export default BuyNow;
