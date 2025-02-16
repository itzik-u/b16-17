const socket = new WebSocket("ws://localhost:5000");

let player = "X"; 
let roomId = null;

document.getElementById("create-room").addEventListener("click", () => {
    roomId = Math.random().toString(36).substring(7);
    socket.send(JSON.stringify({ type: "createRoom", roomId }));
    alert(`Room created: ${roomId}`);
});

document.getElementById("join-room").addEventListener("click", () => {
    roomId = document.getElementById("room-id").value;
    socket.send(JSON.stringify({ type: "joinRoom", roomId, player }));
});

const board = document.getElementById("game-board");
const cells = Array.from({ length: 9 }).map((_, i) => {
    const btn = document.createElement("button");
    btn.classList.add("cell");
    btn.addEventListener("click", () => {
        socket.send(JSON.stringify({ type: "move", roomId, player, position: i }));
    });
    board.appendChild(btn);
    return btn;
});

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "updateBoard") {
        data.board.forEach((cell, i) => {
            cells[i].innerText = cell || "";
        });
    }
};

fetch("/api/games/history")
    .then((res) => res.json())
    .then((data) => {
        const historyList = document.getElementById("history");
        data.forEach((game) => {
            const li = document.createElement("li");
            li.textContent = `Room: ${game.roomId}, Winner: ${game.winner}`;
            historyList.appendChild(li);
        });
    });
