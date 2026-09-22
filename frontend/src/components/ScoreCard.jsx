function ScoreCard({ title, data, valueKey = "value" }) {
  return (
    <div className="score-table-wrapper">
      <div className="score-table-header">
        <div>RANK</div>
        <div>TEAM</div>
        <div>VALUE</div>
      </div>

      {data?.map((item, index) => (
        <div className="score-row" key={`${item.rank}-${item.team}`}>
          <div className={`rank-number rank-${index + 1}`}>
            {String(item.rank).padStart(2, "0")}
          </div>

          <div className="score-team">
            {item.team}
          </div>

          <div className="score-value">
            {item[valueKey]}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScoreCard;