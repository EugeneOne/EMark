<template>
    <div id="markdown">
        <div class="markdownOut">
            <mark-nav @save="dialogAndSave"></mark-nav>
            <section>
                <input-page :width=inputWidth class="input page" @dialogAndSave="dialogAndSave"></input-page>
                <output-page :width=outputWidth class="out page"></output-page>
            </section>
    
        </div>
    </div>
</template>
<script>
// require('animate.css')
import markNav from "./models/markNav.vue"
import inputPage from "./models/inputPage.vue"
import outputPage from "./models/outputPage.vue"

const remote = require('electron').remote
const Menu = remote.Menu
const dialog = remote.dialog
/*提供了集成其他桌面客户端的关联功能*/
const shell = remote.shell
const app = remote.app
const browserWindow = remote.BrowserWindow
const focusedWindow = browserWindow.getFocusedWindow()
const path = require('path')



import fs from 'fs'

export default {
    components: {
        markNav,
        inputPage,
        outputPage
    },
    data() {
        return {
            inputWidth: "50%",
            outputWidth: "50%"
        }
    },
    computed: {
        showType() {
            return this.$store.state.showType
        },
        isSave() {
            return this.$store.state.isNeedSave
        },
        filePath() {
            return this.$store.state.filePath
        }
    },
    mounted() {
        let self = this;
        let win = browserWindow.getAllWindows()[0]
        console.log('win:', win)
        win.on('close', () => {
            if (self.isSave) {
                self.saveAsFile()
            }
        })
        this.initMenu();
        this.openLinkExternal();
    },
    watch: {
        showType() {
            switch (this.showType) {
                case 2:
                    this.outputWidth = "100%";
                    this.inputWidth = "0%"
                    break;
                case 3:
                    this.outputWidth = "50%";
                    this.inputWidth = "50%"
                    break;
                case 4:
                    this.outputWidth = "0%";
                    this.inputWidth = "100%"
                    break;
                default:
                    break;
            }
        }
    },
    methods: {
        changeType() {
        },
        openLinkExternal() {
            document.addEventListener('click', function (e) {
                if (e.target.tagName.toLowerCase() !== 'a') {
                    return
                }

                if (e.target.getAttribute('href') && e.target.getAttribute('href').substring(0, 4) === 'http') {
                    e.preventDefault()
                    e.stopPropagation()
                    var status = focusedWindow.isAlwaysOnTop()  // get status
                    focusedWindow.setAlwaysOnTop(true)  // on top
                    shell.openExternal(e.target.href)  // open link
                    if (!status) {
                        setTimeout(function () {
                            focusedWindow.setAlwaysOnTop(false)  // restore
                        }, 1000)
                    }
                }
            })
        },
        initMenu() {
            let self = this;
            let menu = Menu.buildFromTemplate(self.getMenuData())
            Menu.setApplicationMenu(menu)
        },
        getMenuData() {
            let self = this;
            var template = [
                {
                    label: '加载网页1',
                    submenu: [
                        {
                            label: '关闭',
                            accelerator: 'CmdOrCtrl+Q',
                            role: 'close'
                        }
                    ]
                },
                {
                    label: '文件',
                    submenu: [
                        {
                            label: '新建',
                            accelerator: 'CmdOrCtrl+N',
                            click: function () {
                                self.newScreen()
                            }
                        },
                        {
                            label: '打开文件',
                            click: function () {
                                self.openFile()
                            }
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: '保存',
                            accelerator: 'CmdOrCtrl+S',
                            click: function () {
                                self.saveFile()
                            }
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: '另存为',

                            click: function () {
                                self.saveAsFile()
                            }
                        }
                    ]
                },
                {
                    label: '编辑',
                    submenu: [
                        {
                            label: 'Undo',
                            accelerator: 'CmdOrCtrl+Z',
                            role: 'undo'
                        },
                        {
                            label: 'Redo',
                            accelerator: 'Shift+CmdOrCtrl+Z',
                            role: 'redo'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Cut',
                            accelerator: 'CmdOrCtrl+X',
                            role: 'cut'
                        },
                        {
                            label: 'Copy',
                            accelerator: 'CmdOrCtrl+C',
                            role: 'copy'
                        },
                        {
                            label: 'Paste',
                            accelerator: 'CmdOrCtrl+V',
                            role: 'paste'
                        },
                        {
                            label: 'Select All',
                            accelerator: 'CmdOrCtrl+A',
                            role: 'selectall'
                        }
                    ]
                },
                {
                    label: '我的信息',
                    submenu: [
                        {
                            label: '最小化当前窗口',
                            role: 'minimize'
                        },
                        {
                            label: '欢迎star ●▂●',
                        }
                    ]
                }
            ]
            return template;
        },
        openFile() {
            //弹框
            let self = this;
            if (self.isSave && !self.filePath) {
                self.saveAsFile();
            } else if (self.isSave) {
                self.saveFile()
            }

            dialog.showOpenDialog(focusedWindow, {
                title: 'Open Dialog',
                filters: [{
                    name: 'Documents', extensions: ['txt', 'md']
                }],
                properties: ['openFile']
            }, function (item) {
                if (item) {
                    self.readFile(item[0])
                }
            })

        },
        readFile(path) {
            let self = this;
            fs.readFile(path, 'utf8', function (err, content) {
                self.$store.dispatch('filePath', path)
                console.log("content:", content)
                self.$store.dispatch('sertTxt', content)
                // openDialog('error', err.toString())
            })
        },
        saveAsFile() {
            //获取保存地址
            var savePath = dialog.showSaveDialog(focusedWindow, {
                title: '是否保存',
                filters: [
                    { name: 'Markdown file', extensions: ['md'] },
                    { name: 'Text file', extensions: ['txt'] }
                ],
                properties: ['openFile']
            })
            this.writeFile(savePath)
        },
        saveFile() {
            let self = this;
            if (self.filePath) {
                self.writeFile(self.filePath)
            } else {
                self.saveAsFile();
            }
        },
        writeFile(path) {
            let self = this;
            console.log("path:", path)
            fs.writeFileSync(path, self.$store.state.articleList.content, 'utf8')
            self.$store.dispatch('isSave', false)
            self.$store.dispatch('filePath', path)
        },
        newScreen() {
            console.log(__dirname, '/newScreen')
            var webContents = browserWindow.getFocusedWindow().webContents;
            console.log(webContents.getURL())
            let win = new browserWindow({ width: 1000, height: 750 });
            win.on('close', function () { win = null })
            win.loadURL(webContents.getURL())
            win.show();
        },
        dialogAndSave() {
            let self = this;
            if (self.filePath) {
                self.writeFile(self.filePath)
            } else {
                self.saveAsFile();
            }

        }
    }
}
</script>
<style lang="scss">
#markdown {
    .markdownOut {
        margin: 0 auto;
        min-height: 800px;
        section {
            height: 100%;
            width: 100%;
            display: flex;
            padding-top: 50px;
            justify-content: space-between;
            position: fixed;
            top: 0;
            left: 0;
            textarea {
                box-sizing: border-box;
                height: 100%;
                width: 100%;
                vertical-align: top;
                padding: 15px;
                resize: none;
                border: none;
                background-color: #fff;
                border: 1px solid #eee;
                outline: none;
                font-family: inherit;
                font-size: 18px;
                color: #616161;
                transition: all ease .3s;
            }
            .page {
                transition: all 1.6s
            }
        }
    }
}
</style>

