import { Menu, app, dialog, BrowserWindow } from 'electron'
import fs from 'fs'
// import vuem from '../renderer/main'

//主进程使用 BrowserWindow 实例创建页面
const focusedWindow = BrowserWindow.getFocusedWindow()

export const initMenu = function () {
    const menu = Menu.buildFromTemplate(getMenuData())
    Menu.setApplicationMenu(menu)
}

function openFile() {
    //弹框
    dialog.showOpenDialog(focusedWindow, {
        title: 'Open Dialog',
        filters: [{
            name: 'Documents', extensions: ['txt', 'md']
        }],
        properties: ['openFile']
    }, function (item) {
        if (item) {
            readFile(item[0])
        }
    })
}

function openDialog(type, msg) {
    dialog.showMessageBox(focusedWindow, {
        title: type,
        type: type,
        buttons: ['OK'],
        detail: msg
    })
}

function readFile(path) {
    fs.readFile(path, 'utf8', function (err, content) {
        // console.log("store:",vuem.$store)
        // vuem.$store.dispatch('sertTxt', content)
        // openDialog('error', err.toString())
    })
}

const getMenuData = function () {
    const template = [
        {
            label: '文件',
            submenu: [
                // {role: 'undo'},
                // {role: 'redo'},
                // {type: 'separator'},
                // {role: 'cut'},
                // {role: 'copy'},
                // {role: 'paste'},
                // {role: 'pasteandmatchstyle'},
                // {role: 'delete'},
                // {role: 'selectall'}
                {
                    label: "新建文件",
                    click: function () {
                        openFile()
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            role: 'window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' }
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        require('electron').shell.openExternal('https://electron.atom.io')
                    }
                }
            ]
        }
    ]

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        })

        // Edit menu
        template[1].submenu.push(
            { type: 'separator' },
            {
                label: 'Speech',
                submenu: [
                    { role: 'startspeaking' },
                    { role: 'stopspeaking' }
                ]
            }
        )

        // Window menu
        template[3].submenu = [
            { role: 'close' },
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' }
        ]
    }
    return template;
}