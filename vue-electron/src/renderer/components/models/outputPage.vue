<template>
    <div class="outerPage" :style="{width: width}">
        <div v-html="outTxt" class="outerTxt"></div>
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
        outTxt() {
            return this.$store.getters.toMd
        }
    },
}
</script>
<style lang="scss">
.outerPage {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    background: #f6f7f8;
    font-size: 14px;
    overflow: auto;
    .outerTxt{
        padding: 15px;
    }
    table,
    ul,
    p,
    ol,
    pre,
    blockquote,
    table {
        margin: 1.5em 0;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
        th,
        td {
            border: 1px solid #E6E6E6;
            padding: 5px 8px;
            word-break: normal;
        }
    }
    blockquote {
        border-left: 2px solid #f85959;
        padding: 10.5px 21px;
        background: #F6F6F6;
        color: #555;
        font-size: 1em;
        p {
            margin: 0;
        }
    }
    a {
        color: #f85959;
        &:hover {
            text-decoration: underline;
        }
    }
    ol,
    ul {
        margin-left: 3em;
        padding-left: 0;
    }
    ol {
        li {
            list-style-type: decimal;
        }
    }
    hr {
        margin: 1.5em auto;
        border-top: 2px dotted #eee;
    }
    code {
        background: #ddd;
        width: 100%;
        color: #000;
        padding: 3px 5px;
        } 
    pre {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: #eee;
        code {
        background: initial;
        width: 100%;
        color: #000;
        padding: 0
        }   
    }
}
</style>
