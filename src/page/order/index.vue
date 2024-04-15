<template>
  <div>
    <Headers></Headers>
    <div class="safe"/>
    <div class="order-main">
      <div class="center-main-center">
        <div class="header-order">
          <van-tabs v-model="active" background="#fff" color="#000" title-active-color="#000" title-inactive-color="#999" ellipsis sticky>
            <van-tab :title="$t('h.o001')">

              <div  class="card-home">
                <div v-if="list.length<1" class="none">
                  <img src="@/assets/images/icon/none.png" alt="">
                </div>
                <div v-else  v-for="(item,index) in list" :key="index" class="all-box">
                    <img :src="item.productImage" alt="">
                    <div class="center">
                      <p class="title">{{ item.productName }}</p>
                      <div class="contents">
                        <div class="font">
                          <p>{{ $t('h.o004') }}</p>
                          <p>{{ website.supervisorName }} {{ item.transactionAmount }}</p>
                        </div>
                        <div class="font">
                          <p>{{ $t('h.o005') }}</p>
                          <p>{{ website.supervisorName }} {{ item.commission }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="right">
                      <a v-if="item.orderStatus===0" @click="toTask(item)" href="javascript:void (0)" style="display: flex" class="status">{{$t('h.h011')}}</a>
                      <div  v-if="item.orderStatus===0" class="status">{{ $t('h.o002') }}</div>
                      <div v-else  class="status">{{ $t('h.o003') }}</div>
                    </div>
                  </div>
              </div>
            </van-tab>
            <van-tab :title="$t('h.o002')">
              <div  class="card-home">
                <div v-if="list.length<1" class="none">
                  <img src="@/assets/images/icon/none.png" alt="">
                </div>
                <div v-else  v-for="(item,index) in list" :key="index" class="all-box">
                  <img :src="item.productImage" alt="">
                  <div class="center">
                    <p class="title">{{ item.productName }}</p>
                    <div class="contents">
                      <div class="font">
                        <p>{{ $t('h.o004') }}</p>
                        <p>{{ website.supervisorName }} {{ item.transactionAmount }}</p>
                      </div>
                      <div class="font">
                        <p>{{ $t('h.o005') }}</p>
                        <p>{{ website.supervisorName }} {{ item.commission }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <a href="javascript:void (0)"  @click="toTask(item)" class="status">{{$t('h.h011')}}</a>
                    <div  v-if="item.orderStatus===0" class="status">{{ $t('h.o002') }}</div>
                    <div v-else  class="status">{{ $t('h.o003') }}</div>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab :title="$t('h.o003')">
              <div  class="card-home">
                <div v-if="list.length<1" class="none ">
                  <img src="@/assets/images/icon/none.png" alt="">
                </div>
                <div v-else  v-for="(item,index) in list" :key="index" class="all-box">
                  <img :src="item.productImage" alt="">
                  <div class="center">
                    <p class="title">{{ item.productName }}</p>
                    <div class="contents">
                      <div class="font">
                        <p>{{ $t('h.o004') }}</p>
                        <p>{{ website.supervisorName }} {{ item.transactionAmount }}</p>
                      </div>
                      <div class="font">
                        <p>{{ $t('h.o005') }}</p>
                        <p>{{ website.supervisorName }} {{ item.commission }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <div  v-if="item.orderStatus===0" class="status">{{ $t('h.o002') }}</div>
                    <div v-else  class="status">{{ $t('h.o003') }}</div>

                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
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
import {bookingList} from "@/api/apiFox";
import {decrypt} from "@/utils/AES";
import {getItem, setItem} from "@/utils/auth";
export default{
  components:{Headers,Footer},
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
    },
    toTask(item){
      console.log(item)
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: 'spinner',
      });

      const timer = setInterval(() => {
        clearInterval(timer);
        Toast.clear();

        // sessionStorage.setItem('order',JSON.stringify(item))
        setItem('order',item)
        // this.$router.push('/deal')
        this.$router.push({path:'/deal',query:{value:1}})
      }, 1000);
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
.safe{
  width: 100%;
  height: 60px;
}
.order-main{
  background: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  .center-main-center{
    width: 1200px;
    padding: 60px 0 ;
    .header-order{
      width:300px;
      ::-webkit-scrollbar{
        display: none;
      }
      .card-home{
        width: 1200px;
        height: 650px;
        margin-top: 50px;
        overflow-y: scroll;
        .all-box{
          width: 100%;
          height: 176px;
          background: #FFFFFF;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          display: flex;
          align-items: center;
          padding: 0 3%;
          box-sizing: border-box;
          img{
            width: 150px;
            height: 150px;
            border-radius: 5px;
          }
          .center{
            width: 100%;
            height: 176px;
            padding: 30px 2%;
            box-sizing: border-box;
            .title{
              height: 60px;
              font-size: 16px;
              text-indent: 30px;
            }
            .contents{
              width: 100%;
              height: 70px;
              display: flex;
              .font{
                width: 150px;
                height: 70px;
                padding: 10px 0;
                box-sizing: border-box;
                margin-right: 30px;
                p:nth-child(1){
                  font-size: 16px;
                  width: 100%;
                  margin-top: 5px;
                  text-align: center;
                  color: #5a5a5a;
                }
                p:nth-child(2){
                  width: 100%;
                  font-size: 20px;
                  text-align: center;
                  margin-top: 10px;
                  color: #000;
                }
              }
            }
          }
          .right{
            width: 300px;
            display: flex;
            height: 176px;
            padding: 20px 0;
            box-sizing: border-box;
            justify-content: right;
            a{
              display: flex;
              justify-content: center;
              margin-right: 10px;
              align-items: center;
            }
            .status{
              width: 100%;
              height: 35px;
              border-radius: 5px;
              background: #000;
              color: #fff;
              text-align: center;
              font-size: 12px;
              line-height: 35px;
              max-width: 100px;
            }
          }
        }
      }
    }
  }
}
</style>