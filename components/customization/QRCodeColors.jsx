import React from "react";

const QRCodeColors = ({
  backgroundColor,
  dotsColor,
  markerBorderColor,
  markerCenterColor,
  setBackgroundColor,
  setDotsColor,
  setMarkerBorderColor,
  setMarkerCenterColor,
}) => {
  const handleColorChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const style = {
    inputColor: {
      width: "100px",
      height: "50px",
      padding: "5px",
    },
  };

  return (
    <div className="flex flex-col">
      <label>Background Color</label>
      <input
        type="color"
        value={backgroundColor}
        onChange={handleColorChange(setBackgroundColor)}
        style={style.inputColor}
      />

      <label>Dots Color</label>
      <input
        type="color"
        value={dotsColor}
        onChange={handleColorChange(setDotsColor)}
        style={style.inputColor}
      />
      <label>Marker Border Color:</label>
      <input
        type="color"
        value={markerBorderColor}
        onChange={handleColorChange(setMarkerBorderColor)}
        style={style.inputColor}
      />
      <label>Marker Center Color</label>
      <input
        type="color"
        value={markerCenterColor}
        onChange={handleColorChange(setMarkerCenterColor)}
        style={style.inputColor}
      />
    </div>
  );
};

export default QRCodeColors;
