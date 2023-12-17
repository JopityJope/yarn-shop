import React from "react";
import { transformYarnName } from "../../utils/utils";

function Colors({ selectedYarn }) {
  console.log(selectedYarn);
  return (
    <>
      <h2 className="heading-secondary">
        {selectedYarn.colorNames.length} colors in {selectedYarn.name}
      </h2>
      <div className="colors">
        {Array.from({ length: `${selectedYarn.colorNames.length}` }).map(
          (_, i) => (
            <div key={i} className="color">
              <img
                src={`/${transformYarnName(selectedYarn.name)}/colors/${
                  i + 1
                }.jpg`}
                alt=""
                loading="lazy"
                className="color__image"
              />
              <p className="color__name">{selectedYarn.colorNames[i]}</p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Colors;
