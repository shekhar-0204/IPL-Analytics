const {
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
} = require("../services/statisticsService");

// Get all available seasons
const getSeasons = (req, res) => {
  try {
    const seasons = [
      "2007/08",
      "2009",
      "2009/10",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020/21",
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
      "2026"
    ];

    res.status(200).json({
      success: true,
      count: seasons.length,
      seasons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get all statistics for a season
const getSeasonStatistics = (req, res) => {
  try {
    const { season } = req.params;

   const results = {
    champion: getChampion(season),

    mostRuns: getMostRuns(season),
    mostWickets: getMostWickets(season),
    mostMOM: getMostMOM(season),
    highestTeamTotal: getHighestTeamTotal(season),
    mostWins: getMostWins(season),
    mostSixes: getMostSixes(season),
    mostFours: getMostFours(season),
    bestBowlingFigures: getBestBowlingFigures(season),
    highestAverageScore: getHighestAverageScore(season),
    highestSingleMatchScore: getHighestSingleMatchScore(season)
    };

    res.status(200).json({
      success: true,
      season,
      data: results
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get statistics based on question ID
const getQuestionResult = (req, res) => {
  try {
    const { season, questionId } = req.params;

    let result;
    let question;

    switch (questionId) {
      case "1":
        question = "Who scored the most runs?";
        result = getMostRuns(season);
        break;

      case "2":
        question = "Who took the most wickets?";
        result = getMostWickets(season);
        break;

      case "3":
        question = "Who won the most Man of the Match awards?";
        result = getMostMOM(season);
        break;

      case "4":
        question = "Which team scored the highest total?";
        result = getHighestTeamTotal(season);
        break;

      case "5":
        question = "Which team won the most matches?";
        result = getMostWins(season);
        break;

      case "6":
        question = "Who hit the most sixes?";
        result = getMostSixes(season);
        break;

      case "7":
        question = "Who hit the most fours?";
        result = getMostFours(season);
        break;

      case "8":
        question = "Who had the best bowling figures?";
        result = getBestBowlingFigures(season);
        break;

      case "9":
        question = "Which team had the highest average score?";
        result = getHighestAverageScore(season);
        break;

      case "10":
        question = "Which team scored the highest total in a single match?";
        result = getHighestSingleMatchScore(season);
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid question ID. Use 1 to 10."
        });
    }

    res.status(200).json({
      success: true,
      season,
      questionId,
      question,
      results: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  getSeasons,
  getSeasonStatistics,
  getQuestionResult
};