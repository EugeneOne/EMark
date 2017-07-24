const marked = require('marked')
const highlight = require('highlight.js')

marked.setOptions({
    highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value;
    }
})

export default {
    toMd: state => {
        return marked(state.articleList.content)
    }
}