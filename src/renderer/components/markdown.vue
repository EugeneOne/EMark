<template>
    <div id="markdown">
        <div class="markdownOut">
            <mark-nav @save="dialogAndSave" ref="markNav"></mark-nav>
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
const ipcRenderer = require('electron').ipcRenderer
const Menu = remote.Menu
const dialog = remote.dialog
/*提供了集成其他桌面客户端的关联功能*/
const shell = remote.shell
const app = remote.app
const browserWindow = remote.BrowserWindow
const focusedWindow = browserWindow.getFocusedWindow()
const path = require('path')

const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

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
        ipcRenderer.on('newFile', function (event, filePath, isNew) {
            // if (filePath && !isNew) {
            //     self.newScreen(filePath)
            // } else if (filePath && isNew) {
            //     self.readFile(filePath)
            // }
            /*有未保存文件新文件*/
            if (!self.filePath && self.isSave) {
                self.saveAsFile()
            } else if (self.isSave) {
                self.saveFile()
            }
            console.log("filePath:", filePath)
            self.readFile(filePath)
        })
        window.onbeforeunload = function (e) {
            console.log('I do not want to be closed');
            let flage
            if (self.isSave) {
                self.saveFile()
            }
        };
        focusedWindow.on('move', (event) => {

        })
        // ipcRenderer.on('close', () => {
        //     if (self.isSave) {
        //         self.saveFile()
        //     }
        //     ipcRenderer.send('closeAll');
        // })
        this.initMenu();
        this.openLinkExternal();

        if (focusedWindow.getRepresentedFilename()) {
            self.readFile(focusedWindow.getRepresentedFilename())
        }
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


            var dockMenu = Menu.buildFromTemplate([
                { label: 'New Window', click: function () { console.log('New Window'); } },
                {
                    label: 'New Window with Settings', submenu: [
                        { label: 'Basic' },
                        { label: 'Pro' }
                    ]
                },
                { label: 'New Command...' }
            ]);
            app.dock.setMenu(dockMenu);


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
                        // {
                        //     label: '新建',
                        //     accelerator: 'CmdOrCtrl+N',
                        //     click: function () {
                        //         self.newScreen()
                        //     }
                        // },
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
                    label: '插入',
                    submenu: [
                        {
                            label: '当前时间',
                            accelerator: 'CmdOrCtrl+D',
                            click: function () {
                                self.setTime()
                            }
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: '标题',
                            submenu: [
                                {
                                    label: '一级标题',
                                    accelerator: 'Cmd+1',
                                    click: function () {
                                        self.editor('*加粗内容*')
                                    }
                                },
                                {
                                    label: '二级标题',
                                    accelerator: 'Cmd+2',
                                    click: function () {
                                        self.editor('**加粗内容**')
                                    }
                                },
                                {
                                    label: '三级标题',
                                    accelerator: 'Cmd+3',
                                    click: function () {
                                        self.editor('***加粗内容***')
                                    }
                                },
                                {
                                    label: '四级标题',
                                    accelerator: 'Cmd+4',
                                    click: function () {
                                        self.editor('****加粗内容****')
                                    }
                                },
                                {
                                    label: '五级标题',
                                    accelerator: 'Cmd+5',
                                    click: function () {
                                        self.editor('*****加粗内容*****')
                                    }
                                },
                                {
                                    label: '六级标题',
                                    accelerator: 'Cmd+6',
                                    click: function () {
                                        self.editor('******加粗内容******')
                                    }
                                },
                            ]
                        },
                        {
                            label: '加粗',
                            accelerator: 'Cmd+B',
                            click: function () {
                                self.editor('**加粗内容**')
                            }
                        },
                        {
                            label: '斜体',
                            accelerator: 'Cmd+I',
                            click: function () {
                                self.editor('*斜体内容*')
                            }
                        },
                        {
                            label: '链接',
                            accelerator: 'Cmd+L',
                            click: function () {
                                self.editor('[链接描述](http://example.com/)')
                            }
                        },
                        {
                            label: '引用',
                            accelerator: 'Cmd+Ctrl+Q',
                            click: function () {
                                self.editor('\n> 引用文字')
                            }
                        },
                        {
                            label: '代码',
                            accelerator: 'Cmd+K',
                            click: function () {
                                self.editor('```\r\n请输入代码\n```')
                            }
                        },
                        {
                            label: '图片',
                            accelerator: 'Cmd+Ctrl+P',
                            click: function () {
                                self.editor('![Img](图片地址)')
                            }
                        },
                        {
                            label: '有序列表',
                            accelerator: 'Cmd+Ctrl+O',
                            click: function () {
                                self.editor('\n 1. 列表项目')
                            }
                        },
                        {
                            label: '无序列表',
                            accelerator: 'Cmd+Ctrl+L',
                            click: function () {
                                self.editor('\n - 列表项目')
                            }
                        },
                    ]
                },
                {
                    label: '窗口',
                    submenu: [
                        {
                            label: '编辑',
                            accelerator: 'Cmd+Ctrl+Right',
                            click: function () {
                                self.screen(4)
                            }
                        },
                        {
                            label: '预览',
                            accelerator: 'Cmd+Ctrl+Left',
                            click: function () {
                                self.screen(2)
                            }
                        },
                        {
                            label: '实况',
                            accelerator: 'Cmd+Ctrl+Down',
                            click: function () {
                                self.screen(3)
                            }
                        },
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
            self.saveFile()

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
            console.log("readFile:", path)
            // focusedWindow.setRepresentedFilename(path)

            fs.readFile(path, 'utf8', function (err, content) {
                self.$store.dispatch('filePath', path)
                console.log("content:", content)
                self.$store.dispatch('sertTxt', content)
            })
        },
        saveAsFile() {
            //获取保存地址
            var savePath = dialog.showSaveDialog(focusedWindow, {
                title: '是否保存',
                filters: [
                    { name: 'Markdown file', extensions: ['md'] }
                ],
                // properties: ['openFile']
            })
            /*确认保存*/
            if (savePath) {
                this.writeFile(savePath)
            }
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
        dialogAndSave() {
            let self = this;
            if (self.filePath) {
                self.writeFile(self.filePath)
            } else {
                self.saveAsFile();
            }

        },
        setTime() {

        },
        editor(value) {
            this.$refs.markNav.editor(value)
        },
        // 窗口显示
        screen(value) {
            this.$refs.markNav.editorModel(value)
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

