const os = require("os");
const pty = require("node-pty");

class PTY {
  constructor(socket) {
    this.shell = os.platform() === "win32" ? "cmd.exe" : "bash";
    this.ptyProcess = null;
    this.socket = socket;

    // init pty
    this.startPtyProcess();
  }

  startPtyProcess() {
    this.ptyProcess = pty.spawn(this.shell, [], {
      name: "xterm-color",
      cols: 80,
      rows: 24,
      cwd: process.env.HOME, // where terminal start
      env: process.env, // pass env variables
    });

    this.ptyProcess.onData((data) => {
      // if ptyprocess generates data, send the output to socket
      console.log(data);
      // this.sendToClient(data);
      this.socket.emit("output", data);
    });
  }

  // send input from client to pty
  write(data) {
    console.log(`write ${data}`);
    this.ptyProcess.write(data);
  }

  sendToClient(data) {
    console.log(data);
    this.socket.emit("output", data);
  }
}

module.exports = PTY;
