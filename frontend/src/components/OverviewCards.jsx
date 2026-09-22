import {
  Trophy,
  TrendingUp,
  Target,
  CircleDot,
} from "lucide-react";

function OverviewCards({ data }) {
  const topRunScorer = data?.mostRuns?.[0];
  const topWicketTaker = data?.mostWickets?.[0];
  const topSixHitter = data?.mostSixes?.[0];

  return (
    <div className="overview-grid">
      <div className="overview-card">
        <div className="overview-icon">
          <Trophy size={22} />
        </div>

        <div>
          <p>Champion</p>
          <h3>{data?.champion?.team || "—"}</h3>
        </div>
      </div>

      <div className="overview-card">
        <div className="overview-icon">
          <TrendingUp size={22} />
        </div>

        <div>
          <p>Top Run Scorer</p>
          <h3>{topRunScorer?.player || "—"}</h3>
          <span>{topRunScorer?.value ?? "—"} runs</span>
        </div>
      </div>

      <div className="overview-card">
        <div className="overview-icon">
          <Target size={22} />
        </div>

        <div>
          <p>Top Wicket Taker</p>
          <h3>{topWicketTaker?.player || "—"}</h3>
          <span>{topWicketTaker?.value ?? "—"} wickets</span>
        </div>
      </div>

      <div className="overview-card">
        <div className="overview-icon">
          <CircleDot size={22} />
        </div>

        <div>
          <p>Most Sixes</p>
          <h3>{topSixHitter?.player || "—"}</h3>
          <span>{topSixHitter?.value ?? "—"} sixes</span>
        </div>
      </div>
    </div>
  );
}

export default OverviewCards;