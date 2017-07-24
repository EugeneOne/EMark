<template>
    <div id="markdown">
        <div class="markdownOut">
            <mark-nav></mark-nav>
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
            readPath: "",
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
        this.initMenu();
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
            if (self.isSave) {
                self.saveAsFile();
            } else {
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
            }

        },
        readFile(path) {
            let self = this;
            fs.readFile(path, 'utf8', function (err, content) {
                self.readPath = path
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
            if (self.readPath) {
                self.writeFile(self.readPath)
            } else {
                self.saveAsFile();
            }
        },
        writeFile(path) {
            let self = this;
            console.log("path:", path)
            fs.writeFileSync(path, self.$store.state.articleList.content, 'utf8')
            self.$store.dispatch('isSave', false)
        },
        newScreen() {
            console.log(__dirname, '/newScreen')
            let win = new browserWindow({ width: 800, height: 800 });
            win.on('close', function () { win = null })
            win.loadURL("http://localhost:9080/")
            win.show();
        },
        dialogAndSave() {
            let self = this;
            self.saveAsFile()
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

