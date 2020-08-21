const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const path = require('path')
const url = require('url')

const Application = require('./application')
const { channels } = require('../shared/constants')

let mainWindow

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    })
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 650,
    frame: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  mainWindow.loadURL(startUrl)
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  global.application = new Application()
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
  })
})

ipcMain.on(channels.NGINX_RELOAD, async (event) => {
  try {
    await global.application.nginx.reload()
    const notice = new Notification({
      title: 'congratulation',
      body: 'reload nginx success 👍',
    })
    notice.show()
  } catch (e) {
    const notice = new Notification({
      title: 'heart-broken',
      body: 'reload nginx failure 😐',
    })
    notice.show()
  }
  event.sender.send(channels.NGINX_RELOAD)
})

ipcMain.on(channels.NGINX_SAVE, async (event, { server, value }) => {
  try {
    await global.application.nginx.saveFile(server, value)
    event.sender.send(channels.NGINX_SAVE)
  } catch (e) {}
})
