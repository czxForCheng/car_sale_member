import {getItem, setItem} from "@/utils/auth";
import store from "@/store";
import {getLanguageInfo, getWebsiteInfo, homeList} from "@/api/apiFox";

export default function getLanguage (){
    const list = ['zh', 'en', 'ru','fr','spa','ita','gen','nor']
    if (getItem('lang')){
        let s = getItem('lang')
        store.state.langText = getItem('lang').langText
        store.state.lang = getItem('lang').lang
        store.state.language = getItem('lang').language
    }else{
        getLanguageInfo().then(res=>{
            console.log(res)
            store.state.langText =list[parseInt(res[0].value)]
            store.state.lang =parseInt(res[0].value)
            store.state.language =res[0].name
            setItem('lang',{langText:list[parseInt(res[0].value)],lang:store.state.lang,language:store.state.language })
        }).catch(err=>{
            setItem('lang',{langText:'en',lang:1 ,name:'English'})
        })
    }
    baseInfo()
}

export function baseInfo(){
    getWebsiteInfo().then(res=>{
        setItem('website',res)
        const link = document.querySelector("link[rel*='icon']");
        link.rel = "icon";
        link.href = res.iconAddress
        document.title = res.websiteName
        document.getElementsByTagName("head")[0].appendChild(link);
    }).catch(err=>{})

}