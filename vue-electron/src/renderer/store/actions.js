import Vue from 'vue'

export default {
    sertTxt: ({ commit }, value) => {
        commit('SERT_TXT', value)
    }
}