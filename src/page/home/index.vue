<template>
  <div>
    <Headers></Headers>
    <div class="safe"/>
    <div class="home">
      <el-carousel height="600px" indicator-position="none" arrow="never">
        <el-carousel-item v-for="(item,index) in BannerImage" :key="index">
          <div class="home-swiper">
            <div class="center">
              <p class="titles">{{webSite.homeHeadText ? webSite.homeHeadText.title : ''}}</p>
              <p class="content">{{webSite.homeHeadText ? webSite.homeHeadText.introduce:'' }} </p>
            </div>
<!--            <el-image :src="src"></el-image>-->
            <img class="images" :src="item.bannerUrl" alt="">
<!--            <el-image class="images" src="http://8.210.20.168:210/api/uploads/image/20240416/6be59431-bee4-4c8a-a0e0-b4bea25cf39d.jpg" alt=""></el-image>-->
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="home-main-list">
          <div class="home-center">
              <div class="card-template">
                  <div class="card-left">
                    <el-carousel indicator-position="none" height="400px">
                      <el-carousel-item v-for="(item,index) in bannerArray" :key="index">
                        <p class="new">{{ $t('h.h001') }}</p>
                        <p class="title">{{item.title}}</p>
                        <p class="tips">{{item.content}}</p>
                        <img class="car" :src="item.bannerUrl" alt="">
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                  <div class="card-left">
                    <div class="card">
                        <p class="money">
                          <i v-if="isPwd">{{ userInfo.balanceMoney }}</i> <i v-else>***</i> <span>  {{ webSite.supervisorName }}</span>
                        </p>
                        <p class="money tips-money">  {{ $t('h.h004') }}</p>
                        <p class="money tip-money"> {{ $t('h.h005') }} {{ userInfo.userLevelName }} </p>
                      <el-divider></el-divider>
                      <div class="card-nav">
                          <div class="item">
                              <p class="title-item">{{ $t('h.h006') }}</p>
                              <p class="money-item">{{ webSite.supervisorName ? webSite.supervisorName:'USTD' }}  {{ userInfo.balanceMoney ? userInfo.balanceMoney.toFixed(2) :0  }}</p>
                          </div>
                        <div class="item">
                          <p class="title-item">{{ $t('h.h007') }}</p>
                          <p class="money-item">{{ webSite.supervisorName ? webSite.supervisorName:'USTD' }} {{ userInfo.nowCommissionMoney ? userInfo.nowCommissionMoney :0}}</p>
                        </div>
                        <div class="item">
                          <p class="title-item">{{ $t('h.h008') }}</p>
                          <p class="money-item">{{ userInfo.colorMoney }}</p>
                        </div>
                        <div class="item">
                          <p class="title-item">{{ $t('h.h009') }}</p>
                          <p class="money-item">{{ userInfo.nowOrderNum ? userInfo.nowOrderNum : 0 }}/{{userInfo.robOrderNum ? userInfo.robOrderNum : 0}}</p>
                        </div>
                      </div>
                      <div class="switch-box">
                        <van-switch active-color="#000000" inactive-color="#f2f2f2" v-model="isPwd" size="18px" />
                        <span>{{ $t('h.h010') }}</span>
                      </div>
                      <div class="switch-button">
                        <a @click="startBrushingOrders" href="javascript:void (0)">{{ $t('h.h011') }}</a>
                      </div>
                    </div>
                  </div>
              </div>
              <el-divider></el-divider>
              <div class="titles-center">{{ $t('h.h012') }}</div>
              <div class="title-list">
                <div class="card">
                  <img src="@/assets/images/yyc.jpeg" alt="">
                  <div class="name">{{ $t('h.h013') }}</div>
                  <div class="content">{{ $t('h.h014') }}</div>
                </div>
                <div class="card">
                  <img src="@/assets/images/lbjl.png" alt="">
                  <div class="name">{{ $t('h.h022') }}</div>
                  <div class="content">{{ $t('h.h023') }}</div>
                </div>
                <div class="card">
                  <img src="@/assets/images/jyc.jpeg" alt="">
                  <div class="name">{{ $t('h.h024') }}</div>
                  <div class="content">{{ $t('h.h025') }}</div>
                </div>
                <div class="card">
                  <img src="@/assets/images/xny.webp" alt="">
                  <div class="name">{{ $t('h.h026') }}</div>
                  <div class="content">{{ $t('h.h027') }}</div>
                </div>
              </div>
              <el-divider></el-divider>
<!--              <div class="titles-center">{{ $t('h.h015') }}</div>-->
              <div class="title-list-card">
                <div class="switch-nav">
                  <div class="switch">
                    <div @click="active=2" class="not" :class="{'active':active===2}">{{ $t('h.h017') }}</div>
                    <div @click="active=1" class="not" :class="{'active':active===1}">{{ $t('h.h016') }}</div>
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
<!--                    <img :src="content0" alt="">-->
<!--                    <img :src="renderedContent2" alt="">-->
                        <span v-html="renderedContent2"></span>
                  </div>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="titles-center">
                {{ $t('h.A0016') }}
              </div>
              <div class="swiper-content">
                <div class="category-image">
                  <div class="ks_daohang" :style="{ 'transform': 'translateX(' + currentOffset + 'px)' }">
                    <div class="ks-item-image" v-for="(item,index) in category" :key="index">
                      <div class="ks-item">
                        <div class="item-image">
                          <img :src="item.icon"
                               alt="">
                        </div>
                        <div class="item-nav">{{item.name}}</div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            <div class="template-band">
              <div class="card-nav-btn">
                <span v-html="renderedContent"></span>
                <!--                        <span v-html="renderedContent2"></span>-->
              </div>
            </div>
          </div>
      </div>
    </div>
    <popup  @closePopup="closePopup" :is-show="isShow" :content="popupContent"></popup>
    <Footer></Footer>
  </div>
</template>

<script>
import Headers from "@/page/components/Headers/index.vue";
import {
  bannerList,
  getAllUserLevel,
  getBannerList,
  HomeBannerImage,
  homeList,
  homepageText,
  pushProduct
} from "@/api/apiFox";
import {getItem, setItem} from "@/utils/auth";
import {removeHtmlTags} from "@/utils";
import {debounce} from "@/utils/evenNumbers";
import {Toast} from "vant";
import {decrypt} from "@/utils/AES";
import Footer from "../components/Footer/index.vue";
import popup from '../components/popup/index.vue'
export default {
  components:{Headers,Footer,popup},
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
      active:2,
      currentIndex: 0,
      autoPlayInterval: null,
      BannerImage:[],
      bannerArray:[],
      category:[
        {id:1,name:'Sedans',icon:require('@/assets/images/1000.jpeg')},
        {id:2,name:'SUVS',icon:require('@/assets/images/1001.jpeg')},
        {id:3,name:'Trucks',icon:require('@/assets/images/1003.jpeg')},
        {id:4,name:'VANS',icon:require('@/assets/images/1005.jpeg')},
        {id:5,name:'Electric Vehicles (EV)',icon:require('@/assets/images/1006.jpeg')},
        {id:6,name:'Hybrids',icon:require('@/assets/images/1007.jpeg')},
        {id:7,name:'Plug-In Hybrids (PHEV)',icon:require('@/assets/images/1008.jpeg')},
        {id:8,name:'Hatchbacks',icon:require('@/assets/images/10009.jpeg')},
        {id:9,name:'Coupes',icon:require('@/assets/images/10010.jpeg')},
        {id:10,name:'Convertibles',icon:require('@/assets/images/1012.jpeg')},
        {id:11,name:'Wagons',icon:require('@/assets/images/1013.jpeg')},
      ]
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
      if (/video/.test(this.content2)){
        let modifiedContent = this.content2.replace(/<video(.*?)src="(.*?)"(.*?)>/g, (match, p1, p2, p3) => {
          return `<video${p1}src="${p2}" style="width: 100% !important; height: 100%!important;">`;
        });
        return modifiedContent;
      }else if(/img/.test(this.content2)){
        let modifiedContent = this.content2.replace(/<img(.*?)src="(.*?)"(.*?)>/g, (match, p1, p2, p3) => {
          return `<img${p1}src="${p2}" style="width: 100% !important; height: 100%!important;">`;
        });
        return modifiedContent;
      }else{
        return this.content2;
      }
    },
    currentOffset() {
      return -100 * this.currentIndex;
    }
  },

  methods: {
    onChange(index) {
      this.current = index;
    },
    nextItem() {
      if (this.currentIndex < this.category.length -8) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0;
      }
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(this.nextItem, 3000);
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
      }
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
        if (res.length>0){
          this.content0=res[0].content
          this.parentList=res
          let content1 = res.filter(value=> {return value.state===0})
          this.content1=content1 ? content1[0].content:''
          let content = res.filter(value=> {return value.state===3})
          this.content2=content ? content[0].content:''
        }else{
          this.content0=''
          this.content1=''
          this.content2=''
        }

      })

      getAllUserLevel().then(res=>{this.memeberShip=res})

      getBannerList().then(res => {this.bannerList = res}).catch(err => {})

      HomeBannerImage().then(res=>{
        console.log(res)
        this.BannerImage=res
      }).catch(err=>{})

      bannerList({bannerType:3}).then(res=>{
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
    this.startAutoPlay();
    this.$once('hook:beforeDestroy', this.stopAutoPlay);
  }
}
</script>

<style scoped lang="scss">
.safe{
  width: 100%;
  height: 60px;
}
.home{
  width: 100%;
  .home-swiper{
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    .images{
      //width: 100%;
      //height: 600px;
      position: absolute;
      z-index: 0;
    }
    .center{
      width: 900px;

      z-index: 99;
      position: relative;
      .titles{
        text-align: center;
        color: #fff;
        font-size: 45px;
        font-weight: 600;
      }
      .content{
        margin-top: 20px;
        text-align: center;
        font-size: 30px;
        color: #fff;
        font-weight: 300;
      }
    }
  }
  .home-main-list{
    min-height: 800px;
    width: 100%;
    background: #f8f8f8;
    display: flex;
    justify-content: center;
    .home-center{
      width: 1300px;
      min-height: 400px;
      margin-top: 30px;
      .card-template{
        width: 100%;
        height: 700px;
        display: flex;
        .card-left{
          width: 50%;
          height: 500px;
          .new{
            width: 50px;
            height: 34px;
            text-align: center;
            line-height: 35px;
            background: #9ad3f3;
            border-radius: 10px;
            font-size: 14px;
          }
          .title{
            width: 100%;
            margin-top: 20px;
            font-size: 34px;
          }
          .tips{
            width: 60%;
            margin-top: 20px;
            font-size: 18px;
            color: #999;
          }
          .car{
            height: 240px;
            margin-top: 50px;
          }
          .card{
            margin-top: 40px;
            width: 600px;
            height: 550px;
            background: #fff;
            margin-left: 50px;
            padding: 3%;
            box-sizing: border-box;
            .money{
              width: 100%;
              text-align: center;
              margin-top: 20px;
              i{
                font-size: 72px;
                font-weight: 600;
              }
              span{
                font-size: 18px;
              }
            }
            .tips-money{font-size: 18px;}
            .tip-money{
              margin-top: 10px;
              font-size: 14px;
              color: #999;
            }
            .card-nav{
              width: 100%;
              height: 150px;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              .item{
                width: 45%;
                height: 60px;
                border-radius: 6px;
                border: 1px solid #333;
                padding: 8px 2%;
                box-sizing: border-box;
                .title-item{
                  font-size: 14px;
                  color: #999;
                }
                .money-item{
                  margin-top: 5px;
                  font-size: 18px;
                }
              }
            }
            .switch-box{
              width: 100%;
              height: 30px;
              padding: 0 25px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              span{
                font-size: 16px;
                margin-left: 15px;
                color: #5a5a5a;
              }
            }
            .switch-button{
              width: 100%;
              height: 80px;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 30px;
              box-sizing: border-box;
              a{
                margin-top: 40px;
                display: flex;
                width: 100%;
                justify-content: center;
                border-radius: 40px;
                align-items: center;
                height: 50px;
                background: #000;
                color: #fff;
                font-size: 18px;
              }
            }
          }
        }
      }
      .titles-center{
        width: 100%;
        height: 100px;
        font-size: 42px;
        line-height: 100px;
        font-weight: 600;
        color: #333;
        text-align: center;
      }
      .title-list{
        width: 100%;
        min-height: 400px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .card{
          margin-bottom: 40px;
          width: 600px;
          background: #fff;
          height: 400px;
          border-radius: 10px;
          text-align: center;
          padding: 5% 6%;
          box-sizing: border-box;
          img{
            height: 140px;
          }
          .name{
            width: 100%;
            text-align: center;
            font-size: 30px;
            margin-top: 15px;
            font-weight: 600;
          }
          .content{
            font-size: 22px;
            margin-top: 10px;
            color: #5a5a5a;
          }
        }
      }
      .title-list-card{
        width: 100%;
        min-height: 400px;
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
          padding: 0 8%;
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          //justify-content: center;
          .card-nav{
            margin-left: 50px;
            margin-bottom: 20px;
            width: 300px;
            height: 200px;
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
              height: 80px;
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
          min-height: 100px;
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
            text-align: center;
            img{
              height: auto;
            }
            span{
              font-size: 14px;
            }
          }
        }
      }
      ::-webkit-scrollbar{
        display: none;
      }
      .swiper-content{
        width: 100%;
        padding: 50px 0;
        box-sizing: border-box;
        .category-image {
          width: 100%;
          min-height: 150px;
          margin-top: 30px;
          display: flex;
          //background: red;
          overflow-x: scroll;
          overflow-y: hidden;
          position: relative;
          .ks_daohang{
            display: flex;
            transition: transform 0.5s ease;
            .ks-item-image {
              min-height: 150px;
              width: 100%;
              /*flex-shrink: 0;*/
              /*background: #f6f6f6;*/
              .ks-item{

                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                align-items: center;
                .item-image {
                  width: 120px;
                  height: 300px;
                  margin-left: 10px;
                  background: #fff;
                  border: 1px solid #f6f6f6;
                  display: flex;
                  border-radius: 10px;
                  justify-content: center;
                  align-items: center;

                  img {
                    border-radius: 10px;
                    height: 300px;
                    width: 120px;
                  }
                }

                .item-nav {
                  width: 100%;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 8px;
                }
              }

            }
          }

        }
      }
      .template-band {
        width: 100%;
        margin-bottom: 100px;
        min-height: 400px;
        background: #fff;
        margin-top: 40px;
        //margin-top: -5px;
        padding: 30px 3% 30px 3%;
        box-sizing: border-box;
        .card-nav-btn{
          width: 100%;
          font-size: 14px;
          line-height: 28px;
          font-weight: 300;
        }
      }
    }
  }
}
</style>