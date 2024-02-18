import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });
  }, [pathname]);

  return null;
}
