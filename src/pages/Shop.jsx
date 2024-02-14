import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useYarnContext } from "../contexts/YarnContext";
import Filter from "../components/Shop/Filter";
import Helmet from "../components/Helmet/Helmet";
import Spinner from "../components/Icons/Spinner";
import { transformYarnName, calculateSale } from "../utils/utils";

function Shop() {
  const { yarns, loading } = useYarnContext();
  const [loaded, setLoaded] = useState({});

  const handleLoad = (yarnId) => {
    setLoaded((prevLoaded) => ({ ...prevLoaded, [yarnId]: true }));
  };

  return (
    <div className="shop__container">
      <Helmet title="Shop" />
      {<Filter />}

      <div className="yarn__container">
        {loading ? (
          <Spinner />
        ) : yarns.length === 0 ? null : (
          yarns.map((yarn) => {
            return (
              <div className="yarn__item" key={yarn.id}>
                <div className="yarn__photo">
                  {yarn.sale ? <div className="sale__tag">-30%</div> : ""}

                  {yarn.name && yarn.id ? (
                    <Link to={`product-page/${yarn.id}`}>
                      <div
                        className={`blur-load ${
                          loaded[yarn.id] ? "loaded" : ""
                        }`}
                        style={{
                          backgroundImage: `url(${transformYarnName(
                            yarn.name
                          )}/yarn_preview_01--small.jpg)`,
                        }}
                      >
                        <img
                          className="yarn__photo-01"
                          src={`${transformYarnName(
                            yarn.name
                          )}/yarn_preview_01.jpg`}
                          alt={yarn.name}
                          onLoad={() => handleLoad(yarn.id)}
                        />
                      </div>
                      <div>
                        <img
                          className="yarn__photo-02"
                          src={`${transformYarnName(
                            yarn.name
                          )}/yarn_preview_02.jpg`}
                          alt={yarn.name}
                        />
                      </div>
                    </Link>
                  ) : null}
                </div>

                <div className="yarn__details">
                  {yarn.id && (
                    <Link to={`product-page/${yarn.id}`}>
                      <h3 className="yarn__name">{yarn.name}</h3>
                    </Link>
                  )}

                  {yarn.sale ? (
                    <p className="sale__name">DROPS Alpaca Party</p>
                  ) : (
                    ""
                  )}

                  {yarn.price && yarn.weight ? (
                    yarn.sale ? (
                      <p className="yarn__price">
                        <span className="yarn__price--old">
                          {yarn.price.toFixed(2)} EUR
                        </span>
                        <strong className="yarn__price--sale">
                          {calculateSale(yarn.price, 30)} EUR
                        </strong>
                        /{yarn.weight}g
                      </p>
                    ) : (
                      <p className="yarn__price">
                        <strong>{yarn.price.toFixed(2)} EUR</strong> /{" "}
                        {yarn.weight}g
                      </p>
                    )
                  ) : null}

                  {yarn.contents && (
                    <p className="yarn__contents">{yarn.contents.content}</p>
                  )}

                  {yarn.weight && (
                    <p className="yarn__length">
                      {yarn.weight}g = {yarn.length}m
                    </p>
                  )}
                  {yarn.colorNames && (
                    <p className="yarn__colors">
                      {yarn.colorNames.length} colors
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Shop;
