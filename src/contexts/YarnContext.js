import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

const YarnContext = createContext();

export function useYarnContext() {
  return useContext(YarnContext);
}

export function YarnProvider({ children }) {
  const [yarns, setYarns] = useState([]);
  const [loading, setLoading] = useState(true);

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
      if (sortingFilter) {
        baseQuery = query(baseQuery, orderBy(`${sortingFilter}`, "asc"));
      }

      const data = await getDocs(baseQuery);
      const yarnsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
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
  };

  return <YarnContext.Provider value={value}>{children}</YarnContext.Provider>;
}
