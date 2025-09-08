import React from 'react';
import { Tooth } from './Tooth';

export const TeethRow = ({ start, end, position, onToothClick, getToothColor, selectedTooth }) => {
  const teeth = [];
  const step = start < end ? 1 : -1;

  for (let i = start; i !== end + step; i += step) {
    teeth.push(i);
  }

  return (
    <div className={`teeth-row teeth-row--${position}`}>
      {teeth.map(number => (
        <Tooth
          key={number}
          number={number}
          position={position}
          color={getToothColor(number)}
          onClick={() => onToothClick(number)}
          isSelected={selectedTooth === number}
        />
      ))}
    </div>
  );
}; 