<template>
  <div id="app">
<!--    <transition v-if="routes" style="z-index: 999" :name="transitionName">-->
<!--      <router-view class="transitionBody"></router-view>-->
<!--    </transition>-->
    <suspenPopup v-if="routes && isShow"></suspenPopup>
    <suspenpop v-if="!routes && isShow"></suspenpop>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
#app{
  overflow: hidden;
}
.transitionBody {
  transition: all 0.3s ease-out;
}

.transitionLeft-enter,
.transitionRight-leave-active {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.transitionLeft-leave-active,
.transitionRight-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.transitionLeft-enter-active,
.transitionRight-enter-active {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>

<script>
import TabBar from '@/components/Tabbar/index'
import suspenPopup from "@/components/suspenPopup/index.vue";
import suspenpop from '@/page/components/suspenPopup'
export default {
  components:{TabBar,suspenPopup,suspenpop},
  data(){
    return{
      transitionName: 'transitionLeft',
      routes:true,
      isShow:false
    }
  },

  mounted() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      this.routes = true
    } else {
      this.routes = false
    }
    if (/reg/.test(location.href)||/login/.test(location.href)){
      this.isShow=false
    }else{
      this.isShow=true
    }
  },

  watch: {
    '$route'(to,from){
      this.transitionName = to.meta.index < from.meta.index  ? 'transitionLeft' : 'transitionRight'
      if (/reg/.test(to.path)||/login/.test(to.path)){
        this.isShow=false
      }else{
        this.isShow=true
      }
    },
    deep: true,
    immediate: true,
  },
}
</script>