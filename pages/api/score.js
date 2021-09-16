import connectDB from "../../middleware/mongodb";
import Score from "../../models/score";

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const score = new Score({
        name: req.body.name,
        score: req.body.score,
      });
      const newScore = await score.save();
      const scoreList = await Score.find().sort({ score: -1 });
      const rank = scoreList.indexOf(
        scoreList.find((obj) => obj.id === newScore.id)
      );
      const numberOfGames = scoreList.length;
      const averageScore =
        scoreList.reduce((acc, cv) => {
          return acc + cv.score;
        }, 0) / numberOfGames;
      const topten = scoreList.slice(0, 10);

      res.status(200).json({
        leaderboard: topten,
        rank,
        gamesPlayed: numberOfGames,
        averageScore,
      });
    } else {
      const scoreList = await Score.find().sort({ score: -1 });
      const numberOfGames = scoreList.length;
      const averageScore =
        scoreList.reduce((acc, cv) => {
          return acc + cv.score;
        }, 0) / numberOfGames;
      const topten = scoreList.slice(0, 10);

      res.status(200).json({
        leaderboard: topten,
        gamesPlayed: numberOfGames,
        averageScore,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default connectDB(handler);
