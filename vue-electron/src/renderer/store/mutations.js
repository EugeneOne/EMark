export default {
    SERT_TXT: (state, value) => {
        localStorage.article = value;
        state.articleList.content = value
    },
    SHOW_TYPE: (state, value) => {
        state.showType = value
    },
}