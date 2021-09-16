export default function Leaderboard({ rank, data, gamesPlayed, averageScore }) {
  return (
    <div className="leaderboard">
      {rank ? <h3>Your Rank : {rank} </h3> : null}
      <h1>LeaderBoard</h1>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {data?.map((obj, i) => (
              <tr
                key={obj.name + i}
                className={rank === i + 1 ? "highlight" : null}
              >
                <td>{i + 1}</td>
                <td>{obj.name} </td>
                <td>{obj.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Total Games Played : {gamesPlayed}</h2>
      <h2>Average Score : {Math.ceil(averageScore)}</h2>
    </div>
  );
}
