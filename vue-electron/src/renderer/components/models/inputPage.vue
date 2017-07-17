<template>
    <div class="inputPage" :style="{width: width}">
        <textarea @scroll="scroll" id="inputArea" :value="txt" autofocus @input="sertTxt" @drop.stop.prevent='dragging'></textarea>
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
        txt() {

            return this.$store.state.articleList.content
        }
    },
    mounted() {
        let textarea = document.getElementById("inputArea");

        if(localStorage.article) {
            this.$store.dispatch('sertTxt', localStorage.article)
        }
        // textarea.addEventListener("dragenter", dragHandle)
        // function dragHandle(event) {
        //     let that = this;
        //     let dt = event.dataTransfer;
		// 	let files = dt.files;
        
        //      let reader = new FileReader();
        //      console.log(files,reader)
        //      reader.readAsText(files[0], 'UTF-8');
        //      reader.onload = function(e) {
                 
        //      }
        // }
    },
    methods: {
        scroll(e) {
            let outPage = document.querySelector(".outerPage");
            let inputTxt = document.querySelector("#inputArea");
            console.log(e.target.scrollTop / outPage.scrollHeight * inputTxt.scrollHeight)
            outPage.scrollTop = e.target.scrollTop / inputTxt.scrollHeight * outPage.scrollHeight;
        },
        sertTxt(e) {
            //.replace(/\n/g, "<br/>")
            let value = e.target.value
            this.$store.dispatch('sertTxt', value)
        },
        dragging(event) {
            let that = this;
            let dt = event.dataTransfer;
			let files = dt.files;
        
             let reader = new FileReader();
             console.log(files,reader)
             reader.readAsText(files[0], 'UTF-8');
             reader.onload = function(e) {
                 let value = e.target.result;
                 document.getElementById("inputArea").value = e.target.result;
                 that.$store.dispatch('sertTxt', e.target.result)
                 console.log("value:",value)
             }
        }
    }
}
</script>
<style lang="scss">
.inputPage {
    box-shadow: 0 10px 10px #eee;
}
</style>
