import Vue from 'vue'
import Vuex from 'vuex'
import {getItem, removeItem, setItem} from "@/utils/auth";
import {leaveLogin, loginApi, regApi, userManageDetail} from "@/api/apiFox";

import {closeSocketWs} from "@/utils/scoket";
import router from "@/router";
import {encrypt} from "@/utils/AES";

Vue.use(Vuex)
const userKey = 'user'
const tokenKey = 'admin'

export default new Vuex.Store({
    state: {
        token: getItem(tokenKey),
        User: getItem('BaseUser') || '' ,
        lang: getItem('lang') ? getItem('lang').lang : 1,//语言
        langText: getItem('lang') ? getItem('lang').langText : 'en',//语言文字
        language: getItem('lang') ? getItem('lang').language : 'English',//语言
    },
    getters: {},
    mutations: {
        // 更新token
        saveToken(state, data) {
            sessionStorage.setItem('tips',111)
            state.token = data.token
            setItem(userKey, encrypt(JSON.stringify(state)))
            setItem(tokenKey, data.token)
        },

        remove(state, data) {
            state.token = ''
            state.User = ''
            removeItem(userKey)
            removeItem('BaseUser')
            removeItem(tokenKey)
            router.push('/login').catch(err=>{})
        },

        // 更新用户信息
        updateUser(state, data) {
            state.User = encrypt(JSON.stringify(data))
            setItem('BaseUser', encrypt(JSON.stringify(data)))
        },
        // 更新语言信息
        updateLange(state, data) {
            state.lang = data.value
            state.langText = data.lang
            state.language = data.name
            setItem('lang', {lang: data.value, langText: data.lang, language: data.name})
        }
    },
    actions: {
        loginSetToken({commit}, params) {
            return new Promise((resolve, reject) => {
                loginApi(encrypt(params.username.toString()), encrypt(params.password.toString())).then(res => {
                    commit('saveToken', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getUserList({commit}, params) {
            return new Promise((resolve, reject) => {
                userManageDetail({id: params}).then(res => {
                    commit('updateUser', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
            })
        },

        languageSet({commit}, data) {
            commit('updateLange', data)
        },

        registertSet({commit},params){
            return new Promise((resolve,reject)=>{
                regApi(params).then(res=>{
                    commit('saveToken', res.data)
                    resolve(res.data)
                }).catch(err=>{
                    reject(err)
                })
            })
        },

        removeLoginStatus({commit}, data) {
            // leaveLogin().then(res=>{}).catch(err=>{})
            // closeSocketWs()
            commit('remove', '')

        }

    },
    modules: {}
})
