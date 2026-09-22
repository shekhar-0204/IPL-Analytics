import { useEffect, useState } from "react";
import { Search, Sparkles, AlertCircle } from "lucide-react";

const QUESTIONS = [
  { id: "1", text: "Who scored the most runs?" },
  { id: "2", text: "Who took the most wickets?" },
  { id: "3", text: "Who won the most Man of the Match awards?" },
  { id: "4", text: "Which team scored the highest total?" },
  { id: "5", text: "Which team won the most matches?" },
  { id: "6", text: "Who hit the most sixes?" },
  { id: "7", text: "Who hit the most fours?" },
  { id: "8", text: "Who had the best bowling figures?" },
  { id: "9", text: "Which team had the highest average score?" },
  {
    id: "10",
    text: "Which team scored the highest total in a single match?",
  },
];

function QuestionSearch({ onSelect, loading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) {
      setSuggestions([]);
      return;
    }

    const words = searchText.split(/\s+/).filter(Boolean);

    const matchedQuestions = QUESTIONS.filter((question) => {
      const questionText = question.text.toLowerCase();

      return words.every((word) => questionText.includes(word));
    });

    setSuggestions(matchedQuestions);
  }, [query]);

  const handleSelect = (question) => {
    setQuery(question.text);
    setSuggestions([]);

    onSelect(question);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  return (
    <section className="question-search">
      <div className="question-search-heading">
        <div className="search-badge">
          <Sparkles size={15} />
          IPL DATA EXPLORER
        </div>

        <h2>Ask about IPL statistics</h2>

        <p>
          Search from the available IPL statistics and explore the results.
        </p>
      </div>

      <div className="question-search-box">
        <Search
          size={21}
          className="question-search-icon"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your question..."
          disabled={loading}
        />

        {query && (
          <button
            type="button"
            className="clear-search"
            onClick={handleClear}
          >
            ×
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="question-suggestions">
          <div className="suggestions-title">
            SEARCH SUGGESTIONS
          </div>

          {suggestions.map((question) => (
            <button
              type="button"
              key={question.id}
              className="question-suggestion"
              onClick={() => handleSelect(question)}
            >
              <span className="suggestion-icon">
                <Search size={16} />
              </span>

              <span>{question.text}</span>
            </button>
          ))}
        </div>
      )}

      {query.trim() && suggestions.length === 0 && (
        <div className="not-matched">
          <div className="not-matched-icon">
            <AlertCircle size={20} />
          </div>

          <div>
            <strong>No matching question found</strong>

            <p>
              Try searching for runs, wickets, Man of the Match,
              wins, sixes, fours or team scores.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default QuestionSearch;