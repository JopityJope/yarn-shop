import React, { useState } from "react";
import { transformYarnName } from "../../utils/utils";

function Carousel({ selectedYarn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleImageClick = (i) => {
    setCurrentIndex(i);
  };

  return (
    <div className="carousel">
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          src={`/${transformYarnName(selectedYarn.name)}/yarn_${i}.jpg`}
          alt="yarn"
          className={`carousel__main ${i === currentIndex ? "active" : ""} `}
          loading="lazy"
          key={i}
        />
      ))}

      <div className="carousel__indicators">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="carousel__item" key={i}>
            <img
              className={`carousel__image ${
                i === currentIndex ? "active" : ""
              }`}
              src={`/${transformYarnName(selectedYarn.name)}/yarn_${i}.jpg`}
              alt=""
              onClick={() => handleImageClick(i)}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
