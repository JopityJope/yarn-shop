import React from "react";
import { useEffect, useState, useRef } from "react";
/* import { useYarnContext } from "../components/Shop/YarnContext"; */

import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  /*  updateDoc,
  addDoc,
  deleteDoc,
  doc, */
} from "firebase/firestore";

import Filter from "../components/Shop/Filter";
import Helmet from "../components/Helmet/Helmet";
import { transformYarnName } from "../utils/utils";

function Shop() {
  const [yarns, setYarns] = useState([]);

  //Collection ref
  const yarnsCollectionRef = collection(db, "yarns");

  /* const setAlacaPartySale = async () => {
    const data = await getDocs(
      query(yarnsCollectionRef, where("contents.alpaca", "==", true))
    );
    const alpacaYarns = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    alpacaYarns.forEach((yarn) => {
      const docRef = doc(db, "yarns", yarn.id);
      updateDoc(docRef, { sale: true });
    });
  };
  setAlacaPartySale(); */

  /* const addYarn = () => {
    addDoc(yarnsCollectionRef, {
      colors: 26,
      contents: { content: "100% Wool", wool: true },
      length: 110,
      name: "DROPS Daisy",
      price: 4.55,
      thickness: "B / 8 ply / DK",
      weight: 50,
    });  .then(() => {
      addYarnForm.reset();
    }); 
  };

  addYarn();
 */

  /* const removeYarn = () => {
    const docRef = doc(db, "yarns", "6eivUMC6hjrLv1Iz0Zf7");

    deleteDoc(docRef);
  }; */

  /* const getYarns = async (reference) => {
    const data = await getDocs(reference);
    setYarns(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }; */

  //Active dropdown
  const [activeIndex, setActiveIndex] = useState(null);
  const handleFilterItemClick = (index, e) => {
    e.stopPropagation();
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [selectedContentIndex, setSelectedContentIndex] = useState(null);
  const [selectedYarnGroupIndex, setSelectedYarnGroupIndex] = useState(null);
  const [selectedSortingIndex, setSelectedSortingIndex] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dropdownRefs = [useRef(null), useRef(null), useRef(null)];

  const dropdownRefMobile = useRef(null);

  useEffect(() => {
    const closeDropdowns = (e) => {
      const shouldClose = dropdownRefs.every(
        (ref) => ref.current && !ref.current.contains(e.target)
      );

      if (shouldClose) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("click", closeDropdowns);

    return () => {
      document.removeEventListener("click", closeDropdowns);
    };
  }, [dropdownRefs]);

  //Calc sale
  const calculateSale = (price, salePercentage) => {
    const discountMultiplier = (100 - salePercentage) * 0.01;
    const discountedPrice = (discountMultiplier * price).toFixed(2);
    return parseFloat(discountedPrice);
  };
  // Filtering - content
  const [contentFilter, setContentFilter] = useState("");
  const handleContentFilterClick = (element, index) => {
    setSelectedContentIndex(index);
    setContentFilter(element.name === "all" ? "" : element.name);
  };

  // Filtering - yarn group
  const [yarnGroupFilter, setYarnGroupFilter] = useState("");
  const handleYarnGroupFilterClick = (element, index) => {
    setYarnGroupFilter(element.name === "all" ? "" : `${element.thickness}`);
    setSelectedYarnGroupIndex(index);
  };

  // Sorting - yarn group
  const [sortingFilter, setSortingFilter] = useState("");

  const handleSortingClick = (element, index) => {
    setSortingFilter(element.name);
    setSelectedSortingIndex(index);
  };

  // Sale check
  const [saleChecked, setSaleChecked] = useState(false);
  const handleSaleClick = () => {
    setSaleChecked((prevChecked) => {
      return !prevChecked;
    });
  };

  // Clear filters
  const clearFilters = () => {
    setContentFilter("");
    setYarnGroupFilter("");
    setSaleChecked(false);
    setSortingFilter("");
    setSelectedContentIndex(null);
    setSelectedYarnGroupIndex(null);
    setSelectedSortingIndex(null);
  };

  useEffect(() => {
    const updateYarns = async () => {
      let baseQuery = yarnsCollectionRef;

      if (contentFilter) {
        baseQuery = query(
          baseQuery,
          where(`contents.${contentFilter}`, "==", true)
        );
      }

      if (yarnGroupFilter) {
        baseQuery = query(baseQuery, where("thickness", "==", yarnGroupFilter));
      }

      if (saleChecked) {
        baseQuery = query(baseQuery, where("sale", "==", true));
      }
      if (sortingFilter) {
        baseQuery = query(baseQuery, orderBy(`${sortingFilter}`, "asc"));
      }

      const data = await getDocs(baseQuery);
      const yarnsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setYarns(yarnsData);
    };

    updateYarns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentFilter, yarnGroupFilter, saleChecked, sortingFilter]);

  return (
    <div className="shop__container">
      <Helmet title="Shop" />
      <Filter
        contentFilter={contentFilter}
        handleContentFilterClick={handleContentFilterClick}
        selectedContentIndex={selectedContentIndex}
        yarnGroupFilter={yarnGroupFilter}
        handleYarnGroupFilterClick={handleYarnGroupFilterClick}
        selectedYarnGroupIndex={selectedYarnGroupIndex}
        handleSaleClick={handleSaleClick}
        saleChecked={saleChecked}
        sortingFilter={sortingFilter}
        handleSortingClick={handleSortingClick}
        selectedSortingIndex={selectedSortingIndex}
        activeIndex={activeIndex}
        dropdownRefs={dropdownRefs}
        handleFilterItemClick={handleFilterItemClick}
        dropdownRefMobile={dropdownRefMobile}
      />

      <div className="yarn__container">
        {yarns.length === 0 ? (
          <p className="no-yarns__message">
            We're sorry, but there are no yarns matching your search. Try a
            different combination of filters.
            <button onClick={clearFilters} className="clear-filter__button">
              Clear filters
            </button>
          </p>
        ) : (
          yarns.map((yarn) => {
            return (
              <div className="yarn__item" key={yarn.id}>
                <div className="yarn__photo">
                  {yarn.sale ? <div className="sale__tag">-30%</div> : ""}
                  <Link to={`product-page/${yarn.id}`}>
                    <img
                      className="yarn__photo-01"
                      src={`${transformYarnName(
                        yarn.name
                      )}/yarn_preview_01.jpg`}
                      alt={yarn.name}
                    />
                    <img
                      className="yarn__photo-02"
                      src={`${transformYarnName(
                        yarn.name
                      )}/yarn_preview_02.jpg`}
                      alt={yarn.name}
                    />
                  </Link>
                </div>

                <div className="yarn__details">
                  <Link to={`product-page/${yarn.id}`}>
                    <h3 className="yarn__name">{yarn.name}</h3>
                  </Link>

                  {yarn.sale ? (
                    <p className="sale__name">DROPS Alpaca Party</p>
                  ) : (
                    ""
                  )}

                  {yarn.sale ? (
                    <p className="yarn__price">
                      <span className="yarn__price--old">{yarn.price} EUR</span>{" "}
                      <strong className="yarn__price--sale">
                        {calculateSale(yarn.price, 30)} EUR
                      </strong>
                      /{yarn.weight}g
                    </p>
                  ) : (
                    <p className="yarn__price">
                      <strong>{yarn.price} EUR</strong> / {yarn.weight}g
                    </p>
                  )}

                  <p className="yarn__contents">{yarn.contents.content}</p>
                  <p className="yarn__length">
                    {yarn.weight}g = {yarn.length}m
                  </p>
                  <p className="yarn__colors">{yarn.colors} colors</p>
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
