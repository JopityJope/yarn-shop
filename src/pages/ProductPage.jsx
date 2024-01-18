import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../components/ProductPage/Carousel";
import Colors from "../components/ProductPage/Colors";
import ProductHeading from "../components/ProductPage/ProductHeading";
import ProductDetails from "../components/ProductPage/ProductDetails";
import Helmet from "../components/Helmet/Helmet";
import { useYarnContext } from "../contexts/YarnContext";
import Spinner from "../components/Icons/Spinner";

function ProductPage() {
  const { yarns } = useYarnContext();
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth <= 700
  );
  const { yarnId } = useParams();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSmallScreen(screenWidth <= 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const selectedYarn = yarns.find((yarn) => yarn.id === yarnId);

  console.log(selectedYarn);

  if (!selectedYarn) {
    return <Spinner />;
  }

  return (
    <div className="product">
      <Helmet title={selectedYarn.name} />
      <div className="product__container">
        {isSmallScreen ? (
          <>
            <div className="product__row">
              <ProductHeading selectedYarn={selectedYarn} />
            </div>
            <div className="product__row">
              <Carousel selectedYarn={selectedYarn} />
            </div>
            <div className="product__row">
              <div className="product__text">
                <ProductDetails selectedYarn={selectedYarn} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="product__row">
              <Carousel selectedYarn={selectedYarn} />
            </div>
            <div className="product__row">
              <div className="product__text">
                <>
                  <ProductHeading selectedYarn={selectedYarn} />
                  <ProductDetails selectedYarn={selectedYarn} />
                </>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="colors__container">
        {selectedYarn ? <Colors selectedYarn={selectedYarn} /> : null}
      </div>
    </div>
  );
}

export default ProductPage;
