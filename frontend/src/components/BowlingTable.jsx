function BowlingTable({ title, data }) {
  return (
    <div className="bowling-table-wrapper">
      <div className="bowling-table-header">
        <div>RANK</div>
        <div>BOWLER</div>
        <div>FIGURES</div>
      </div>

      {data?.map((item, index) => (
        <div
          className="bowling-row"
          key={`${item.rank}-${item.player}`}
        >
          <div className={`rank-number rank-${index + 1}`}>
            {String(item.rank).padStart(2, "0")}
          </div>

          <div className="bowling-player">
            {item.player}
          </div>

          <div className="bowling-figures">
            {item.figures}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BowlingTable;