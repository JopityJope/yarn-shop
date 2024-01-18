import React from "react";
import { transformYarnName } from "../../utils/utils";

function Colors({ selectedYarn }) {
  console.log(selectedYarn);
  return (
    <>
      {selectedYarn.colorNames && selectedYarn.name ? (
        <h2 className="heading-secondary">
          {selectedYarn.colorNames.length} colors in {selectedYarn.name}
        </h2>
      ) : null}

      <div className="colors">
        {Array.from({ length: `${selectedYarn.colorNames.length}` }).map(
          (_, i) => (
            <div key={i} className="color">
              {selectedYarn.name && (
                <img
                  src={`/${transformYarnName(selectedYarn.name)}/colors/${
                    i + 1
                  }.jpg`}
                  alt=""
                  loading="lazy"
                  className="color__image"
                />
              )}

              {selectedYarn.colorNames && (
                <p className="color__name">{selectedYarn.colorNames[i]}</p>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Colors;
