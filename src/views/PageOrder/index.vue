<template>
  <div class="order-main">
    <Header></Header>
    <div class="safe"/>
    <van-tabs v-model="active" background="#171717" color="#fff" title-active-color="#fff" title-inactive-color="#c6c6c6" ellipsis sticky>
      <van-tab :title="$t('h.o001')">
        <div v-if="list.length<1" class="none">
          <img src="@/assets/images/icon/none.png" alt="">
        </div>
        <div v-else class="all-box">
          <div v-for="(item,index) in list" :key="index" class="card-item">
            <div v-if="item.orderStatus===0" class="label">{{ $t('h.o002') }}</div>
            <div v-else class="label">{{ $t('h.o003') }}</div>
            <img :src="item.productImage" alt="">
            <div class="content">
              {{ item.productName }}
            </div>
            <div class="task-money">
              <p class="title">{{ $t('h.o004') }}</p>
              <p class="money">{{ website.supervisorName }} {{ item.transactionAmount }}</p>
            </div>
            <div class="hr"/>
            <div class="task-money">
              <p class="title">{{ $t('h.o005') }}</p>
              <p class="money">{{ website.supervisorName }} {{ item.commission }}</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab :title="$t('h.o002')">
        <div v-if="list.length<1" class="none">
          <img src="@/assets/images/icon/none.png" alt="">
        </div>
        <div v-else class="all-box">
          <div v-for="(item,index) in list" :key="index" class="card-item">
            <div v-if="item.orderStatus===0" class="label">{{ $t('h.o002') }}</div>
            <div v-else class="label">{{ $t('h.o003') }}</div>
            <img :src="item.productImage" alt="">
            <div class="content">
              {{ item.productName }}
            </div>
            <div class="task-money">
              <p class="title">{{ $t('h.o004') }}</p>
              <p class="money">{{ website.supervisorName }} {{ item.transactionAmount }}</p>
            </div>
            <div class="hr"/>
            <div class="task-money">
              <p class="title">{{ $t('h.o005') }}</p>
              <p class="money">{{ website.supervisorName }} {{ item.commission }}</p>
            </div>
          </div>
        </div>

      </van-tab>
      <van-tab :title="$t('h.o003')">
        <div v-if="list.length<1" class="none">
          <img src="@/assets/images/icon/none.png" alt="">
        </div>
        <div v-else class="all-box">
          <div v-for="(item,index) in list" :key="index" class="card-item">
            <div v-if="item.orderStatus===0" class="label">{{ $t('h.o002') }}</div>
            <div v-else class="label">{{ $t('h.o003') }}</div>
            <img :src="item.productImage" alt="">
            <div class="content">
              {{ item.productName }}
            </div>
            <div class="task-money">
              <p class="title">{{ $t('h.o004') }}</p>
              <p class="money">{{ website.supervisorName }} {{ item.transactionAmount }}</p>
            </div>
            <div class="hr"/>
            <div class="task-money">
              <p class="title">{{ $t('h.o005') }}</p>
              <p class="money">{{ website.supervisorName }} {{ item.commission }}</p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import {bookingList} from "@/api/apiFox";
import {decrypt} from "@/utils/AES";
import {getItem} from "@/utils/auth";
import {Toast} from "vant";
export default {
  components:{Header},
  data(){
    return{
      active:0,
      user:'',
      website:'',
      list:[],
      changeList:[]
    }
  },
  methods:{
    getOrderList(){
      // Toast.loading({forbidClick: true,});
      bookingList({username:this.user.username}).then(response=>{
        this.changeList=response
        this.list=response
      }).catch(err=>{
        // errorTips(err.msg)
      })
    }
  },

  watch:{
    active(newValue,oldValue){
      switch (newValue){
        case 0:{
          this.getOrderList()
          break
        }
        case 1:{
          // Toast.loading({forbidClick: true,});
          this.list= this.changeList.filter(value => {return value.orderStatus===0})
          break
        }
        case 2:{
          // Toast.loading({forbidClick: true,});
          this.list= this.changeList.filter(value => {return value.orderStatus===1})
          break
        }
      }

    }
  },

  mounted() {
    this.user= JSON.parse(decrypt(getItem('BaseUser')))
    this.website=getItem('website')
    this.getOrderList()
  }
}
</script>

<style scoped lang="scss">
.order-main{
  width: 100%;
  min-height: 100vh;
  .safe{
    width: 100%;
    height: 60px;
  }
  .header-nav{
    width: 100%;
    height: 40px;
    margin-top: 10px;
    box-sizing: border-box;
    display: flex;
    .header-box{
      height: 40px;
      padding: 5px 15px;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      justify-content: center;
      p{
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #999;
      }
      .active{
        color: #000;
      }
      span{
        padding: 0 15px;
        display: flex;
        height: 2px;
        background: #000000;
      }
    }
  }
  .all-box{
    width: 100%;
    min-height: 100vh;
    padding: 20px 2% 100px 2%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .card-item{
      width: 175px;
      margin-bottom: 10px;
      height: 350px;
      border-radius: 15px;
      background: #fff;
      position: relative;
      .label{
        width: 100px;
        height: 35px;
        background: #745DDD;
        position: absolute;
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 400;
        font-size: 14px;
      }
      img{
        width: 100%;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        height: 160px;
      }
      .content{
        width: 100%;
        padding:3% 5%;
        box-sizing: border-box;
        font-size: 14px;
        margin-bottom: 10px;
      }
      .hr{
        width: 100%;
        height: 1px;
        background: #f6f6f6;
        margin: 6px 0px;
      }
      .task-money{
        width: 100%;
        min-height: 40px;
        padding:0 3%;
        box-sizing: border-box;
        .title{
          width: 100%;
          color: #999;
          font-size: 14px;
          font-weight: 400;
        }
        .money{
          width: 100%;
          font-size: 16px;
          color: #000;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
.none{
  width: 100%;
  min-height: 60vh;
  img{width: 100%;}
}
</style>