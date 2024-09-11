import React from "react";

const QRCodeShapes = ({
  dotsType,
  cornersType,
  cornersDotType,
  setDotsType,
  setCornersType,
  setCornersDotType,
}) => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">Dots</label>
        <select
          onChange={(e) => setDotsType(e.target.value)}
          value={dotsType}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
        >
          <option value="rounded">Rounded</option>
          <option value="dots">Dots</option>
          <option value="classy">Classy</option>
          <option value="classy-rounded">Classy Rounded</option>
          <option value="extra-rounded">Extra Rounded</option>
          <option value="square">Square</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">
          Marker Border
        </label>
        <select
          onChange={(e) => setCornersType(e.target.value)}
          value={cornersType}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
        >
          <option value="square">Square</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">
          Marker Center
        </label>
        <select
          onChange={(e) => setCornersDotType(e.target.value)}
          value={cornersDotType}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
        >
          <option value="dot">Dot</option>
          <option value="square">Square</option>
        </select>
      </div>
    </div>
  );
};

export default QRCodeShapes;
