<template>
    <div class="markNav">
        <ul class="editorManu">
            <li class="f-l editorBtn" @click="editor('**加粗内容**')" title="加粗">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiacu"></use>
                </svg>
            </li>
            <li class="f-l editorBtn" @click="editor('*斜体内容*')" title="斜体">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zitixieti"></use>
                </svg>
            </li>
            </li>
            <li class="f-l editorBtn" @click="editor('[链接描述](http://example.com/)')" title="链接">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-lianjie1"></use>
                </svg>
            </li>
            </li>
            <li class="f-l editorBtn" @click="editor('\n> 引用文字')" title="引用">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yinyong"></use>
                </svg>
            </li>
            </li>
            <li class="f-l editorBtn" @click="editor('```\r\n请输入代码\n```')" title="代码">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-ai-code"></use>
                </svg>
            </li>
            </li>
            <li class="f-l editorBtn" @click="editor('![Img](图片地址)')" title="图片">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tupian"></use>
                </svg>
            </li>
            </li>
            <li class="f-l editorBtn" @click="editor('\n 1. 列表项目')" title="有序列表">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youxupailie"></use>
                </svg>
            </li>
            </li>
            <li class="f-l editorBtn" @click="editor('\n - 列表项目')" title="无序列表">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-paixu"></use>
                </svg>
            </li>
            </li>
            <li class="f-l editorBtn" @click="editor('## 标题文字 ##')" title="标题">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-biaoti"></use>
                </svg>
            </li>
            </li>
            <li class="f-l editorBtn" @click="editor('----------\n')" title="分割线">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-hr"></use>
                </svg>
            </li>
            </li>
            <li class="f-l editorBtn" @click="editor('| 标题1 | 标题2 | 标题3 |\n| --- | --- | --- |\n| 内容1 | 内容2 | 内容3 |\n')" title="表格">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-biaoge"></use>
                </svg>
            </li>
            </li>
    

            <li class="f-r editorBtn w66" :class="{hide: !isSave}" title="保存" @click="save">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-baocun"></use>
                </svg>
            </li>
            <li class="f-r editorBtn w66" @click="editorModel(4)" title="编辑模式">编辑</li>
            <li class="f-r editorBtn w66" @click="editorModel(3)" title="实况模式">实况</li>
            <li class="f-r editorBtn w66" @click="editorModel(2)" title="预览模式">预览</li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        width: {
            type: String,
            default: "50%"
        }
    },
    computed: {
        showType() {
            return this.$store.state.showType
        },
        isSave() {
            return this.$store.state.isNeedSave
        }
    },
    methods: {
        editor(value) {
            console.log("value:",value)
            let that = this;
            let inputArea = document.getElementById("inputArea");
            inputArea.focus();
            //光标开始处
            let startPoint = inputArea.selectionStart;
            //光标结束处
            let endPoint = inputArea.selectionEnd;
            //光标选中处内容
            let oldValue = inputArea.value;

            let newValue = "";

            if (startPoint == endPoint) {
                switch (value) {
                    case '*加粗内容*':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 1, 1);
                        break;
                    case '**加粗内容**':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 2, 2);
                        break;
                    case '***加粗内容***':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 3, 3);
                        break;
                    case '****加粗内容****':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 4, 4);
                        break;
                    case '*****加粗内容*****':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 5, 5);
                        break;
                    case '******加粗内容******':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 6, 6);
                        break;
                    case '*斜体内容*':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 1, 1);
                        break;
                    case '\n> 引用文字':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 3, 0);
                        break;
                    case '```\r\n请输入代码\n```':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 4, 5);
                        break;
                    case '[链接描述](http://example.com/)':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 7, 1);
                        break;
                    case '![Img](图片地址)':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 7, 1);
                        break;
                    case '\n 1. 列表项目':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 5, 0);
                        break;
                    case '\n - 列表项目':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 4, 0);
                        break;
                    case '## 标题文字 ##':
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value, 3, 3);
                        break;
                    default:
                        newValue = that.insertEnd(inputArea, endPoint, oldValue, value);
                        break;
                }
            } else {
                let aCharts = "";
                let bCharts = "";
                switch (value) {
                    case '**加粗内容**':
                        aCharts = "**";
                        bCharts = "**";
                        break;
                    case '*斜体内容*':
                        aCharts = "*";
                        bCharts = "*";
                        break;

                    case '```\r\n请输入代码\n```':
                        aCharts = "`";
                        bCharts = "`";
                        break;
                    default:
                        return false
                        break;
                }
                newValue = that.insertTo(inputArea, startPoint, endPoint, oldValue, aCharts, bCharts)
            }
            this.$store.dispatch('sertTxt', newValue)
        },
        insertEnd(elem, end, oldValue, insertValue, range1, range2) {
            let newValue = oldValue.substring(0, end) + insertValue + oldValue.substring(end, oldValue.length);
            inputArea.value = newValue;
            if (range1 || range2) {
                inputArea.setSelectionRange(end + range1, end + insertValue.length - range2);
            }
            return newValue;
        },
        insertTo(elem, start, end, oldValue, chart1, chart2) {
            let newValue = oldValue.substring(0, start) + chart1 + oldValue.substring(start, end) + chart2 + oldValue.substring(end, oldValue.length);
            inputArea.value = newValue;
            inputArea.setSelectionRange(start + chart1.length, end + chart2.length);
            return newValue
        },
        editorModel(value) {
            this.$store.dispatch('showType', value)
        },
        /*保存*/ 
        save() {
            this.$emit("save")
        }

    }
}
</script>
<style lang="scss">
.markNav {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    .editorManu {
        width: 100%;
        padding: 0 5px;
        background-color: #dc8d8d;
        list-style: none;
        &:after {
            content: ".";
            height: 0;
            clear: both;
            display: block;
            visibility: hidden
        }
        li {
            height: 50px;
        }
        .editorBtn {
            padding: 0 5px;
            cursor: pointer;
            width: 40px;
            text-align: center;
            line-height: 50px;
            font-size: 18px;
            color: #fff;
            &:hover {
                background: #fff;
                color: #333;
            }
        }
        .w66{
            width: 66px;
        }
        .hide{
            opacity: .3;
            &:hover {
                background: initial;
                color: #fff;
                cursor: initial;
            }
        }
    }
}
</style>
