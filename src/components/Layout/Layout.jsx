import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";

function Layout() {
  return (
    <div className="container">
      <Header />
      <div className="main">
        <Routers />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
