const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  roomId: String,
  players: { X: String, O: String },
  moves: [{ player: String, position: Number }],
  winner: String, // "X", "O", or "draw"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Game", gameSchema);