const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';
let controllerWin = null;
let displayWin = null;

function createWindows() {
  const displays = screen.getAllDisplays();
  const primaryDisplay = screen.getPrimaryDisplay();

  // Find secondary display (projector) if available
  const secondaryDisplay = displays.find(d => d.id !== primaryDisplay.id) || primaryDisplay;

  // ── Controller Window ─────────────────────────────────────────────────────
  controllerWin = new BrowserWindow({
    x: primaryDisplay.bounds.x + 40,
    y: primaryDisplay.bounds.y + 40,
    width: 500,
    height: 820,
    minWidth: 420,
    minHeight: 600,
    title: 'Bible Overlay — Controller',
    backgroundColor: '#0d0d1a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  controllerWin.loadFile(path.join(__dirname, 'controller.html'));
  controllerWin.on('closed', () => {
    controllerWin = null;
    if (displayWin) displayWin.close();
  });

  // ── Display Window ────────────────────────────────────────────────────────
  // On macOS, we use a vibrancy-free transparent window.
  // 'screen-saver' level on mac puts it above everything including fullscreen apps.
  displayWin = new BrowserWindow({
    x: secondaryDisplay.bounds.x,
    y: secondaryDisplay.bounds.y,
    width: secondaryDisplay.bounds.width,
    height: secondaryDisplay.bounds.height,
    title: 'Bible Overlay — Display',
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    // macOS: allow window to appear over fullscreen spaces
    ...(isMac && { type: 'panel' }),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  displayWin.loadFile(path.join(__dirname, 'display.html'));
  displayWin.setIgnoreMouseEvents(true);

  // Use 'screen-saver' level — works on both Windows and macOS
  displayWin.setAlwaysOnTop(true, 'screen-saver');

  // macOS: make it appear on all Spaces/desktops
  if (isMac) {
    displayWin.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  }

  displayWin.on('closed', () => {
    displayWin = null;
  });
}

// ── IPC handlers — relay messages from controller to display ─────────────────
ipcMain.on('overlay-command', (event, msg) => {
  if (!displayWin) return;

  switch (msg.type) {
    case 'verse':
    case 'show':
    case 'hide':
    case 'clear':
    case 'size':
    case 'position':
      displayWin.webContents.send('overlay-command', msg);
      break;

    case 'move-display': {
      // User picked a different screen for the display window
      const displays = screen.getAllDisplays();
      const target = displays.find(d => d.id === msg.displayId);
      if (target && displayWin) {
        displayWin.setBounds({
          x: target.bounds.x,
          y: target.bounds.y,
          width: target.bounds.width,
          height: target.bounds.height,
        });
      }
      break;
    }
  }
});

// Let controller query available screens
ipcMain.handle('get-displays', () => {
  return screen.getAllDisplays().map(d => ({
    id: d.id,
    label: `Display ${d.id} (${d.bounds.width}x${d.bounds.height})`,
    bounds: d.bounds,
    isPrimary: d.id === screen.getPrimaryDisplay().id,
  }));
});

// ── App lifecycle ─────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindows();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindows();
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
