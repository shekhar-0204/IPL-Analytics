function RankingTable({ title, data }) {
  return (
    <div className="ranking-table-wrapper">
      <div className="ranking-table-header">
        <div>RANK</div>
        <div>PLAYER</div>
        <div>VALUE</div>
      </div>

      {data?.map((item, index) => (
        <div className="ranking-row" key={`${item.rank}-${item.player}`}>
          <div className={`rank-number rank-${index + 1}`}>
            {String(item.rank).padStart(2, "0")}
          </div>

          <div className="ranking-player">
            {item.player}
          </div>

          <div className="ranking-value">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RankingTable;