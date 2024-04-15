import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import 'amfe-flexible';
import '@/assets/base/base.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import LoadingIndicatorPlugin from '@/utils/LoadingIndicatorPlugin';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { i18n } from './i18n/index' //国际化
import getLanguage from "@/utils/language";
import VueClipboards from 'vue-clipboard2'
import VueMeta from "vue-meta";
Vue.use(VueMeta)
Vue.use(VueClipboards);
Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false
Vue.use(LoadingIndicatorPlugin);
Vue.use(getLanguage)


new Vue({
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  store,
  i18n, //使用国际化
  render: h => h(App)
}).$mount('#app')
