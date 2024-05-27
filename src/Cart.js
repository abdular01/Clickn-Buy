// import React, { useState, useEffect, useContext } from "react";
// import { cartContext } from "./App";
// import "./Cart.css";
// import { useNavigate } from "react-router-dom";

// function Cart() {
//   const { cartItems, setCartItems } = useContext(cartContext);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [isRemoving, setIsRemoving] = useState(null);
//   let navigate = useNavigate();
//   let navigateToBuyNow=useNavigate();

//   useEffect(() => {
//     let total = 0;
//     cartItems.forEach((item) => {
//       total += Math.floor(item.price);
//     });
//     setTotalAmount(total);
//   }, [cartItems]);

//   function removeFromCart(id, event) {
//     event.stopPropagation();
//     setIsRemoving(id);
//     setTimeout(() => {
//       setCartItems((previous) => previous.filter((item) => item.id !== id));
//       setIsRemoving(null);
//     }, 500);
//   }

//   function onClickViewProduct(id) {
//     navigate("/viewproducts", { state: id });
//   }

//   function onClickBuyNow(){
//     navigateToBuyNow('/buynow')

//   }

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-8">
//           <div className="d-flex flex-column products">
//             {cartItems.map((item) => (
//               <div
//                 onClick={() => onClickViewProduct(item.id)}
//                 key={item.id}
//                 className={`d-flex mb-5 gap-5 align-items-start border p-3 ${
//                   isRemoving === item.id ? "removing" : ""
//                 }`}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="cart-item-image"
//                 />
//                 <div>
//                   <h6>{item.title}</h6>
//                   <h6>{item.description}</h6>
//                   <h6>
//                     <b>Ratings: {item.rating.rate}</b>
//                   </h6>
//                   <h6>
//                     <b>Price:  ₹  {Math.floor(item.price)}0</b>
//                   </h6>
//                   <button
//                     className="btn btn-danger"
//                     onClick={(event) => removeFromCart(item.id, event)}
//                   >
//                     Remove from cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="col-md-4">
//           {cartItems.length > 0 && (
//             <div className="d-flex flex-column align-items-center justify-content-start mt-3">
//               <h3 className="text-start">
//                 <b>Total ({cartItems.length} items) :  ₹ {totalAmount}0</b>
//               </h3>
//               <button className="btn btn-primary mt-2" onClick={onClickBuyNow}>Buy Now</button>
//             </div>
//           )}
//         </div>
//         {cartItems.length < 1 && (
//           <div style={{ height: "80vh" }} className="d-flex align-items-center justify-content-center ">
//             <h3>Your cart is empty <i class="bi bi-cart"></i></h3>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Cart;
import React, { useState, useEffect, useContext } from "react";
import { cartContext } from "./App";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, setCartItems } = useContext(cartContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isRemoving, setIsRemoving] = useState(null);
  let navigate = useNavigate();
  let navigateToBuyNow = useNavigate();

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += Math.floor(item.price);
    });
    setTotalAmount(total);
  }, [cartItems]);

  function removeFromCart(id, event) {
    event.stopPropagation();
    setIsRemoving(id);
    setTimeout(() => {
      setCartItems((previous) => previous.filter((item) => item.id !== id));
      setIsRemoving(null);
    }, 500);
  }

  function onClickViewProduct(id) {
    navigate("/viewproducts", { state: id });
  }

  function onClickBuyNow() {
    navigateToBuyNow("/buynow");
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="d-flex flex-column products">
            {cartItems.map((item) => (
              <div
                onClick={() => onClickViewProduct(item.id)}
                key={item.id}
                className={`row mb-5 align-items-center border p-3 ${
                  isRemoving === item.id ? "removing" : ""
                }`}
              >
                <div className="col-md-4 col-12 d-flex justify-content-center mb-3 mb-md-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid cart-item-image"
                  />
                </div>
                <div className="col-md-8 col-12">
                  <h6>{item.title}</h6>
                  <h6>{item.description}</h6>
                  <h6>
                    <b>Ratings: {item.rating.rate}</b>
                  </h6>
                  <h6>
                    <b>Price: ₹ {Math.floor(item.price)}0</b>
                  </h6>
                  <button
                    className="btn btn-secondary"
                    onClick={(event) => removeFromCart(item.id, event)}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          {cartItems.length > 0 && (
            <div className="d-flex flex-column align-items-center justify-content-start mt-3">
              <h3 className="text-start">
                Total ({cartItems.length} items) : ₹ {totalAmount}0
              </h3>
              <button className="btn btn-primary mt-2" onClick={onClickBuyNow}>
                Buy Now
              </button>
            </div>
          )}
        </div>
        {cartItems.length < 1 && (
          <div
            style={{ height: "80vh" }}
            className="d-flex align-items-center justify-content-center"
          >
            <h3>
              Your cart is empty <i className="bi bi-cart"></i>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
