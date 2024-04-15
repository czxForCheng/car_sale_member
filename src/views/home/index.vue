<template>
  <div class="home-hole">
    <div class="language">
      <Language/>
    </div>
    <div class="scroll-notification-list">
      <van-notice-bar scrollable color="#1989fa" background="#fff" left-icon="info-o">
        <template slot="left-icon">
          <img class="left-icon" src="@/assets/images/icon/icon_notice.png" alt="">
        </template>
        <template #default>
          <div class="content">My out poluar kill hoturk mlflak</div>
        </template>
      </van-notice-bar>
    </div>
    <div class="home-image-bgk">
      <img class="bgk-image" src="@/assets/images/bgk-home.png" alt="">
      <div class="home-content">
        <p class="title">Lock the deal now late you ok popular late you late you</p>
        <p class="content-text">
          hoturk mlflak my out poluar kill hoturk mlflak my out you poluar kill  my  poluar killhoturk mlflak my out poluar kill  my poluar killhoturk mlflak my out poluar kill  my poluar killhoturk mlflak my out poluar kill  my
        </p>
      </div>
    </div>
    <div class="home-nav-list">
      <div @click="active=1" class="nav" >
        <p :class="{'nav-active':active===1}">Membership</p>
        <span v-if="active===1"/>
      </div>
      <div @click="active=2" class="nav" >
        <p :class="{'nav-active':active===2}">Partner</p>
        <span v-if="active===2"/>
      </div>
    </div>
    <div class="home-box-card">
      <div class="card-box" v-if="active===1">
        <div class="item-card">
          <img src="@/assets/images/icon/vip2.png" alt="">
          <div class="right">
              <p class="title-top">Premium Member</p>
              <p class="content-bottom">1.0%</p>
          </div>
        </div>
        <div class="item-card">
          <img src="@/assets/images/icon/vip2.png" alt="">
          <div class="right">
            <p class="title-top">Premium Member</p>
            <p class="content-bottom">1.0%</p>
          </div>
        </div>
        <div class="item-card">
          <img src="@/assets/images/icon/vip2.png" alt="">
          <div class="right">
            <p class="title-top">Premium Member</p>
            <p class="content-bottom">1.0%</p>
          </div>
        </div>
        <div class="item-card">
          <img src="@/assets/images/icon/vip2.png" alt="">
          <div class="right">
            <p class="title-top">Premium Member</p>
            <p class="content-bottom">1.0%</p>
          </div>
        </div>
        <div class="item-card">
          <img src="@/assets/images/icon/vip2.png" alt="">
          <div class="right">
            <p class="title-top">Premium Member</p>
            <p class="content-bottom">1.0%</p>
          </div>
        </div>
        <div class="item-card">
          <img src="@/assets/images/icon/vip2.png" alt="">
          <div class="right">
            <p class="title-top">Premium Member</p>
            <p class="content-bottom">1.0%</p>
          </div>
        </div>
        <div class="item-card">
          <img src="@/assets/images/icon/vip2.png" alt="">
          <div class="right">
            <p class="title-top">Premium Member</p>
            <p class="content-bottom">1.0%</p>
          </div>
        </div>
        <div class="item-card">
          <img src="@/assets/images/icon/vip2.png" alt="">
          <div class="right">
            <p class="title-top">Premium Member</p>
            <p class="content-bottom">1.0%</p>
          </div>
        </div>
      </div>
      <div v-if="active===2" class="parent-card">
        <img src="@/assets/images/icon/2.png" alt="">
        <img src="@/assets/images/icon/3.png" alt="">
        <img src="@/assets/images/icon/3.png" alt="">
        <img src="@/assets/images/icon/4.png" alt="">
      </div>
      <div class="card-box-news">
        <img src="@/assets/images/bgk-home.png" alt="">
        <div class="content-news">
          hoturk mlflak my out poluar kill hoturk mlflak my out you poluar kill my poluar killhoturk mlflak my out poluar kill my poluar killhoturk mlflak my out poluar kill my poluar killhoturk mlflak my out poluar kill my you poluar you poluar you poluar you poluar you poluar you poluar
        </div>
      </div>
    </div>
    <div class="safe"/>
  </div>
</template>

<script >
import Language from "@/components/Language/index.vue";
import {debounce} from "@/utils/evenNumbers";
import {Toast} from "vant";
import {pushProduct} from "@/api/apiFox";
import {setItem} from "@/utils/auth";
export default {
  components:{Language},
  data(){
    return{
      showPopover:false,
      active:1,
      userInfo:''
    }
  },
  methods:{
    test(){
      console.log(this.$loading.show)
      this.$loading.loading('112321',1500,true)
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
  }
}
</script>

<style scoped lang="scss">
.home-hole{
  width: 100%;
  min-height: 100vh;
  .language{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .scroll-notification-list{
    width: 100%;
    height: 40px;
    background: #fff;
  }
  .home-image-bgk{
    width: 100%;
    height: 412px;
    background: rgba(228,113,34,0);
    position: relative;
    .bgk-image{
      width: 100%;
      height: 412px;
      position: absolute;
      z-index: 0;
    }
    .home-content{
      position: absolute;
      bottom: 0;
      width: 100%;
      height:140px;
      padding: 3% 4%;
      box-sizing: border-box;
      .title{
        font-size: 18px;
        color: #fff;
        margin-bottom: 10px;
        text-transform: none;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .content-text{
        color: #fff;
        font-weight: 400;
        font-size: 13px;
        color: rgba(255,255,255,0.8);
        line-height: 18px;
        font-style: normal;
        text-transform: none;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .home-nav-list{
    width: 100%;
    height: 50px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding:0 3%;
    box-sizing: border-box;
    .nav{
      width: 100px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-right: 15px;
      p{
        width: 100%;
        font-weight: 500;
        height: 30px;
        font-size: 16px;
        color: rgba(255,255,255,0.7);
        line-height: 19px;
        text-align: center;
        font-style: normal;
        text-transform: none;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .nav-active{
        color: #fff;
      }
      span{
        display: flex;
        height: 2.5px;
        width: 20px;
        margin-top: -5px;
        background: #fff;
      }
    }

  }
  .home-box-card{
    width: 100%;
    padding: 3%;
    box-sizing: border-box;
    ::-webkit-scrollbar{
      display:  none;
    }
    .card-box{
      width: 100%;
      height: 452px;
      background: #FFFFFF;
      border-radius: 10px 10px 10px 10px;
      padding: 3%;
      box-sizing: border-box;
      overflow-y: scroll;
      .item-card{
        width: 100%;
        height: 60px;
        background: #FCF1ED;
        border-radius: 10px 10px 10px 10px;
        padding: 3%;
        margin-top: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          height: 40px;
        }
        .right{
          margin-left: 20px;
          width: 100%;
          height: 40px;
          .title-top{
            font-weight: 400;
            font-size: 16px;
            color: #333333;
            line-height: 16px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
          .content-bottom{
            font-weight: 500;
            font-size: 14px;
            margin-top: 5px;
            color: #333333;
            line-height: 16px;
            text-align: left;
            font-style: normal;
          }
        }
      }
    }
    .parent-card{
      width:100%;
      height: 136px;
      background: #FFFFFF;
      border-radius: 10px 10px 10px 10px;
      overflow-y: scroll;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 3%;
      box-sizing: border-box;
      img{
        height: 40px;
      }
    }
    .card-box-news{
      width: 100%;
      margin-top: 20px;
      height: 306px;
      background: #FFFFFF;
      border-radius: 10px 10px 10px 10px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding: 3%;
      box-sizing: border-box;
      img{
        width: 315px;
        height: 153px;
        border-radius: 10px;
      }
      .content-news{
        font-size: 14px;
        color: #333333;
        line-height: 18px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        display: -webkit-box;
        -webkit-box-orient: vertical;

        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .safe{
    width: 100%;
    height: 80px;
  }
}

.left-icon{
  width: 15px;
}
.content{
  margin-left: 10px;
  color: #333;
}
</style>