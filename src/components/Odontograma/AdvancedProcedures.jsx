import React, { useState } from 'react';

export const AdvancedProcedures = ({ onProcedureSelect, selectedTooth }) => {
  const [activeCategory, setActiveCategory] = useState('basic');

  const procedureCategories = {
    basic: {
      name: 'Básicos',
      procedures: [
        { id: 'caries', name: 'Caries', color: '#FF4444', icon: '●', surfaces: true },
        { id: 'restoration', name: 'Restauración', color: '#4444FF', icon: '■', surfaces: true },
        { id: 'extraction', name: 'Extracción', color: '#000000', icon: '✕', surfaces: false },
        { id: 'missing', name: 'Ausente', color: '#FF0000', icon: '⊘', surfaces: false },
        { id: 'crown', name: 'Corona', color: '#FFD700', icon: '◎', surfaces: false },
        { id: 'root_canal', name: 'Endodoncia', color: '#44AA44', icon: '▲', surfaces: false }
      ]
    },
    advanced: {
      name: 'Avanzados',
      procedures: [
        { id: 'bridge', name: 'Puente', color: '#AA44AA', icon: '⚍', surfaces: false },
        { id: 'implant', name: 'Implante', color: '#00FFFF', icon: '⬡', surfaces: false },
        { id: 'sealant', name: 'Sellante', color: '#FFA500', icon: '⬒', surfaces: true },
        { id: 'fracture', name: 'Fractura', color: '#800080', icon: '↯', surfaces: true },
        { id: 'abfraction', name: 'Abfracción', color: '#8B4513', icon: '◊', surfaces: true },
        { id: 'attrition', name: 'Atrición', color: '#2F4F4F', icon: '○', surfaces: true }
      ]
    },
    orthodontic: {
      name: 'Ortodoncia',
      procedures: [
        { id: 'bracket', name: 'Bracket', color: '#32CD32', icon: '◈', surfaces: false },
        { id: 'band', name: 'Banda', color: '#FF6347', icon: '◉', surfaces: false },
        { id: 'wire', name: 'Alambre', color: '#C0C0C0', icon: '━', surfaces: false },
        { id: 'elastic', name: 'Elástico', color: '#FF69B4', icon: '◐', surfaces: false },
        { id: 'retainer', name: 'Retenedor', color: '#4169E1', icon: '◑', surfaces: false }
      ]
    },
    periodontal: {
      name: 'Periodontal',
      procedures: [
        { id: 'gingivitis', name: 'Gingivitis', color: '#FF6B6B', icon: '◠', surfaces: true },
        { id: 'periodontitis', name: 'Periodontitis', color: '#8B0000', icon: '◡', surfaces: true },
        { id: 'pocket', name: 'Bolsa', color: '#DC143C', icon: '◢', surfaces: true },
        { id: 'calculus', name: 'Cálculo', color: '#696969', icon: '◣', surfaces: true },
        { id: 'recession', name: 'Recesión', color: '#FF4500', icon: '◤', surfaces: true }
      ]
    }
  };

  return (
    <div className="advanced-procedures">
      <div className="procedure-categories">
        {Object.entries(procedureCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`category-btn ${activeCategory === key ? 'active' : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="procedures-grid">
        {procedureCategories[activeCategory].procedures.map((procedure) => (
          <button
            key={procedure.id}
            onClick={() => onProcedureSelect(procedure.id)}
            className={`procedure-btn ${!selectedTooth ? 'disabled' : ''}`}
            disabled={!selectedTooth}
            title={`${procedure.name}${procedure.surfaces ? ' (requiere superficie)' : ''}`}
          >
            <span className="procedure-icon" style={{ color: procedure.color }}>
              {procedure.icon}
            </span>
            <span className="procedure-name">{procedure.name}</span>
            {procedure.surfaces && (
              <span className="surface-indicator">S</span>
            )}
          </button>
        ))}
      </div>

      <div className="procedure-legend">
        <h4 className="legend-title">Leyenda</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-icon">S</span>
            <span className="legend-text">Requiere selección de superficie</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">●</span>
            <span className="legend-text">Procedimiento completo</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 