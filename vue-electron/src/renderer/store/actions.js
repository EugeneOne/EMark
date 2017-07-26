import Vue from 'vue'

export default {
    sertTxt: ({ commit }, value) => {
        commit('SERT_TXT', value)
    },
    showType: ({ commit }, value) => {
        commit('SHOW_TYPE', value)
    },
    isSave: ({ commit }, value) => {
        commit('IS_SAVE', value)
    },
    filePath: ({ commit }, value) => {
        commit('FILE_PATH', value)
    },
}