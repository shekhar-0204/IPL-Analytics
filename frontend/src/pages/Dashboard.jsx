import { useEffect, useRef, useState } from "react";

import {
  getSeasons,
  getSeasonStatistics,
  getQuestionResult,
} from "../services/api";

import Navbar from "../components/Navbar";
import SeasonSelector from "../components/SeasonSelector";
import ChampionCard from "../components/ChampionCard";
import OverviewCards from "../components/OverviewCards";
import QuestionSearch from "../components/QuestionSearch";
import RankingTable from "../components/RankingTable";
import ScoreCard from "../components/ScoreCard";
import BowlingTable from "../components/BowlingTable";
import RankingChart from "../components/RankingChart";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Dashboard() {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");

  const [data, setData] = useState(null);

  // Selected question from search
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionResult, setQuestionResult] = useState(null);

  const [loadingSeasons, setLoadingSeasons] = useState(true);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);

  const [error, setError] = useState("");
  const [questionError, setQuestionError] = useState("");

  // Reference for complete search + result area
  const questionAreaRef = useRef(null);

  // --------------------------------------------------
  // Fetch all seasons
  // --------------------------------------------------
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoadingSeasons(true);
        setError("");

        const response = await getSeasons();

        setSeasons(response.seasons);

        if (response.seasons.length > 0) {
          setSelectedSeason(
            response.seasons[response.seasons.length - 1]
          );
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load IPL seasons.");
      } finally {
        setLoadingSeasons(false);
      }
    };

    fetchSeasons();
  }, []);

  // --------------------------------------------------
  // Fetch season overview statistics
  // --------------------------------------------------
  useEffect(() => {
    if (!selectedSeason) return;

    const fetchStatistics = async () => {
      try {
        setLoadingStats(true);
        setError("");

        const response = await getSeasonStatistics(selectedSeason);

        setData(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load season statistics.");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStatistics();
  }, [selectedSeason]);

  // --------------------------------------------------
  // Clear question result when season changes
  // --------------------------------------------------
  useEffect(() => {
    setSelectedQuestion(null);
    setQuestionResult(null);
    setQuestionError("");
    setLoadingQuestion(false);
  }, [selectedSeason]);

  // --------------------------------------------------
  // Hide question result when clicking outside
  // --------------------------------------------------
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        questionAreaRef.current &&
        !questionAreaRef.current.contains(event.target)
      ) {
        setSelectedQuestion(null);
        setQuestionResult(null);
        setQuestionError("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // --------------------------------------------------
  // Search question result
  // --------------------------------------------------
  const handleQuestionSelect = async (question) => {
    try {
      setSelectedQuestion(question);
      setQuestionResult(null);
      setQuestionError("");
      setLoadingQuestion(true);

      const response = await getQuestionResult(
        selectedSeason,
        question.id
      );

      if (!response.success) {
        setQuestionError(
          response.message || "No result found."
        );
        return;
      }

      setQuestionResult(response);
    } catch (error) {
      console.error(error);

      setQuestionError(
        "Unable to load the answer. Please try again."
      );
    } finally {
      setLoadingQuestion(false);
    }
  };

  // --------------------------------------------------
  // Render selected question result
  // --------------------------------------------------
  const renderQuestionResult = () => {
    if (!selectedQuestion || !questionResult) {
      return null;
    }

    const result = questionResult.results;

    switch (selectedQuestion.id) {
      case "1":
        return (
          <>
            <RankingChart
              title="Most Runs"
              data={result}
            />

            <RankingTable
              title="Most Runs"
              data={result}
            />
          </>
        );

      case "2":
        return (
          <>
            <RankingChart
              title="Most Wickets"
              data={result}
            />

            <RankingTable
              title="Most Wickets"
              data={result}
            />
          </>
        );

      case "3":
        return (
          <>
            <RankingChart
              title="Man of the Match Awards"
              data={result}
            />

            <RankingTable
              title="Man of the Match Awards"
              data={result}
            />
          </>
        );

      case "4":
        return (
          <>
            <RankingChart
              title="Highest Team Total"
              data={result}
            />

            <ScoreCard
              title="Highest Team Total"
              data={result}
            />
          </>
        );

      case "5":
        return (
          <>
            <RankingChart
              title="Most Wins"
              data={result}
            />

            <ScoreCard
              title="Most Wins"
              data={result}
            />
          </>
        );

      case "6":
        return (
          <>
            <RankingChart
              title="Most Sixes"
              data={result}
            />

            <RankingTable
              title="Most Sixes"
              data={result}
            />
          </>
        );

      case "7":
        return (
          <>
            <RankingChart
              title="Most Fours"
              data={result}
            />

            <RankingTable
              title="Most Fours"
              data={result}
            />
          </>
        );

      case "8":
        return (
          <BowlingTable
            title="Best Bowling Figures"
            data={result}
          />
        );

      case "9":
        return (
          <>
            <RankingChart
              title="Highest Average Score"
              data={result}
              valueKey="average"
            />

            <ScoreCard
              title="Highest Average Score"
              data={result}
              valueKey="average"
            />
          </>
        );

      case "10":
        return (
          <>
            <RankingChart
              title="Highest Single Match Score"
              data={result}
              valueKey="score"
            />

            <ScoreCard
              title="Highest Single Match Score"
              data={result}
              valueKey="score"
            />
          </>
        );

      default:
        return null;
    }
  };

  // --------------------------------------------------
  // Loading seasons
  // --------------------------------------------------
  if (loadingSeasons) {
    return (
      <LoadingSpinner message="Loading IPL seasons..." />
    );
  }

  // --------------------------------------------------
  // Global error
  // --------------------------------------------------
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-container">

        {/* ==========================================
            HEADER
        ========================================== */}
        <section className="dashboard-header">
          <div>
            <p className="eyebrow">
              Indian Premier League
            </p>

            <h1>
              IPL Statistics
              <span> Dashboard</span>
            </h1>

            <p className="dashboard-description">
              Explore player and team performance across
              IPL seasons.
            </p>
          </div>

          <SeasonSelector
            seasons={seasons}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
          />
        </section>

        {/* ==========================================
            SEASON DATA LOADING
        ========================================== */}
        {loadingStats && (
          <LoadingSpinner
            message={`Loading ${selectedSeason} statistics...`}
          />
        )}

        {/* ==========================================
            DASHBOARD DATA
        ========================================== */}
        {!loadingStats && data && (
          <>
            {/* ======================================
                CHAMPION
            ====================================== */}
            <section className="champion-section">
              <ChampionCard
                champion={data.champion}
                season={selectedSeason}
              />
            </section>

            {/* ======================================
                OVERVIEW
            ====================================== */}
            <section className="overview-section">
              <OverviewCards data={data} />
            </section>

            {/* ======================================
                QUESTION SEARCH + RESULT
            ====================================== */}
            <section
              className="analytics-section"
              ref={questionAreaRef}
            >
              {/* Search */}
              <QuestionSearch
                onSelect={handleQuestionSelect}
                loading={loadingQuestion}
              />

              {/* ====================================
                  QUESTION LOADING
              ==================================== */}
              {loadingQuestion && (
                <div className="question-loading">
                  <LoadingSpinner
                    message={`Finding answer for ${selectedSeason}...`}
                  />
                </div>
              )}

              {/* ====================================
                  QUESTION ERROR
              ==================================== */}
              {!loadingQuestion && questionError && (
                <div className="question-error">
                  {questionError}
                </div>
              )}

              {/* ====================================
                  SELECTED QUESTION RESULT
              ==================================== */}
              {!loadingQuestion &&
                !questionError &&
                selectedQuestion &&
                questionResult && (
                  <div className="question-result">

                    {/* Result Header */}
                    <div className="question-result-header">
                      <div>
                        <span className="result-kicker">
                          IPL {selectedSeason}
                        </span>

                        <h2>
                          {selectedQuestion.text}
                        </h2>
                      </div>

                      <div className="result-season">
                        {selectedSeason}
                      </div>
                    </div>

                    {/* Chart + Table */}
                    <div className="ranking-container">
                      {renderQuestionResult()}
                    </div>

                  </div>
                )}
            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default Dashboard;