const { app, contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ["run-game"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
});