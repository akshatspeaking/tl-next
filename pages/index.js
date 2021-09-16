import Link from "next/link";
import { useContext, useEffect } from "react";
import { ScoreContext } from "../context/ScoreContextProvider";

export default function Home() {
  const { setScoreStore } = useContext(ScoreContext);

  useEffect(() => {
    setScoreStore(0);
  }, []);
  return (
    <div className="InstructionsBoard">
      <h3>Word Race</h3>
      <Link href="/game">
        <a className="start-btn">Start Game</a>
      </Link>
      <Link href="/leaderboard">
        <a className="start-btn">View Leaderboard</a>
      </Link>
    </div>
  );
}
