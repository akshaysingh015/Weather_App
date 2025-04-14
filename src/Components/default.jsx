import React from "react";

const UVIndexGauge = ({ uvIndex }) => {
  // Convert UV Index to a percentage of 12 (Max UV Index)
  const percentage = (uvIndex / 12) * 180; // Max arc is 180 degrees
  const radius = 40; // Radius of the arc
  const strokeWidth = 8; // Thickness of the arc

  // Convert percentage to degrees for SVG arc
  const startAngle = -90;
  const endAngle = startAngle + percentage;

  // Function to convert degrees to SVG arc coordinates
  const polarToCartesian = (centerX, centerY, radius, angle) => {
    const radians = (angle * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(radians),
      y: centerY + radius * Math.sin(radians),
    };
  };

  // SVG arc path
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-lg w-32 h-32">
      <p className="text-gray-600 text-sm">UV Index</p>
      <svg width="100" height="60" viewBox="0 0 100 50">
        <path
          d="M 10 40 A 40 40 0 0 1 90 40"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <path
          d={describeArc(50, 40, radius, startAngle, endAngle)}
          fill="none"
          stroke="#F59E0B"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      <p className="text-2xl font-bold">{uvIndex}</p>
    </div>
  );
};

export default UVIndexGauge;
