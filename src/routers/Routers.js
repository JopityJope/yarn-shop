import { Routes, Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import LogIn from "../pages/LogIn";
import SingUp from "../pages/SingUp";
import Shop from "../pages/Shop";
import WishList from "../pages/WishList";
/* import { YarnProvider } from "../components/Shop/YarnContext"; */

function Routers() {
  return (
    /*    <YarnProvider> */
    <Routes>
      <Route path="/" element={<Shop />}></Route>
      <Route path="/product-page/:yarnId" element={<ProductPage />}></Route>

      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/signup" element={<SingUp />}></Route>
      <Route path="/wishlist" element={<WishList />}></Route>
    </Routes>
    /*    </YarnProvider> */
  );
}

export default Routers;
