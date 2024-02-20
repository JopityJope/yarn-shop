import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useLocation } from "react-router-dom";
import { useYarnContext } from "../contexts/YarnContext";
import { Link } from "react-router-dom";
import Spinner from "../components/Icons/Spinner";
import { transformYarnName, calculateSale } from "../utils/utils";

function SearchResults() {
  const location = useLocation();
  const searchQuery =
    new URLSearchParams(location.search).get("query") || "Search Results";
  const { fetchSearchYarns } = useYarnContext();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState({});
  const handleLoad = (yarnId) => {
    setLoaded((prevLoaded) => ({ ...prevLoaded, [yarnId]: true }));
  };

  const handleSearch = async () => {
    const yarns = await fetchSearchYarns();
    const filteredYarns = yarns.filter((yarn) => {
      return Object.values(yarn).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
    });
    console.log(filteredYarns);
    setSearchResults(filteredYarns);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <>
      <Helmet title={searchQuery} />
      <div className="search__container">
        <nav aria-label="breadcrumb" className="breadcrumb__nav">
          <ol className="breadcrumb">
            <Link to="/">All yarns</Link>
          </ol>
          {searchQuery && <ol className="breadcrumb"> / {searchQuery}</ol>}
        </nav>
        <h3 className="heading-secondary">You searched for “{searchQuery}”</h3>
      </div>
      <>
        <div className="yarn__container">
          {loading ? (
            <Spinner />
          ) : searchResults.length === 0 ? (
            <p className="no-yarns__message">
              We're sorry, but there are no yarns matching your search.
              <Link to={"/"} className="clear-filter__button">
                Browse shop
              </Link>
            </p>
          ) : (
            searchResults.map((yarn) => {
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
      </>
    </>
  );
}

export default SearchResults;
