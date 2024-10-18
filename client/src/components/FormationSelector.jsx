const formations = ['4-4-2', '4-3-3', '3-5-2', '5-3-2'];

function FormationSelector({ onSelect }) {
  return (
    <div className="formation-selector">
      <h2>Select Formation</h2>
      {formations.map((formation) => (
        <button key={formation} onClick={() => onSelect(formation)}>
          {formation}
        </button>
      ))}
    </div>
  );
}

export default FormationSelector;
