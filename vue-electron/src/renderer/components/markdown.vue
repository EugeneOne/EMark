<template>
    <div id="markdown">
        <div class="markdownOut">
            <mark-nav></mark-nav>
            <section>
                    <input-page :width=inputWidth class="input page"></input-page>
                    <output-page :width=outputWidth class="out page"></output-page>
            </section>
    
        </div>
    </div>
</template>
<script>
require('animate.css')
import markNav from "./models/markNav.vue"
import inputPage from "./models/inputPage.vue"
import outputPage from "./models/outputPage.vue"
export default {
    components: {
        markNav,
        inputPage,
        outputPage
    },
    data() {
        return {
            inputWidth: "50%",
            outputWidth: "50%",
        }
    },
    computed: {
        showType() {
            return this.$store.state.showType
        }
    },
    watch: {
        showType() {
            console.log(this.showType)
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
            console.log(123)
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
            .page{
                transition: all 1.6s
            }
        }
    }
}
</style>

