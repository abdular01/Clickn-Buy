import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header.js";
import Home from "./Home.js";
import Cart from "./Cart.js";
import { createContext, useState } from "react";
import ViewProducts from "./ViewProducts.js";
import BuyNow from "./BuyNow.js";
import Orders from "./YourOrders.js";

export let cartContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);

  return (
    <div className="App">
      <cartContext.Provider
        value={{
          cartItems,
          setCartItems,
          orderedItems,
          setOrderedItems,
        }}
      >
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/viewproducts" element={<ViewProducts />} />
            <Route path="/buynow" element={<BuyNow />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </cartContext.Provider>
    </div>
  );
}

export default App;
