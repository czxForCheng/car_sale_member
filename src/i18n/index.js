import Vue from "vue";
import VueI18n from "vue-i18n";
import store from "@/store";

Vue.use(VueI18n); // 全局挂载

export const i18n = new VueI18n({
    locale: store.state.langText || "en", // 从localStorage中获取 默认英文
    messages: {
        zh: require("./lan/zh"), // 中文语言包
        en: require("./lan/en"), // 英文语言包
        ru: require("./lan/ru"), // 英文语言包
        fa: require("./lan/fa"), // 英文语言包
        spa: require("./lan/sap"), // 英文语言包
        ita: require("./lan/ita"), // 英文语言包
        de: require("./lan/de"), // 英文语言包
        nor: require("./lan/nor"), // 英文语言包
    }
});

export default i18n;