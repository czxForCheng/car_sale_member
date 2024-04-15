import axios from "axios";
import {decrypt, encrypt} from "@/utils/AES";
import {Toast} from "vant";
import {getItem} from "@/utils/auth";
import store from "@/store";

const api = axios.create({
    baseURL:process.env.VUE_APP_API_ROOT,
    withCredentials:false,
    maxRedirects:5,
    timeout:8000,
    headers: {
        "Content-Type": "application/json",
        "Accept":"*/*",
    }
})

// 请求拦截器
api.interceptors.request.use(
    config => {
        if (store.state.token){
            config.headers['like-admin'] = store.state.token
        }else{
            config.headers['like-admin'] = getItem('admin')
        }

        store.state.lang ? config.headers['lang-admin'] = store.state.lang : getItem('lang') ? config.headers['lang-admin'] = getItem('lang').lang : 1

        if (config.method === 'post' && config.data && !/upload/.test(config.url)){
            config.data = encrypt(JSON.stringify(config.data))
        }
        if (config.method === 'get' && config.data){
            config.params = encrypt(JSON.stringify(config.params))
        }
        return config

    },
    error => {

        return Promise.reject(error)
    })


// 相应拦截器
api.interceptors.response.use(response=>{
    const code = response.data.code
    switch (code){
        case 200:{
            if (/upload/.test(response.config.url)){
                return response.data
            }else{
                response.data.data ? response.data.data=JSON.parse(decrypt(response.data.data)) : response.data=response.data.data
                return response.data
            }
        }
        case 331:{
            Toast.fail(response.data.msg)
            store.dispatch('removeLoginStatus')
            setTimeout(()=>{location.reload()},600)
            break
        }
        case 333:{
            Toast.fail(response.data.msg)
            store.dispatch('removeLoginStatus')
            setTimeout(()=>{location.reload()},600)
            break
        }
        case 404:{
            Toast.fail(response.data.msg)
            return Promise.reject(response.data)
        }
        case 555:{
            const url = new URL(location.href);
            const siteURL = `${url.protocol}//${url.host}/50x.html`;
            if (process.env.VUE_APP_API_ROOT ){}else{location.href=siteURL}
            break
        }
        case 500:{
            if (window.navigator && navigator.onLine === true) {
                Toast({
                    duration: 3000, // 持续展示 toast
                    message: response.data.msg ? response.data.msg : this.$t('h.A008'),
                });
            } else {
                this.$t('h.A007')
            }
            return Promise.reject(response.data)
        }
        default:{
            if (window.navigator && navigator.onLine === true) {
                Toast.fail(response.data.msg)
            } else {
                // Toast(setting.public.onLine[lang])
            }
            return Promise.reject(response.data)
        }
    }
},
    error => {
        return Promise.reject(error)
    })

export default api