const seasonFileMap = {
  "2007/08": "2007-08",
  "2009": "2009",
  "2009/10": "2009-10",
  "2011": "2011",
  "2012": "2012",
  "2013": "2013",
  "2014": "2014",
  "2015": "2015",
  "2016": "2016",
  "2017": "2017",
  "2018": "2018",
  "2019": "2019",
  "2020/21": "2020-21",
  "2021": "2021",
  "2022": "2022",
  "2023": "2023",
  "2024": "2024",
  "2025": "2025",
  "2026": "2026"
};

const fs = require("fs");
const path = require("path");


function loadSeasonData(season) {
  const fileName = seasonFileMap[season];

  if (!fileName) {
    throw new Error(`Invalid season: ${season}`);
  }

  const filePath = path.join(
    __dirname,
    "../data/seasons",
    `${fileName}.json`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Season data not found: ${season}`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return data.filter((row) => Number(row.innings) <= 2);
}


// 1. Most Runs
function getMostRuns(season) {
  const data = loadSeasonData(season);

  const playerRuns = {};

  data.forEach((row) => {
    const player = row.batter;

    if (!player) return;

    const runs = Number(row.runs_batter) || 0;

    if (!playerRuns[player]) {
      playerRuns[player] = 0;
    }

    playerRuns[player] += runs;
  });

  return Object.entries(playerRuns)
    .map(([player, runs]) => ({
      player,
      value: runs
    }))
    
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      ...item
    }));
}

// 2 MostWickets
function getMostWickets(season) {
  const data = loadSeasonData(season);

  const bowlerWickets = {};

  const bowlerDismissals = new Set([
    "bowled",
    "caught",
    "caught and bowled",
    "lbw",
    "stumped",
    "hit wicket"
  ]);

  data.forEach((row) => {
    const bowler = row.bowler;
    const wicketKind = row.wicket_kind;

    if (!bowler || !wicketKind) return;

    if (!bowlerDismissals.has(wicketKind)) {
      return;
    }

    if (!bowlerWickets[bowler]) {
      bowlerWickets[bowler] = 0;
    }

    bowlerWickets[bowler]++;
  });

  return Object.entries(bowlerWickets)
    .map(([player, wickets]) => ({
      player,
      value: wickets
    }))
    
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      ...item
    }));
}

// 3 most manoff the match
function getMostMOM(season) {
  const data = loadSeasonData(season);

  const momMatches = {};

  for (const row of data) {
    const player = row.player_of_match;
    const matchId = row.match_id;

    if (!player || !matchId) continue;

    if (!momMatches[player]) {
      momMatches[player] = new Set();
    }

    momMatches[player].add(matchId);
  }

  return Object.entries(momMatches)
    .map(([player, matches]) => ({
      player,
      value: matches.size
    }))
    .sort((a, b) => {
      if (b.value !== a.value) {
        return b.value - a.value;
      }

      return a.player.localeCompare(b.player);
    })
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      ...item
    }));
}

// 4 HighestTeamTotal
function getHighestTeamTotal(season) {
  const data = loadSeasonData(season);

  const inningsScores = new Map();

  for (const row of data) {
    const matchId = row.match_id;
    const team = row.batting_team;

    if (!matchId || !team) continue;

    const innings = row.innings;

    const key = `${matchId}-${innings}-${team}`;

    const score = Number(row.team_runs) || 0;

    inningsScores.set(key, {
      matchId,
      team,
      score
    });
  }

  const teamTotals = {};

  for (const innings of inningsScores.values()) {
    if (!teamTotals[innings.team]) {
      teamTotals[innings.team] = 0;
    }

    teamTotals[innings.team] += innings.score;
  }

  return Object.entries(teamTotals)
    .map(([team, value]) => ({
      team,
      value
    }))
    .sort((a, b) => b.value - a.value)
    .map((item, index) => ({
      rank: index + 1,
      team: item.team,
      value: item.value
    }));
}

// 5 MostWins
function getMostWins(season) {
  const data = loadSeasonData(season);

  const matchWinners = new Map();

  // Get one winner per match
  data.forEach((row) => {
    const matchId = row.match_id;
    const winner = row.match_won_by;

    if (!matchId || !winner || winner === "Unknown") {
      return;
    }

    if (!matchWinners.has(matchId)) {
      matchWinners.set(matchId, winner);
    }
  });

  // Count wins
  const wins = new Map();

  for (const winner of matchWinners.values()) {
    wins.set(winner, (wins.get(winner) || 0) + 1);
  }

  return Array.from(wins.entries())
    .map(([team, value]) => ({
      team,
      value
    }))
    .sort((a, b) => {
    if (b.value !== a.value) return b.value - a.value;
    return a.team.localeCompare(b.team);
    })
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      ...item
    }));
}

// Champion
function getChampion(season) {
  const data = loadSeasonData(season);

  const matches = new Map();

  data.forEach((row) => {
    const matchId = row.match_id;
    const date = row.date;
    const winner = row.match_won_by;

    if (!matchId || !date || !winner || winner === "Unknown") {
      return;
    }

    if (!matches.has(matchId)) {
      matches.set(matchId, {
        matchId,
        date,
        winner
      });
    }
  });

  const matchList = Array.from(matches.values());

  if (matchList.length === 0) {
    return null;
  }

  // Last match of the season = final
  matchList.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const finalMatch = matchList[0];

  return {
    team: finalMatch.winner
  };
}

// 6 MostSixes
function getMostSixes(season) {
  const data = loadSeasonData(season);

  const sixes = {};

  for (const row of data) {
    const player = row.batter;
    const runs = Number(row.runs_batter);

    if (!player || runs !== 6) continue;

    sixes[player] = (sixes[player] || 0) + 1;
  }

  return Object.entries(sixes)
    .map(([player, value]) => ({
      player,
      value
    }))
    .sort((a, b) => {
      if (b.value !== a.value) {
        return b.value - a.value;
      }

      return a.player.localeCompare(b.player);
    })
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      ...item
    }));
}
// 7 MostFour
function getMostFours(season) {
  const data = loadSeasonData(season);

  const fours = {};

  for (const row of data) {
    const player = row.batter;
    const runs = Number(row.runs_batter);

    if (!player || runs !== 4) continue;

    fours[player] = (fours[player] || 0) + 1;
  }

  return Object.entries(fours)
    .map(([player, value]) => ({
      player,
      value
    }))
    .sort((a, b) => {
      if (b.value !== a.value) {
        return b.value - a.value;
      }

      return a.player.localeCompare(b.player);
    })
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      ...item
    }));
}
// 8 BestBowlingFigures
function getBestBowlingFigures(season) {
  const data = loadSeasonData(season);

  const figures = new Map();

  data.forEach((row) => {
    const matchId = row.match_id;
    const innings = row.innings;
    const bowler = row.bowler;

    if (!matchId || !bowler) return;

    const key = `${matchId}-${innings}-${bowler}`;

    if (!figures.has(key)) {
      figures.set(key, {
        player: bowler,
        wickets: 0,
        runs: 0
      });
    }

    const figure = figures.get(key);

    figure.runs += Number(row.runs_bowler) || 0;

    if (Number(row.bowler_wicket) === 1) {
      figure.wickets += 1;
    }
  });

  return Array.from(figures.values())
    .filter((item) => item.wickets > 0)
    .sort((a, b) => {
      if (b.wickets !== a.wickets) {
        return b.wickets - a.wickets;
      }

      if (a.runs !== b.runs) {
        return a.runs - b.runs;
      }

      return a.player.localeCompare(b.player);
    })
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      player: item.player,
      figures: `${item.wickets}/${item.runs}`,
      wickets: item.wickets,
      runs: item.runs
    }));
}

// 9
function getHighestAverageScore(season) {
  const data = loadSeasonData(season);

  const inningsScores = new Map();

  for (const row of data) {
    const matchId = row.match_id;
    const team = row.batting_team;

    if (!matchId || !team) continue;

    const innings = row.innings;
    const key = `${matchId}-${innings}-${team}`;

    const score = Number(row.team_runs) || 0;

    inningsScores.set(key, {
      team,
      score
    });
  }

  const teamStats = {};

  for (const innings of inningsScores.values()) {
    if (!teamStats[innings.team]) {
      teamStats[innings.team] = {
        total: 0,
        innings: 0
      };
    }

    teamStats[innings.team].total += innings.score;
    teamStats[innings.team].innings++;
  }

  return Object.entries(teamStats)
    .map(([team, stats]) => ({
      team,
      average: Number((stats.total / stats.innings).toFixed(2)),
      innings: stats.innings,
      total: stats.total
    }))
    .sort((a, b) => {
      if (b.average !== a.average) {
        return b.average - a.average;
      }

      return a.team.localeCompare(b.team);
    })
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      ...item
    }));
}

// 10 
function getHighestSingleMatchScore(season) {
  const data = loadSeasonData(season);

  const inningsScores = new Map();

  for (const row of data) {
    const matchId = row.match_id;
    const team = row.batting_team;

    if (!matchId || !team) continue;

    const innings = row.innings;
    const key = `${matchId}-${innings}-${team}`;
    const score = Number(row.team_runs) || 0;

    // team_runs is cumulative, so keep the final value
    inningsScores.set(key, {
      matchId,
      team,
      score
    });
  }

  return Array.from(inningsScores.values())
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.team.localeCompare(b.team);
    })
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      team: item.team,
      score: item.score,
      matchId: item.matchId
    }));
}
module.exports = {
  loadSeasonData,
  getMostRuns,
  getMostWickets,
  getMostMOM,
  getHighestTeamTotal,
  getMostWins,
  getChampion,
  getMostSixes,
  getMostFours,
  getBestBowlingFigures,
  getHighestAverageScore,
  getHighestSingleMatchScore
};