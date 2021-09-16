const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.models.Score || mongoose.model("Score", ScoreSchema);
