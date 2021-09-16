import { useContext, useEffect, useState } from "react";
import Leaderboard from "../../components/Leaderboard";
import SubmitForm from "../../components/SubmitForm";
import { ScoreContext } from "../../context/ScoreContextProvider";
import Link from "next/link";

export default function LeaderboardPage({ data }) {
  const { scoreStore } = useContext(ScoreContext);

  const [leaderboardData, setLeaderboardData] = useState(data.leaderboard);
  const [gamesPlayed, setGamesPlayed] = useState(data.gamesPlayed);
  const [averageScore, setAverageScore] = useState(data.averageScore);
  const [rank, setRank] = useState(null);
  const [hasPostedScore, setHasPostedScore] = useState(false);

  return (
    <div>
      <Link href="/">
        <a className="start-btn reset-btn">Restart</a>
      </Link>
      {scoreStore || hasPostedScore ? (
        <div>
          <SubmitForm
            setRank={setRank}
            setAverageScore={setAverageScore}
            setGamesPlayed={setGamesPlayed}
            setLeaderboardData={setLeaderboardData}
            finalScore={scoreStore}
            hasPostedScore={hasPostedScore}
            setHasPostedScore={setHasPostedScore}
          />
          <Leaderboard
            rank={rank}
            data={leaderboardData}
            gamesPlayed={gamesPlayed}
            averageScore={averageScore}
          />
        </div>
      ) : (
        <Leaderboard
          rank={rank}
          data={leaderboardData}
          gamesPlayed={gamesPlayed}
          averageScore={averageScore}
        />
      )}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/score");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
