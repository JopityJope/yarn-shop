import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../components/ProductPage/Carousel";
import Colors from "../components/ProductPage/Colors";
import ProductHeading from "../components/ProductPage/ProductHeading";
import ProductDetails from "../components/ProductPage/ProductDetails";
import Helmet from "../components/Helmet/Helmet";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const yarnsCollectionRef = collection(db, "yarns");

function ProductPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth <= 700
  );
  const { yarnId } = useParams();
  const [selectedYarn, setSelectedYarn] = useState();

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

  useEffect(() => {
    const getYarnList = async () => {
      if (!yarnId) {
        return; // If yarnId is not available, exit early
      }

      const data = await getDocs(yarnsCollectionRef);
      const yarnList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const yarn = yarnList.find((yarn) => yarn.id === yarnId);
      setSelectedYarn(yarn);
    };

    getYarnList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yarnId]);

  console.log(selectedYarn);

  if (!selectedYarn) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product">
      <Helmet title={selectedYarn.name} />
      <div className="product__container">
        {isSmallScreen ? (
          <>
            <div className="product__row">
              {selectedYarn ? (
                <ProductHeading selectedYarn={selectedYarn} />
              ) : null}
            </div>
            <div className="product__row">
              {selectedYarn ? (
                <Carousel selectedYarn={selectedYarn} />
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="product__row">
              <div className="product__text">
                {selectedYarn ? (
                  <ProductDetails selectedYarn={selectedYarn} />
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="product__row">
              {selectedYarn ? <Carousel selectedYarn={selectedYarn} /> : null}
            </div>
            <div className="product__row">
              <div className="product__text">
                {selectedYarn ? (
                  <>
                    <ProductHeading selectedYarn={selectedYarn} />
                    <ProductDetails selectedYarn={selectedYarn} />
                  </>
                ) : null}
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
