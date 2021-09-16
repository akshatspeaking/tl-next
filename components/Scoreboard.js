export default function Scoreboard({ score, multiplier }) {
  return (
    <div className="ScoreBoard">
      <div className="ScoreBox">
        <span>{score}</span>
        <p className="label">SCORE</p>
      </div>
      <div className="MultiplierBox">
        <p>{multiplier}X</p>
      </div>
    </div>
  );
}
