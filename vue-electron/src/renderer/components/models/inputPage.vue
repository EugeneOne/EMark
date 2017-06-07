<template>
    <div class="inputPage" :style="{width: width}">
        <textarea id="inputArea" :value="txt" autofocus @input="sertTxt" @drop.stop.prevent='dragging'></textarea>
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
            console.log(123)
        }
    },
    mounted() {
        let textarea = document.getElementById("inputArea");
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
        sertTxt(e) {
            console.log("e", e.target.value == "\n")
            let value = e.target.value.replace(/\n/g, "<br/>")
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
    height: 800px;
}
</style>
