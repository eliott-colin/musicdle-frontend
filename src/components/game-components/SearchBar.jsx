function SearchBar({ value, onChange }) {
  return (
    <div className="game-day-form">
      <input
        className="game-day-input"
        type="text"
        placeholder="Tape le nom du morceau"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;