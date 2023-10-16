const {app, BrowserWindow,screen} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow () {
  const size = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    icon:path.join(__dirname, `/dist/contact-app/assets/images/contacts.png`),
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true
    }
  })


  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/contact-app/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
