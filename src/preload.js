const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Controller sends commands to display (via main process)
  sendCommand: (msg) => ipcRenderer.send('overlay-command', msg),

  // Controller gets list of displays
  getDisplays: () => ipcRenderer.invoke('get-displays'),

  // Display receives commands from main process
  onCommand: (callback) => {
    ipcRenderer.on('overlay-command', (_event, msg) => callback(msg));
  },

  // Remove listener on cleanup
  removeCommandListener: () => {
    ipcRenderer.removeAllListeners('overlay-command');
  },
});
