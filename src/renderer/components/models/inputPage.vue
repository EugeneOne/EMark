<template>
    <div class="inputPage" :style="{width: width}" ref="inputPage">
        <textarea @scroll="scroll" id="inputArea" :value="txt" autofocus @input="sertTxt" @drop.stop.prevent='dragging'></textarea>
    </div>
</template>
<script>
//import * as topMenu from '../../../main/menu.js'
export default {
    props: {
        width: {
            type: String,
            default: "50%"
        }
    },
    data() {
        return {

        }
    },
    computed: {
        txt() {
            //console.log("input:", this.$store.state.articleList)
            return this.$store.state.articleList.content
        },
        filePath() {
            return this.$store.state.filePath
        },
        isNeedSave() {
            return this.$store.state.isNeedSave
        }
    },
    mounted() {
        console.log("eletron:", this.eletron)
        console.log("this.$store:", this.$store)
        let textarea = document.getElementById("inputArea");
    },
    methods: {
        scroll(e) {
            let outPage = document.querySelector(".outerPage");
            let inputTxt = document.querySelector("#inputArea");
            outPage.scrollTop = e.target.scrollTop / inputTxt.scrollHeight * outPage.scrollHeight;
        },
        sertTxt(e) {
            let self = this;
            let value = e.target.value;
            console.log("value:", value)
            self.$store.dispatch('sertTxt', value)
            self.$store.dispatch('isSave', true);
            //self.$emit("inputTxt")
        },
        dragging(event) {
            let self = this;
            let dt = event.dataTransfer;
            let files = dt.files;
            var path = files[0].path;
            //console.log("path:", files)
            //如果拖拽的文件不是本文件
            if (self.filePath != path) {
                if (self.isNeedSave) {
                    this.$emit("dialogAndSave")
                }
                let reader = new FileReader();
                //  console.log(files,reader)
                reader.readAsText(files[0], 'UTF-8');
                reader.onload = function (e) {
                    let value = e.target.result;
                    document.getElementById("inputArea").value = e.target.result;
                    self.$store.dispatch('sertTxt', e.target.result)
                }
                //console.log("path:", path)
                self.$store.dispatch('filePath', path)
            }
        }
    }
}
</script>
<style lang="scss">
.inputPage {
    box-shadow: 0 10px 10px #eee;
    overflow: hidden;
    #inputPage {
        cursor: text;
    }
}
</style>
