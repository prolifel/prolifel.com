const os = require("os");
const pty = require("node-pty");

class PTY {
  constructor(socket) {
    this.shell = os.platform() === "win32" ? "powershell.exe" : "bash";
    this.ptyProcess = null;
    this.socket = socket;

    // init pty
    this.startPtyProcess();
  }

  startPtyProcess() {
    this.ptyProcess = pty.spawn(this.shell, [], {
      name: "xterm-color",
      cwd: process.env.HOME, // where terminal start
      env: process.env, // pass env variables
    });

    this.ptyProcess.onData((data) => {
      // if ptyprocess generates data, send the output to socket
      this.sendToClient(data);
    });
  }

  // send input from client to pty
  write(data) {
    this.ptyProcess.write(data);
  }

  sendToClient(data) {
    this.socket.emit("output", data);
  }
}

module.exports = PTY;
