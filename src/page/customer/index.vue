<template>
  <div>
    <Headers></Headers>
    <div class="safe"/>
    <div class="hole">
      <div class="center-box">
        <div class="chat-image">
          <img src="@/assets/images/chat.png" alt="">
          <div class="right">
            <p>{{$t('h.C001')}}</p>
            <p>{{$t('h.C002')}}</p>
          </div>
        </div>
        <div class="list">
          <div v-if="data.length<1" class="item">
            <div @click="goPay" class="left">
              <p>{{$t('h.R028')}}</p>
              <p><van-icon name="clock-o" />{{$t('h.C003')}} : 12:00 - 23:00</p>
            </div>
            <div  @click="goPay" class="right">
              <van-icon name="arrow" />
            </div>
          </div>
          <div v-else class="item" v-for="(item,index) in data" :key="index">
            <div v-if="item.type===0"  @click="telPhone(item.linkUrl)" class="left">
              <p>{{item.userName}} <b v-if="item.type===0"> : {{ item.linkUrl }}</b></p>
              <p><van-icon name="clock-o" />{{$t('h.C003')}}{{item.workStartTime}} - {{ item.workEndTime }}</p>
            </div>
            <div v-else  @click="goUrl(item.linkUrl)" class="left">
              <p>{{item.userName}} <b v-if="item.type===0"> : {{ item.linkUrl }}</b></p>
              <p><van-icon name="clock-o" />{{$t('h.C003')}}{{item.workStartTime}} - {{ item.workEndTime }}</p>
            </div>
            <div v-if="item.type===0" class="right">
              <van-icon  @click="telPhone(item.linkUrl)" name="phone-o" />
            </div>
            <div  v-else class="right">
              <van-icon  @click="goUrl(item.linkUrl)" name="arrow" />
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Headers from "@/page/components/Headers/index.vue";
import Footer from "@/page/components/Footer/index.vue";
import {Toast} from "vant";
import {decrypt} from "@/utils/AES";
import {getItem} from "@/utils/auth";
import {chatList} from "@/api/apiFox";

export default {
  components:{Headers,Footer},
  data(){
    return{
      user:'',
      data:[]
    }
  },
  methods:{
    getChatList(){
      chatList(this.user.id).then(res=>{
        this.data = res
      }).catch(err=>{
        // errorTips(err.msg)
      })
    },
    telPhone(phone){
      location.href=`tel://${phone}`
    },
    goUrl(url){
      window.open(url)
    },
    goPay(){
      location.href=''
    }
  },
  mounted() {
    this.user=JSON.parse(decrypt(getItem('BaseUser')))
    this.getChatList()
  }
}
</script>

<style scoped lang="scss">
.safe{
  width: 100%;
  height: 60px;
}
.hole {
  width: 100%;
  min-height: 100vh;
  background: #f8f8f8;
  background: url("@/assets/images/bgk_car.png") no-repeat 100%;
  background-position: left center;
  background-size: cover;
  display: flex;
  justify-content: center;
  padding: 60px 0;
  box-sizing: border-box;
  ::-webkit-scrollbar{
    display: none;
  }
  .center-box{
    width: 700px;
    overflow-y: scroll;
    border-radius: 8px;
    height: 700px;
    background: #fff;
    .chat-image{
      width: 100%;
      height:100px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      img{
        height: 80px;
      }
      .right{
        width: 60%;
        height: 80px;
        margin-left: 20px;
        padding: 20px 0 0 0;
        p:nth-child(1){
          font-size: 18px;
        }
        p:nth-child(2){
          font-size: 14px;
        }
      }
    }
    .list{
      width: 100%;
      padding: 4%;
      box-sizing: border-box;
      .item{
        width: 100%;
        height: 80px;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        padding: 3% 6%;
        box-sizing: border-box;
        border-radius: 15px;
        margin-bottom: 20px;
        .left{
          width: 90%;
          height: 80px;
          padding: 20px 0 0 0;
          box-sizing: border-box;
          p:nth-child(1){
            font-size: 18px;
          }
          p:nth-child(2){
            margin-top: 5px;
            font-size: 14px;
            color: #666;
          }
        }
        .right{
          width: 10%;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>