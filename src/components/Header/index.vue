<template>
  <div>
    <div class="template-header">
      <div class="icon-menu">
        <van-icon v-if="isShow" @click="openCurrent" name="wap-nav" />
        <img :src="logo ? logo.websiteBigLogo : null" alt="">
      </div>
      <div class="icon-language">
        <Language></Language>
      </div>
    </div>
    <sider-bar :is-show="isSider" @closeShow="closeShow"></sider-bar>
  </div>
</template>

<script>

import Language from "@/components/Language/index.vue";
import SiderBar from "@/components/siderBar/index.vue";
import {getItem} from "@/utils/auth";
export default {
  components:{Language,SiderBar},
  data(){
    return{
      isSider:false,//是否打开左侧带单
      isShow:true,
      logo:''
    }
  },
  methods:{
    openCurrent(){
      this.isSider=true
    },


    closeShow(){
      this.isSider=false
    },
  },
  mounted() {
    /login|reg/.test(this.$route.path) ? this.isShow=false :this.isShow=true
    this.logo=getItem('website')
  },
  watch: {
    '$route'(to,from){
      if (to.path==='/login' || to.path==='/reg'){
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

<style scoped lang="scss">
.template-header{
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #000;
  display: flex;
  justify-content:space-between;
  padding: 0 3%;
  box-sizing: border-box;
  .icon-menu{
    width: 70%;
    height: 60px;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 26px;
    img{
      height: 33px;
      margin-left: 10px;
    }
  }
  .icon-language{
    width: 30%;
    height: 50px;
    justify-content: center;
    display: flex;
    align-items: center;
  }
}
</style>