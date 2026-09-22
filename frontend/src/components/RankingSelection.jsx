import {
  Trophy,
  Target,
  Medal,
  Users,
  Flame,
  CircleDot,
  SquareStack,
  Crosshair,
  BarChart3,
  Zap,
} from "lucide-react";

function RankingSelection({
  selectedRanking,
  onRankingChange,
}) {
  const rankings = [
    {
      id: "1",
      label: "Most Runs",
      icon: Trophy,
    },
    {
      id: "2",
      label: "Most Wickets",
      icon: Target,
    },
    {
      id: "3",
      label: "Most Man of the Match Awards",
      icon: Medal,
    },
    {
      id: "4",
      label: "Highest Team Total",
      icon: Users,
    },
    {
      id: "5",
      label: "Most Wins",
      icon: Trophy,
    },
    {
      id: "6",
      label: "Most Sixes",
      icon: Flame,
    },
    {
      id: "7",
      label: "Most Fours",
      icon: CircleDot,
    },
    {
      id: "8",
      label: "Best Bowling Figures",
      icon: Crosshair,
    },
    {
      id: "9",
      label: "Highest Average Score",
      icon: BarChart3,
    },
    {
      id: "10",
      label: "Highest Single Match Score",
      icon: Zap,
    },
  ];

  return (
    <div className="ranking-selection">
      <div className="ranking-heading">
        <span>EXPLORE IPL</span>
        <h2>What do you want to know?</h2>
      </div>

      <div className="ranking-select-wrapper">
        <select
          value={selectedRanking}
          onChange={(e) => onRankingChange(e.target.value)}
        >
          {rankings.map((ranking) => (
            <option key={ranking.id} value={ranking.id}>
              {ranking.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default RankingSelection;