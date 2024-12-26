const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  app.commandLine.appendSwitch('enable-widevine-cdm');
  app.commandLine.appendSwitch('plugins', 'true');

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      plugins: true,
    },
    icon: path.join(__dirname, 'assets/icon.ico'),
  });

  mainWindow.loadURL('https://zvuk.com');
  Menu.setApplicationMenu(null);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
