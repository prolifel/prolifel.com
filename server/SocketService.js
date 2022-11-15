const socketIO = require("socket.io");
const PTYService = require("./PTYService");

class SocketService {
  constructor() {
    this.socket = null;
    this.pty = null;
  }

  attachServer(server) {
    if (!server) {
      throw new Error("api.prolifel.dev not found 😿");
    }

    const io = socketIO(server);
    console.log("socket server is created, waiting client connection");

    io.on("connection", (socket) => {
      console.log(`client connect to socket ${socket.id}`);

      this.socket = socket;
      this.socket.on("disconnect", () => {
        console.log(`socket disconnected 😿 ${socket.id}`);
      });

      this.pty = new PTYService(this.socket);
      this.socket.on("input", (input) => {
        console.log(`input: ${input}`);
        this.pty.write(input);
      });
    });
  }
}

module.exports = SocketService;
