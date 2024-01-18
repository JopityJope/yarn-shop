import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Shop from "../pages/Shop";
import WishList from "../pages/WishList";
import UpdatePassword from "../pages/UpdatePassword";
import Profile from "../pages/Profile";
import { useAuth } from "../contexts/AuthContext";
import UpdateEmail from "../pages/UpdateEmail";
import ForgottenPassword from "../pages/ForgottenPassword";

function Routers() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/product-page/:yarnId" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route
        path="/login"
        element={!currentUser ? <LogIn /> : <Navigate to="/profile" />}
      />

      <Route
        path="/signup"
        element={!currentUser ? <SignUp /> : <Navigate to="/profile" />}
      />

      <Route path="/wishlist" element={<WishList />} />
      <Route
        path="/profile"
        element={currentUser ? <Profile /> : <Navigate to="/login" />}
      />
      <Route path="/profile/change-password" element={<UpdatePassword />} />
      <Route path="/profile/update-email" element={<UpdateEmail />} />
      <Route
        path="/forgotten-password"
        element={
          !currentUser ? <ForgottenPassword /> : <Navigate to="/profile" />
        }
      />
    </Routes>
  );
}

export default Routers;
