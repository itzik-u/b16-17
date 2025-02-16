const Game = require("../modules/GameModel");

async function saveGameHistory(roomId, players, moves, winner) {
  const game = new Game({ roomId, players, moves, winner });
  await game.save();
}

async function getGameHistory(req, res) {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getGameById(req, res) {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { saveGameHistory, getGameHistory, getGameById };
