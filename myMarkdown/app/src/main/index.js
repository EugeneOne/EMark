'use strict'

import {app, BrowserWindow, Menu, ipcMain, dialog, Tray} from 'electron'
import * as util from './util'
import * as trayUtil from './trayUtil';
// import * as topMenu from './menu';

let mainWindow;

function initApp() {
    //注册菜单
    // topMenu.initMenu()

    //创建主窗口
    createMainWindow();
    //托盘处理
    util.isMac() && trayUtil.createTray();

    registerIPC();
}

function createMainWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 750,
        width: 1000,
        webPreferences: {
            webSecurity: false
        }
    })

    mainWindow.loadURL(util.winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // eslint-disable-next-line no-console
    console.log('mainWindow opened')
}
app.on('ready', initApp)

app.on('window-all-closed', () => {
    if (!util.isMac()) {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow()
    }
})
/**
 * 注册IPC事件
 */
const registerIPC = function () {
    ipcMain.on('open-file-dialog', function (event) {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }, function (files) {
            if (files) event.sender.send('selected-directory', files)
        })
    })
}

/**
 * 注册菜单
 * @returns {[*,*,*,*]}
 */

