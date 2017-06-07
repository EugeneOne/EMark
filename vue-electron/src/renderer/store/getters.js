const marked = require('marked')

export default {
    toMd: state => {
        return marked(state.articleList.content)
    }
}