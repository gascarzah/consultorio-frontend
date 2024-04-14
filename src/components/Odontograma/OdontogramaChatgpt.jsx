import React from 'react';

function Odontograma({ dentalStates }) {
  const drawTooth = (x, y, number, state) => {
    let fill = 'white';
    let textFill = 'black';

    // Determinar el color de relleno y el color del texto basado en el estado del diente
    if (state === 'cariado') {
      fill = 'yellow';
    } else if (state === 'ausente') {
      textFill = 'red';
    }

    return (
      <g key={number}>
        <rect x={x} y={y} width="30" height="50" fill={fill} stroke="black" strokeWidth="2" />
        <text x={x + 15} y={y + 25} textAnchor="middle" fontSize="16" fill={textFill}>{number}</text>
      </g>
    );
  };

  return (
    <svg width="400" height="300">
      {/* Dientes superiores */}
      {[...Array(8)].map((_, index) => drawTooth((index + 1) * 40, 100, index + 1, dentalStates[index]))}
      {/* Dientes inferiores */}
      {[...Array(8)].map((_, index) => drawTooth((index + 1) * 40, 200, index + 1, dentalStates[index + 8]))}
      {/* Líneas de la boca */}
      <line x1="40" y1="150" x2="360" y2="150" stroke="black" strokeWidth="2" />
      <line x1="40" y1="250" x2="360" y2="250" stroke="black" strokeWidth="2" />
    </svg>
  );
}

function OdontogramaChatgpt() {
  const dentalStates = [
    'sano', 'sano', 'cariado', 'sano', 'ausente', 'sano', 'sano', 'sano', // Dientes superiores
    'sano', 'sano', 'sano', 'sano', 'sano', 'sano', 'sano', 'sano' // Dientes inferiores
  ];

  return (
    <div>
      <h1>Odontograma</h1>
      <Odontograma dentalStates={dentalStates} />
    </div>
  );
}

export default OdontogramaChatgpt;
