<template>
  <div class="btn-right-login btn-right-lang">
    <a href="javascript:void (0)">
      <img :src="icon" alt="">
        {{ language }}
      <i class="el-icon-caret-bottom"></i>
    </a>
    <div class="item-nav">
      <a @click="changeLang(item)" class="nav" v-for="(item,index) in lang" :key="index" href="javascript:void (0)">
        <img :src="item.image" alt=""><span>{{item.name}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  import {getLanguageInfo} from "@/api/apiFox";

  export default {
    data(){
      return{
        showPopover:false,
        language:'',
        icon:'',
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
        // this.$loading.loading('',600,false)
        this.$store.dispatch('languageSet',item)
        setTimeout(()=>{location.reload()},600)
        this.language=item.name
        this.icon = item.image
      }
    },
    mounted() {
      this.language = this.$store.state.language
      let name =this.lang.filter(value => {return value.name === this.language})
      name ? this.icon=name[0].image : ''
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
.btn-right-login{
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  a{
    margin-right: 5px;
    color: #fff;
    font-size: 16px;
    display: flex;
    height: 60px;
    align-items: center;
    font-weight: 300;
    img{
      margin-right: 10px;
      height: 20px;
      width: 20px;
      border-radius: 50%;
    }
  }
  .item-nav{
    width: 160px;
    top: 60px;
    min-height: 100px;
    background: #000;
    position: absolute;
    display: none;
    .nav{
      display: flex;
      width: 100%;
      height: 45px;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #171717;
      font-size: 14px;
      img{
        height: 20px;
        margin-right: 10px;
        width: 20px;
        border-radius: 50%;
      }
      span{
        display: flex;
        width: 60%;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      span:hover{
        text-decoration-line: underline;
        text-decoration-color: #fff; /* 红色 */
      }
    }
  }

}
.btn-right-login:hover{
  .item-nav{
    display: block;
  }
}
.btn-right-lang{
  a{
    font-size: 14px;
    img{
      height: 20px;
    }
  }
}
</style>