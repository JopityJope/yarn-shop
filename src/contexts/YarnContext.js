import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const YarnContext = createContext();

export function useYarnContext() {
  return useContext(YarnContext);
}

export function YarnProvider({ children }) {
  const [yarns, setYarns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSearchYarns = async () => {
    try {
      const yarnsCollectionRef = collection(db, "yarns");
      const data = await getDocs(yarnsCollectionRef);
      const yarnsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return yarnsData;
    } catch (error) {
      console.error("Error fetching yarns:", error);
    }
  };

  useEffect(() => {
    const fetchYarns = async () => {
      try {
        const yarnsCollectionRef = collection(db, "yarns");
        const data = await getDocs(yarnsCollectionRef);
        const yarnsData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setYarns(yarnsData);
      } catch (error) {
        console.error("Error fetching yarns:", error);
      }
    };

    fetchYarns();
  }, []);

  const updateYarns = async (
    contentFilter,
    yarnGroupFilter,
    saleChecked,
    sortingFilter
  ) => {
    try {
      let baseQuery = collection(db, "yarns");

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

      const data = await getDocs(baseQuery);
      let yarnsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      yarnsData = yarnsData.map((yarn) => {
        if (yarn.sale) {
          return {
            ...yarn,
            adjustedPrice: yarn.price * 0.7,
          };
        }
        return yarn;
      });

      // Sort the yarnsData based on sortingFilter
      if (sortingFilter === "price - Low to High") {
        yarnsData.sort((a, b) => {
          if (a.sale && b.sale) {
            return a.adjustedPrice - b.adjustedPrice;
          } else if (a.sale) {
            return a.adjustedPrice - b.price;
          } else if (b.sale) {
            return a.price - b.adjustedPrice;
          } else {
            return a.price - b.price;
          }
        });
      } else if (sortingFilter === "price - High to Low") {
        yarnsData.sort((a, b) => {
          if (a.sale && b.sale) {
            return b.adjustedPrice - a.adjustedPrice;
          } else if (a.sale) {
            return b.price - a.adjustedPrice;
          } else if (b.sale) {
            return b.adjustedPrice - a.price;
          } else {
            return b.price - a.price;
          }
        });
      } else if (sortingFilter === "name") {
        yarnsData.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (sortingFilter === "thickness") {
        yarnsData.sort((a, b) => {
          const extractNumeric = (str) => {
            const matches = str.match(/\d+/);
            return matches ? parseInt(matches[0]) : 0;
          };
          const thicknessA = extractNumeric(a.thickness);
          const thicknessB = extractNumeric(b.thickness);
          return thicknessA - thicknessB;
        });
      }

      setYarns(yarnsData);
    } catch (error) {
      console.error("Error fetching yarns", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    yarns,
    loading,
    updateYarns,
    fetchSearchYarns,
  };

  return <YarnContext.Provider value={value}>{children}</YarnContext.Provider>;
}
