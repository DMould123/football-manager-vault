import React from 'react';

const formations = ['4-4-2', '4-3-3', '3-5-2', '5-3-2'];

function FormationSelector({ onSelect, selectedFormation, onBack }) {
  if (selectedFormation) {
    return (
      <div className="formation-selector">
        <h2>Current Formation: {selectedFormation}</h2>
        <button onClick={onBack}>Change Formation</button>
      </div>
    );
  }

  return (
    <div className="formation-selector">
      <h2>Select Formation</h2>
      <div className="formation-buttons">
        {formations.map((formation) => (
          <button key={formation} onClick={() => onSelect(formation)}>
            {formation}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FormationSelector;
