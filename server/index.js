const http = require("http");
const SocketService = require("./SocketService");

const server = http.createServer((req, res) => {
  res.write("🚀 served well!");
  res.end();
});

const port = 2313;

server.listen(port, () => {
  console.log(`api.prolifel.dev is alive on: ${port}`);
  const socketService = new SocketService();

  // pass server to socket.io in SocketService.js
  socketService.attachServer(server);
});
