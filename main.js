const { app, BrowserWindow, Menu, session } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

app.on('ready', () => {
  const certificatePath = path.join(__dirname, 'russian_trusted_root_ca.cer');
  const certificateData = fs.readFileSync(certificatePath);
  session.defaultSession.loadExtension(certificateData);
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: __dirname + '/icon.png',
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
