<template>
    <div id="markdown">
        <router-link to="/">/</router-link>
        <div class="markdownOut">
            <mark-nav></mark-nav>
            <input-page class="f-l" :width="width"></input-page>
            <output-page class="f-r" :width="width"></output-page>
        </div>
    </div>
</template>
<script>
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
            width: "50%"
        }
    }
}
</script>
<style lang="scss">
#markdown {
    .markdownOut {
        margin: 0 auto;
        min-height: 800px;
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
    }
}
</style>

