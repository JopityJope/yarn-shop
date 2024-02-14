import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(`pathname changed ${pathname}`);

    setTimeout(() => {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });

    console.log(document.documentElement);
  }, [pathname]);

  return null;
}
