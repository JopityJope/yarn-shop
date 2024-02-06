import "./App.css";
import React from "react";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { YarnProvider } from "./contexts/YarnContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <AuthProvider>
      <YarnProvider>
        <WishlistProvider>
          <CartProvider>
            <Layout />
          </CartProvider>
        </WishlistProvider>
      </YarnProvider>
    </AuthProvider>
  );
}

export default App;
