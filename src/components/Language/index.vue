<template>
  <div>
    <van-popover
        v-model="showPopover"
        theme="dark"
        placement="bottom"
        trigger="click"
    >
      <div class="loading-iframe">
        <div @click="changeLang(item)" v-for="(item,index) in lang" :key="index" class="item">
          <img :src="item.image" alt="">
          <span>{{ item.name }}</span>
        </div>

      </div>
      <template #reference>
        <div class="language_list">{{ language }} <van-icon name="arrow-down" /></div>
      </template>
    </van-popover>
  </div>
</template>
<!--lang: ['en', 'zh', 'ru','fr','spa','ita','gen','nor'],-->
<script>
import { getLanguageInfo} from "@/api/apiFox";

export default {
  data(){
    return{
      showPopover:false,
      language:'',
      lang:[
        {id:1,name:'English',image:require('@/assets/images/us.jpeg'),value:1,lang:'en'},
        {id:2,name:'简体中文',image:require('@/assets/images/zh.png'),value:0,lang:'zh'},
        {id:3,name:'Русский язык',image:require('@/assets/images/ru.jpeg'),value:2,lang:'ru'},
        {id:4,name:'Français',image:require('@/assets/images/fa.png'),value:3,lang:'fa'},
        {id:5,name:'España',image:require('@/assets/images/spa.webp'),value:4,lang:'spa'},
        {id:6,name:'Italia',image:require('@/assets/images/ita.webp'),value:5,lang:'ita'},
        {id:7,name:'Deutsch',image:require('@/assets/images/de.jpeg'),value:6,lang:'de'},
        {id:8,name:'Norge',image:require('@/assets/images/nor.jpeg'),value:7,lang:'nor'},
      ],
    }
  },
  methods:{
    changeLang(item){
      this.$loading.loading('',600,false)
      this.$store.dispatch('languageSet',item)
      setTimeout(()=>{location.reload()},600)
      this.language=item.name
    }
  },
  mounted() {
    this.language = this.$store.state.language
    getLanguageInfo().then(res=>{
      let s = []
      this.lang.forEach(value=>{
        res.forEach(item=>{
          value.value === parseInt(item.value) ? s.push(value) : null
        })
      })
      this.lang=s
    }).catch(err=>{})
  }
}
</script>

<style scoped lang="scss">
.loading-iframe{
  color: #fff;
  min-height: 35px;
  width: 110px;

  padding: 5px ;
  .item{
    width: 110px;
    height: 35px;
    display: flex;


    align-items: center;
    padding: 2%;
    box-sizing: border-box;
    border-bottom: 1px solid #5a5a5a;
    img{
      height: 20px;
      border-radius: 50%;
      width: 20px;
    }
    span{
      margin-left: 15px;
      font-size: 14px;
    }
  }
  div:nth-last-child(1){
    border: none;
  }
}
.language_list{
  font-size: 14px;
  color: #fff;
  margin-right: -40px;
}
</style>