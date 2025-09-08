import React from 'react';
import './Tooth.css'; // Asegúrate de importar los estilos

export const Tooth = ({ number }) => {
  return (
    <div className="tooth">
      <div className="tooth__crown">
        {/* Superficies dentales */}
        <div className="tooth__surface tooth__surface--top"></div>
        <div className="tooth__surface tooth__surface--right"></div>
        <div className="tooth__surface tooth__surface--bottom"></div>
        <div className="tooth__surface tooth__surface--left"></div>
        <div className="tooth__surface tooth__surface--center"></div>


      </div>
      <span className="tooth__number">{number}</span>
    </div>
  );
};
