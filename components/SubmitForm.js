import { useState } from "react";
import Spinner from "./Spinner";

export default function SubmitForm({
  finalScore,
  setRank,
  setAverageScore,
  setGamesPlayed,
  rank,
  setLeaderboardData,
  hasPostedScore,
  setHasPostedScore,
}) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveScore() {
    setIsLoading(true);
    fetch("http://localhost:3000/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        score: finalScore,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRank(data.rank + 1);
        setLeaderboardData(data.leaderboard);
        setGamesPlayed(data.gamesPlayed);
        setAverageScore(data.averageScore);
        setIsLoading(false);
        setHasPostedScore(true);
      });
  }
  if (isLoading) {
    return <Spinner />;
  } else if (hasPostedScore) {
    return (
      <div className="FinalScore">
        <h3>Your name: {username}</h3>
        <h3>Your score: {finalScore}</h3>
      </div>
    );
  } else
    return (
      <div>
        <div className="submitform">
          <h3>Your final score is {finalScore}</h3>
          <h3> Enter your name to submit your score.</h3>
          <input
            type="text"
            valueu={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className={username.length ? "btn" : "disabled"}
            disabled={!username.length}
            onClick={saveScore}
          >
            Submit
          </button>
        </div>
      </div>
    );
}
