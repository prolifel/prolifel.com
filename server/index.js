const os = require("os");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const pty = require("node-pty");

const { Server } = require("socket.io");
const io = new Server(server);

const PTYService = require("./PTYService");
const shell = os.platform() === "win32" ? "cmd.exe" : "bash";

app.get("/", (req, res) => {
  res.send("🚀 served well");
});

io.on("connection", (socket) => {
  console.log(`a user is connected: ${socket.id}`);

  var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 24,
    cwd: process.env.HOME, // where terminal start
    env: process.env, // pass env variables
  });

  ptyProcess.onData((data) => {
    console.log(`input: ${data}`);
    socket.emit("output", data);
  });

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on("input", (data) => {
    ptyProcess.write(data);
  });
});

server.listen(8000, () => {
  console.log("🚀 served on :8000");
});
