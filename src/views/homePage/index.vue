<template>
  <div>
    <Header></Header>
    <div class="safe"/>

    <div class="template-banner">
      <van-notice-bar style="position: absolute;width: 100%;top: 0;left: 1%;z-index: 999" color="#f8f8f8" scrollable background="none">
        <template #left-icon>
          <img class="image" src="@/assets/images/icon/icon_notice.png" alt="">
        </template>
        {{ noticeContent }}
      </van-notice-bar>
      <van-swipe loop :autoplay="3000" @change="onChange">
        <van-swipe-item  v-for="(item,index) in bannerList" :key="index">
<!--          <div class="bgk-swiper" :style="{background:'url('+item.bannerUrl+') no-repeat'}">-->
          <img v-if="item.bannerUrl" class="bgk-swiper-postions" :src="item.bannerUrl" alt="">
          <div class="bgk-swiper">
            <div class="center-icon">
              {{webSite.homeHeadText ? webSite.homeHeadText.title : ''}}
              <p>{{webSite.homeHeadText ? webSite.homeHeadText.introduce:'' }}</p>
            </div>
            <div class="button-next">
              <van-icon name="arrow-down" />
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="template-box">

      <div class="titles-box-header" v-if="bannerArray.length>0">
        <van-swipe loop  :autoplay="3000" @change="onChange">
<!--          -->
          <van-swipe-item v-for="(item,index) in bannerArray" :key="index">
            <div class="header">
              <p class="header-top">{{ $t('h.h001') }}</p>
            </div>
            <div class="header">
              <div class="content">
                {{item.title}}
              </div>
            </div>
            <div class="header">
              <div class="content-tips">
                {{item.content}}
              </div>
            </div>
            <p class="box-card" style="text-align: center">
              <img :src="item.bannerUrl" alt="">
            </p>
          </van-swipe-item>
        </van-swipe>

      </div>
      <div class="main-box-header">

          <p  v-if="false" class="box-money">
             <i v-if="isPwd">{{ userInfo.balanceMoney }}</i>
              <i v-else>***</i>
            {{ webSite.supervisorName }}
          </p>
          <p  v-if="false" class="box-tips">
            {{ $t('h.h004') }}
          </p>
          <p  v-if="false" class="box-tips rank">
            {{ $t('h.h005') }} {{ userInfo.userLevelName }}
          </p>
<!--          <p  class="divider"> <van-divider /></p>-->

          <div v-if="false" class="total-box-main">
              <div class="box">
                <p class="title">{{ $t('h.h006') }}</p>
                <p class="money">{{ webSite.supervisorName ? webSite.supervisorName:'USTD' }}  {{ userInfo.balanceMoney ? userInfo.balanceMoney.toFixed(2) :0  }}</p>
              </div>
              <div class="box">
                <p class="title">{{ $t('h.h007') }}</p>
                <p class="money">{{ webSite.supervisorName ? webSite.supervisorName:'USTD' }} {{ userInfo.nowCommissionMoney ? userInfo.nowCommissionMoney :0}}</p>
              </div>
            <div class="box">
              <p class="title">{{ $t('h.h008') }}</p>
              <p class="money"> {{ userInfo.colorMoney }}</p>
            </div>
            <div class="box">
              <p class="title">{{ $t('h.h009') }}</p>
              <p class="money">{{ userInfo.nowOrderNum ? userInfo.nowOrderNum : 0 }}/{{userInfo.robOrderNum ? userInfo.robOrderNum : 0}}</p>
            </div>
          </div>
          <div v-if="false" class="whether-hide-amount">
            <van-switch active-color="#000000" inactive-color="#f2f2f2" v-model="isPwd" size="18px" />
            <span>{{ $t('h.h010') }}</span>
          </div>
          <div v-if="false" class="submit-button">
            <div @click="startBrushingOrders" class="submit-image">{{ $t('h.h011') }}</div>
            <div class="bottom-divider"/>
          </div>
      </div>
      <div class="box-nav-next">
        <div class="title">{{ $t('h.h012') }}</div>
        <div class="card">
            <div class="title-tops">{{ $t('h.h013') }}<img src="@/assets/images/yyc.jpeg" alt=""></div>
            <div class="card-content">{{ $t('h.h014') }}</div>
        </div>
        <div class="card">
          <div class="title-tops">{{ $t('h.h022') }}<img src="@/assets/images/lbjl.png" alt=""></div>
          <div class="card-content">{{ $t('h.h023') }}</div>
        </div>
        <div class="card">
          <div class="title-tops">{{ $t('h.h024') }}<img src="@/assets/images/jyc.jpeg" alt=""></div>
          <div class="card-content">{{ $t('h.h025') }}</div>
        </div>
        <div class="card">
          <div class="title-tops">{{ $t('h.h026') }}<img src="@/assets/images/xny.webp" alt=""></div>
          <div class="card-content">{{ $t('h.h027') }}</div>
        </div>
      </div>
    </div>
    <div class="template-band">
      <div class="title">
        {{ $t('h.h015') }}
      </div>
      <div class="switch-nav">
        <div class="switch">
          <div @click="active=1" class="not" :class="{'active':active===1}">{{ $t('h.h016') }}</div>
          <div @click="active=2" class="not" :class="{'active':active===2}">{{ $t('h.h017') }}</div>
        </div>
      </div>
      <div v-if="active===1" class="partners-list">
        <div class="card-nav" v-for="(item,index) in memeberShip" :key="index">
          <img :src="item.lvImage" alt="">
          <p>{{ item.lvName }}</p>
        </div>
      </div>

      <div v-if="active===2" class="partners-list-parent">
        <div class="card-nav">
          <img :src="content0" alt="">
        </div>
      </div>
    </div>

    <div class="template-band">
      <div class="card-nav-btn">
        <span v-html="renderedContent"></span>
<!--        <span v-html="renderedContent2"></span>-->
      </div>
    </div>
    <Footer></Footer>

    <popup  @closePopup="closePopup" :is-show="isShow" :content="popupContent"></popup>
  </div>
</template>

<script>
import Footer from '@/components/footer/index.vue'
import Header from "@/components/Header/index.vue";
import {removeHtmlTags} from "@/utils";
import {
  bannerList,
  getAllUserLevel,
  getBannerList,
  getWebsiteInfo,
  homeList,
  homepageText,
  pushProduct
} from "@/api/apiFox";
import popup from "@/components/popup/index.vue";
import {getItem, setItem} from "@/utils/auth";
import {decrypt} from "@/utils/AES";
import {debounce} from "@/utils/evenNumbers";
import {Toast} from "vant";

export default {
  components:{Header,Footer,popup},
  metaInfo(){
    return{
      meta:[
        {
          name:'viewport',
          content:'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ]
    }
  },
  data(){
    return{
      isPwd:true,//是否显示金额
      popupContent:'',
      current: 0,//翻页
      noticeContent:'',
      userInfo:'',
      isShow:false,
      bannerList:[],
      memeberShip:[],
      parentList:[],
      webSite:'',
      content0:'',
      content1:'',
      content2:'',
      bannerArray:[],
      active:1
    }
  },
  computed:{
    renderedContent() {
      let modifiedContent = this.content1.replace(/<img(.*?)src="(.*?)"(.*?)>/g, (match, p1, p2, p3) => {
        return `<img${p1}src="${p2}" style="width: 100% !important; height: 100%!important;">`;
      });
      return modifiedContent;
    },
    renderedContent2() {
      let modifiedContent = this.content2.replace(/<img(.*?)src="(.*?)"(.*?)>/g, (match, p1, p2, p3) => {
        return `<img${p1}src="${p2}" style="width: 100% !important; height: 100%!important;">`;
      });
      return modifiedContent;
    },
  },

  methods: {
    onChange(index) {
      this.current = index;
    },
    closePopup(){
      sessionStorage.removeItem('open')
      this.isShow=false
    },
    getBaseInfo(){
      let s = sessionStorage.getItem('tips')
      homeList().then(res=>{
        setItem('base',res)
        res.forEach(value=>{
          if (/Notice/.test(value.title) && s){
            this.isShow=true
            this.popupContent=value.content ? value.content : ''
          }
          if (/noticeBar/.test(value.title)){
            this.noticeContent=removeHtmlTags(value.content)
          }
        })
      }).catch(err=>{})

      homepageText().then(res=>{
        console.log(res)
        if (res.length>0){
          this.content0=res[0].content
          this.parentList=res
          this.content1=this.parentList[1].content
          this.content2=this.parentList[2].content
        }else{
          this.content0=''
          this.content1=''
          this.content2=''
        }

      })

      getAllUserLevel().then(res=>{this.memeberShip=res})

      getBannerList().then(res => {this.bannerList = res}).catch(err => {})
      bannerList({bannerType:2}).then(res=>{
        this.bannerArray=res
      }).catch(err=>{})
    },
    startBrushingOrders:debounce(function (){
      if (this.userInfo.nowOrderNum >= this.userInfo.robOrderNum){
        Toast({
          position:'top',
          message:this.$t('h.R016'),
          duration:5000})
      }else{
        if (this.userInfo.balanceMoney < 0){
          Toast(this.$t('h.R017'))
        }else{
          this.loading=true
          pushProduct(this.userInfo.username).then(res=>{
            if (res.data){
              setItem('order',res.data)
              this.loading=false
              this.$router.push('/deal')
            }
          }).catch(err=>{
            if (err.code === 314){
              this.$router.push('/order')
            }
            this.loading=false
          })
        }
      }

    },600),
  },
  mounted() {
      this.getBaseInfo()
      this.userInfo=JSON.parse(decrypt(getItem('BaseUser')))
    this.$store.dispatch('getUserList',this.userInfo.id).then(res=>{
      this.userInfo=res
    })
      this.webSite=getItem('website')
  }
}
</script>

<style scoped lang="scss">

  .template-banner{
    width: 100%;
    height: 540px;
    //background: url("@/assets/images/1.jpeg") no-repeat 100% 100%;
    background-position:center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .bgk-swiper-postions{
      position: absolute;
      width: 100%;
      height: 540px;
      z-index: 0;
    }
    .bgk-swiper{
      width: 100%;
      height: 540px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .center-icon{

        text-align: center;
        width: 100%;
        padding: 3%;
        box-sizing: border-box;
        color: #fff;
        font-weight: 600;
        font-size: 24px;
        p{
          margin-top: 20px;
          font-size: 16px;
          font-weight: 300;
          line-height: 24px;
        }
      }
    }
    .button-next{
      width: 100%;
      height: 20px;
      bottom: 30px;
      position: absolute;
      color: #fff;
      font-size: 14px;
      text-align: center;
    }
  }
  .safe{
    width: 100%;height: 60px;
  }
  .template-box{
    width: 100%;
    min-height: 600px;
    background: #f8f8f8;
    margin-top: 40px;
    padding: 0 0 30px 0;
    .titles-box-header{
      background: #f8f8f8;
      height: 280px;
      width: 100%;
      padding: 40px 0 0 0;
      box-sizing: border-box;
      .header{
        width: 100%;
        min-height: 40px;
        display: flex;
        justify-content: center;
        .header-top{
          width: 50px;
          height: 30px;
          background: #9ad3f3;
          border-radius: 8px;
          text-align: center;
          line-height: 30px;
          color: #000;
          font-size: 12px;
        }
        .content{
          margin-top: 10px;
          width: 200px;
          line-height: 36px;
          font-weight: 600;
          text-align: center;
          font-size: 28px;
          color: #333;
        }
        .content-tips{
          width: 100%;
          padding: 3%;
          box-sizing: border-box;
          color: #666;
          font-weight: 600;
          font-size: 14px;
          text-align: center;
        }
      }
    }
    .main-box-header{
      width: 100%;
      min-height: 100px;
      padding: 0 0 20px 0;
      margin-top: -40px;
      .box-card{
        width: 100%;
        height: 100px;
        text-align: center;
        background: #fff;
        img{
          height: 100px;
        }
      }
      .box-money{
        background: #fff;
        width: 100%;
        height: 80px;
        text-align: center;
        font-family: Radikal,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,Roboto,sans-serif;
        font-size: 20px;
        i{
          font-weight: 600;
          font-size: 54px;
        }
      }
      .box-tips{
        width: 100%;
        height: 30px;
        background: #fff;
        font-size: 14px;
        text-align: center;
      }
      .rank{
        color: #999;
        font-size: 12px;
      }
      .divider{
        width: 100%;
        padding:0 3%;
        box-sizing: border-box;
      }
      .total-box-main{
        min-height: 130px;
        width: 100%;
        padding:0 3%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        box-sizing: border-box;
        .box{
          width: 160px;
          margin-bottom: 15px;
          min-height: 50px;
          border-radius: 2px;
          border: 1px solid #707070;
          padding:2% 2%;
          box-sizing: border-box;
          .title{
            width: 100%;
            color: #999;
            font-size: 12px;
          }
          .money{
            margin-top: 5px;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
      .whether-hide-amount{
        width: 100%;
        height: 60px;
        padding: 0 4%;
        margin-top: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 12px;
        span{
          margin-left: 15px;
        }
      }
      .submit-button{
        width: 100%;
        height: 70px;
        box-sizing: border-box;
        background: #f8f8f8;
        padding: 0 3%;
        .submit-image{
          width: 100%;
          height: 40px;
          border-radius: 30px;
          background: #000;
          color: #fff;
          text-align: center;
          line-height: 40px;
          font-size: 16px;
        }
        .bottom-divider{
          width: 100%;
          height: 2px;
          background: #e5e5e5;
          margin-top: 20px;
        }
      }
    }
    .box-nav-next{
      width: 100%;
      min-height: 200px;
      padding: 0 4%;
      box-sizing: border-box;
      background: #f8f8f8;
      .title{
        width: 100%;
        text-align: center;
        font-size: 26px;
        color: #333;
        font-weight: 600;
      }
      .card{
        width: 100%;
        height: 150px;
        background: #fff;
        border-radius: 15px;
        margin-top: 20px;
        padding: 5%;
        box-sizing: border-box;
        .title-tops{
          width: 100%;
          height: 60px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img{
            height: 40px;
          }
        }
        .card-content{
          font-size: 16px;
          width: 100%;
          margin-top: 10px;
        }
      }
    }
  }
  .template-band{
    width: 100%;
    min-height: 100px;
    background: #fff;
    margin-top: -5px;
    padding: 30px 3% 30px 3%;
    box-sizing: border-box;
    .title{
      font-weight: 600;
      width: 100%;
      color: #333;
      font-size: 26px;
      text-align: center;
    }
    .switch-nav{
      width: 100%;
      height: 40px;
      margin-top: 30px;
      display: flex;
      justify-content: center;
      .switch{
        min-width: 200px;
        border: 1px solid #000;
        height: 35px;
        border-radius: 35px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .not{
          background: none;
          color: #000;
          font-size: 14px;
          width: 50%;
          text-align: center;
        }
        .active{
          color: #fff;
          background: #000;
          border-radius: 30px;
          font-size: 14px;
          width: 50%;
          text-align: center;
          height: 35px;
          line-height: 35px;
        }
      }
    }
    .partners-list{
      width: 100%;
      margin-top: 40px;
      min-height: 100px;
      padding: 0 3%;
      box-sizing: border-box;
      justify-content: space-between;
      display: flex;
      flex-wrap: wrap;
      .card-nav{
        margin-bottom: 20px;
        width: 150px;

        height: 80px;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 2% 0;
        box-sizing: border-box;

        img{
          height: 40px;
        }
        p{
          width: 100%;
          text-align: center;
          font-size: 14px;
        }
      }
    }
    .partners-list-parent{
      width: 100%;
      margin-top: 40px;
      min-height: 20px;
      padding: 0 3%;
      box-sizing: border-box;
      justify-content: space-between;
      display: flex;
      flex-wrap: wrap;
      ::-webkit-scrollbar{
        display: none;
      }
      .card-nav{
        width: 100%;
        overflow-x: scroll;

        img{
          height: 40px;
        }
        span{
          font-size: 14px;
        }
      }
    }
    .card-nav-btn{
      width: 100%;
      font-size: 14px;
      line-height: 28px;
      font-weight: 300;
    }
  }
  .template-image{
    width: 100%;
    min-height: 100px;
    padding: 3%;
    box-sizing: border-box;
    background: #fff;
    margin-top: -5px;
    .title{
      font-weight: 600;
      width: 100%;
      color: #333;
      font-size: 26px;
      text-align: center;
    }
    .swipper-box{
      width: 100%;
      height: 300px;
      display: flex;
      margin-top: 40px;
      justify-content: center;
      .left{
        width: 30px;
        height: 250px;
        display: flex;
        align-items: center;
        .left-icon{
          width: 30px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
          background: rgba(255,255,255,0.8);
        }
      }
    }
    .card-swipper-box{
      width:100%;
      height: 250px;
      background: #f6f6f6;
      img{
        width: 100%;
      }
      .image-box{
        width: 100%;
        height: 40px;
        font-size: 14px;
        text-align: center;
        margin-top: 20px;
      }
      .avatar-box{
        width: 100%;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          margin-right: 10px;
          height: 30px;
          width: 30px;
          border-radius: 50%;
        }
      }
    }
    .image{
      height: 16px;
    }
  }
</style>