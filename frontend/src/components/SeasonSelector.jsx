function SeasonSelector({ seasons, selectedSeason, onSeasonChange }) {
  return (
    <div>
      <label htmlFor="season">Select Season: </label>

      <select
        id="season"
        value={selectedSeason}
        onChange={(e) => onSeasonChange(e.target.value)}
      >
        {seasons.map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SeasonSelector;