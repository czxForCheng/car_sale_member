// LoadingIndicatorPlugin.js
import LoadingIndicator from '@/components/MessagePrompt/index.vue';

const LoadingIndicatorPlugin = {
    install(Vue) {
        const LoadingIndicatorComponent = Vue.extend(LoadingIndicator);
        const loadingInstance = new LoadingIndicatorComponent();

        document.body.appendChild(loadingInstance.$mount().$el);

        Vue.prototype.$loading = {
            show() {
                loadingInstance.show();
            },
            loading(message,time,close){
                loadingInstance.show();
                if (close){

                }else{
                    setTimeout(()=>{
                        loadingInstance.hide();
                    },time ? time : 1000)
                }

            },
            hide() {
                loadingInstance.hide();
            },
        };
    },
};

export default LoadingIndicatorPlugin;
