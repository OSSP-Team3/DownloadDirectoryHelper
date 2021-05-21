const {app, BrowserWindow} = require('electron')
const path = require('path')

require('electron-reload')(__dirname);

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 955,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    minWidth:955
  })
  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})
