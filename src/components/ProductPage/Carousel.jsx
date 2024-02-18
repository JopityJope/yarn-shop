import React, { useState } from "react";
import { transformYarnName } from "../../utils/utils";

function Carousel({ selectedYarn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImageIndex, setFailedImageIndex] = useState(null);

  const handleImageClick = (i) => {
    setCurrentIndex(i);
  };

  const handleImageError = (i) => {
    setFailedImageIndex(i);
  };

  return (
    <div className="carousel">
      {selectedYarn.name && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              src={`/${transformYarnName(selectedYarn.name)}/yarn_${i}.jpg`}
              alt=""
              className={`carousel__main ${
                i === currentIndex ? "active" : ""
              } `}
              loading="lazy"
              key={i}
            />
          ))}
        </>
      )}

      <div className="carousel__indicators">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className={`carousel__item`} key={i}>
            <img
              className={`carousel__image ${
                i === currentIndex ? "active" : ""
              } ${i === failedImageIndex ? "noimage" : ""}`}
              src={`/${transformYarnName(selectedYarn.name)}/yarn_${i}.jpg`}
              alt=""
              onError={() => handleImageError(i)}
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
