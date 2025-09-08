import React from 'react';

export const Teeth = ({ start, end, x, y, handleChange, getColor, isSelected }) => {
  const teeth = [];
  const step = start < end ? 1 : -1;

  for (let i = start; i !== end + step; i += step) {
    teeth.push(i);
  }

  const teethCount = teeth.length;
  const toothWidth = 40;
  const toothSpacing = 45;
  const totalWidth = teethCount * toothSpacing;
  const svgWidth = totalWidth + 20; // Add padding

  return (
    <svg width={svgWidth} height="100">
      <g transform={`translate(${x},${y})`}>
        {teeth.map((tooth, index) => {
          const xPos = index * toothSpacing;
          return (
            <g key={tooth} transform={`translate(${xPos},0)`}>
              <rect
                x="2"
                y="2"
                width={toothWidth}
                height={toothWidth}
                fill={getColor(tooth)}
                stroke="#000"
                strokeWidth="1"
                onClick={() => handleChange(tooth)}
                className={isSelected === tooth ? 'selected' : ''}
              />
              <text
                x={toothWidth/2 + 2}
                y="55"
                textAnchor="middle"
                fontSize="14"
                fill="#666"
              >
                {tooth}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}; 