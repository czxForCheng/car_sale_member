<template>
  <div>
    <van-overlay :show="isShow">
      <div class="wrapper" @click.stop>
        <div class="block" >

          <div class="banner">
            <div class="close"><van-icon  @click="closePopup" name="close" /></div>
            <div class="contents">
              <span v-html="renderedContent"></span>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import Vue from 'vue';
import { Overlay,Icon } from 'vant';


Vue.use(Overlay);
Vue.use(Icon);
export default{
  props:['isShow','content'],
  data(){
    return{
      show:true
    }
  },

  computed: {
    renderedContent() {
      let modifiedContent = this.content.replace(/<img(.*?)src="(.*?)"(.*?)>/g, (match, p1, p2, p3) => {
        return `<img${p1}src="${p2}" style="width: 100% !important; height: 80%!important;">`;
      });
      return modifiedContent;
    }
  },

  methods:{
    closePopup(){
      sessionStorage.removeItem('tips')
      this.$emit('closePopup',true)
    },

    // getWebsite(){
    //   announcementList().then(res=>{
    //     this.content=res.data.content
    //   }).catch(err=>{})
    // }
  },

  mounted() {
    // this.getWebsite()
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  .block {
    position: relative;
    z-index: 9999;
    box-sizing: border-box;
    max-height: 700px;
    overflow-y: scroll;

    .banner{
      width: 360px;
      min-height: 400px;
      margin-top: 80px;
      padding: 6%;
      box-sizing: border-box;
      .close{
        font-size: 30px;
        position: absolute;
        top: 110px;
        right: 30px;
        z-index: 99999;
        color: red;
        //color: #333;
      }
      .contents{
        width: 100%;
        overflow-y: scroll;
        min-height: 400px;
        //background: #fff;
      }
      img{
        width: 100%;
        height: 400px;
      }
    }
  }
}


</style>