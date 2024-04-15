<template>
  <div class="main-information">
    <Header></Header>
    <div class="safe"/>
    <div class="hole-center">
      <div class="center">
        <div class="information-title">
          {{ renderCompute }}
        </div>
        <van-divider />
        <div class="html-content">
          <span v-html="renderedContent"></span>
        </div>

        <div class="safe"/>
        <div class="footer">
      </div>
    </div>
    </div>
    <div class="bottom">
      <Footer></Footer>
    </div>

  </div>
</template>

<script>
import Header from "../components/Headers/index.vue";
import Footer from '../components/Footer/index.vue'
import {homeList} from "@/api/apiFox";
import {getItem} from "@/utils/auth";
export default {
  components:{Header,Footer},
  data(){
    return{
      data(){
        return{
          content:null,
          status:1
        }
      }
    }
  },
  computed: {
    renderedContent() {
      let modifiedContent = this.content.replace(/<img(.*?)src="(.*?)"(.*?)>/g, (match, p1, p2, p3) => {
        return `<img${p1}src="${p2}" style="width: 100% !important; height: 100%!important;">`;
      });
      return modifiedContent;
    },
    renderCompute() {
      switch (this.status) {
        case 1: {
          return this.$t('h.F002')
        }
        case 2: {
          return this.$t('h.F003')
        }
        case 3: {
          return this.$t('h.F004')
        }
        case 4: {
          return this.$t('h.F001')
        }
        case 5: {
          return this.$t('h.F007')

        }
      }
    }
  },
  methods:{
    getInformation(item){
      let array=getItem('base')
      this.status=item
      switch (item){
        case 1:{
          let list = array.filter(value=>{return /cert/.test(value.title)})
          list.length>0 ?  this.content= list[0].content : this.content=''
          break
        }
        case 2:{
          let list = array.filter(value=>{return /T&C/.test(value.title)})
          list.length>0 ?  this.content= list[0].content : this.content=''
          break
        }
        case 3:{
          let list = array.filter(value=>{return /FAQ/.test(value.title)})
          list.length>0 ?  this.content= list[0].content : this.content=''
          break
        }
        case 4:{
          let list = array.filter(value=>{return /Email/.test(value.title)})
          list.length>0 ?  this.content= list[0].content : this.content=''
          break
        }
        case 5:{
          let list = array.filter(value=>{return /Member/.test(value.title)})
          list.length>0 ?  this.content= list[0].content : this.content=''

          break
        }

      }

    }
  },
  created() {
    this.getInformation(parseInt(this.$route.query.status))
  },

  mounted() {
    this.$bus.$on('faqsChangePc',data=>{
      this.getInformation(parseInt(data))
      location.reload()
    })
  }
}
</script>

<style scoped lang="scss">
.main-information{
  width: 100%;
  min-height: 100vh;
  background: #fff;
  .safe{
    width: 100%;
    height: 60px;
  }
  .hole-center{
    width: 100%;
    justify-content: center;
    display: flex;
    .center{
      width: 1200px;
      min-height: 100vh;
      .information-title{
        width: 100%;
        height: 100px;
        line-height: 100px;
        font-size: 28px;
        padding: 5%;
        box-sizing: border-box;
      }
      .html-content{
        width: 100%;
        font-size: 18px;
        padding: 3%;
        box-sizing: border-box;
        img{
          width: 100%;
        }
      }
      .footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
      }
    }
  }
  .bottom{
    position: relative;
    bottom: 0;
    width: 100%;
  }

}

</style>