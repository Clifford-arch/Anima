import React, { forwardRef } from "react";
import CatSprite from "./CatSprite";

const PreviewArea = forwardRef((props, ref) => {
  return (
    <div className="relative flex-none h-full p-2">
      <div
        className="relative overflow-hidden"
        style={{ width: "500px", height: "900px" }}
      >
        <CatSprite ref={ref} />
      </div>
    </div>
  );
});

export default PreviewArea;
