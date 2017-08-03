import { app, BrowserWindow, ipcMain, webContents } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow(path) {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 750,
    useContentSize: true,
    width: 1000
  })
  mainWindow.loadURL(winURL)
  mainWindow.show();
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}

// ipcMain.on('newScreen', (event, path) => {
//   createWindow(path);
// })

// app.addRecentDocument("/Users/wanyuqing/Desktop/未命名.md")

app.on('open-file', (event, path) => {
  if (mainWindow == null) {
    createWindow(path)
  }
  setTimeout(function () {
    mainWindow.webContents.send('newFile', path, 'new')
  }, 1000)

})


app.on('ready', () => {
  createWindow()
})

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow()
  }
})

app.on('will-quit', () => {
  if(mainWindow) {
    mainWindow.webContents.send('close')
  } else {
    app.quit()
  }
})

ipcMain.on('closeAll', () => {
  app.quit()
})

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })