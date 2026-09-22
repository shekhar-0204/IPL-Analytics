const express = require("express");

const {
  getSeasons,
  getSeasonStatistics,
  getQuestionResult
} = require("../controllers/analyticsController");

const router = express.Router();


// GET all seasons
router.get("/seasons", getSeasons);


// GET all statistics for a season
router.get("/seasons/:season", getSeasonStatistics);


// GET answer for a specific question
router.get(
  "/seasons/:season/question/:questionId",
  getQuestionResult
);


module.exports = router;