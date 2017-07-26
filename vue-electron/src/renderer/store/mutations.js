export default {
    SERT_TXT: (state, value) => {
        // localStorage.article = value;
        state.articleList.content = value
    },
    SHOW_TYPE: (state, value) => {
        state.showType = value
    },
    IS_SAVE: (state, value) => {
        state.isNeedSave = value
    },
    FILE_PATH: (state, value) => {
        state.filePath = value
    }
}