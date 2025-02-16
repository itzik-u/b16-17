const WebSocket = require("ws");
const { saveGameHistory } = require("./controllers/gameController");

const wss = new WebSocket.Server({ server });

const rooms = {}; // Store active games

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "createRoom") {
      rooms[data.roomId] = { players: {}, moves: [] };
    }

    if (data.type === "joinRoom") {
      const room = rooms[data.roomId];
      if (room && Object.keys(room.players).length < 2) {
        room.players[data.player] = ws;
      }
    }

    if (data.type === "move") {
      const room = rooms[data.roomId];
      room.moves.push({ player: data.player, position: data.position });

      if (checkWin(room.moves)) {
        saveGameHistory(data.roomId, room.players, room.moves, data.player);
        delete rooms[data.roomId];
      }
    }
  });
});
