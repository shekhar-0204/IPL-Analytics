import { Trophy } from "lucide-react";

function ChampionCard({ champion, season }) {
  return (
    <div className="champion-card">
      <div className="champion-pattern"></div>

      <div className="champion-content">
        <div className="champion-icon">
          <Trophy size={28} strokeWidth={2.2} />
        </div>

        <p className="champion-kicker">IPL {season}</p>

        <span className="champion-label">SEASON CHAMPIONS</span>

        <h2>{champion?.team || "—"}</h2>

        <p className="champion-subtitle">Champions of {season}</p>
      </div>
    </div>
  );
}

export default ChampionCard;