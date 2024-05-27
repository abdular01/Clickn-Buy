import React, { useContext } from "react";
import { cartContext } from "./App";

function Orders() {
  const { orderedItems, setOrderedItems } = useContext(cartContext);

  console.log(orderedItems);

  return (
    <div className="container mt-5">
      {orderedItems.length > 0 ? (
        <div className="row">
          <div className="col-md-10 mx-auto">
            {orderedItems.map((item, index) => (
              <div key={item.id} className="row border mb-5">
                <div className="col-md-4 col-12  d-flex align-items-center justify-content-center mb-3 mb-md-0">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="col-md-8 col-12 d-flex flex-column justify-content-center">
                  <h6>{item.title}</h6>
                  <h6>{item.description}</h6>
                  <h6>
                    <b>
                      Ratings :{"  "}
                      <span
                        className={`badge  ${
                          item.rating.rate > 4 ? "bg-primary" : "bg-warning"
                        }`}
                      >
                        {item.rating?.rate}
                      </span>
                    </b>
                  </h6>
                  <h6>
                    <b>Price: ₹ {Math.floor(item.price)}0</b>
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{ height: "80vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <h3>No orders found</h3>
        </div>
      )}
    </div>
  );
}

export default Orders;
