const express = require("express");
const { getGameHistory, getGameById } = require("../controllers/gameControoler");

const router = express.Router();

router.get("/history", getGameHistory);
router.get("/:id", getGameById);

module.exports = router;