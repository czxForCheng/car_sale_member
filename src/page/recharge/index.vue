<template>
  <div>
    <Headers></Headers>
    <div class="safe"/>
    <div class="hole">
      <div class="recharge-box">
        <div class="left">
            <p>{{ $t('h.r003') }}</p>
            <p>{{ $t('h.r002') }}</p>
        </div>
        <div class="right-box">
            <div class="box-card">
              <p>{{ $t('h.r001') }}</p>
              <p>{{ webkit.supervisorName }} {{ user.balanceMoney }}</p>
              <div class="box-tips">{{ $t('h.r002') }}</div>
              <div class="box-btn">
                <van-button  @click="recharge" block color="#fff"><span style="color: #000">{{ $t('h.r003') }}</span></van-button>
              </div>
            </div>
            <div class="title">
              <a @click="active=1" :class="{'active':active===1}" href="javascript:void (0)">
                {{ $t('h.r003') }}
              </a>
              <a @click="active=2" :class="{'active':active===2}"  href="javascript:void (0)">
                {{ $t('h.r005') }}
              </a>
            </div>

            <div v-if="active===1" class="box-nav-box">
                <div v-if="changeList.length<1" class="none">
                  <img src="@/assets/images/icon/none.png" alt="">
                </div>
                <div v-else class="item" v-for="(item,index) in changeList" :key="index">
                  <p class="title-item">
                    <span>{{ item.orderNo }}</span>
                    <span>{{ webkit.supervisorName }} {{ item.money }}</span>
                  </p>
                  <p  class="title-item-status">
                      <span class="status">{{ $t('h.r010') }}</span>
                  </p>
                  <div v-if="item.type===2" class="title-item-ramke">
                    <p>{{ $t('h.r009') }}: {{ item.handlingFee  }}</p>
                  </div>
                </div>
            </div>
            <div v-else class="box-nav-box">
              <div v-if="table.length<1" class="none">
                <img src="@/assets/images/icon/none.png" alt="">
              </div>
              <div v-else class="item" v-for="(item,index) in table" :key="index">
                <p class="title-item">
                  <span>{{ item.orderNo }}</span>
                  <span>{{ webkit.supervisorName }} {{ item.money }}</span>
                </p>
                <p  class="title-item-status">
                  <span class="status">{{ $t('h.r010') }}</span>
                </p>
                <div v-if="item.type===2" class="title-item-ramke">
                  <p>{{ $t('h.r009') }}: {{ item.handlingFee  }}</p>
                </div>
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
import {rechargeHistory} from "@/api/apiFox";
import {getItem} from "@/utils/auth";
import {decrypt} from "@/utils/AES";

export default {
  components:{Headers,Footer},
  data(){
    return{
      active:1,
      user:'',
      webkit:'',
      changeList:[],
      table:[]
    }
  },
  methods:{
    recharge(){
      const toast = Toast.loading({
        forbidClick: true,
        loadingType: 'spinner',
      });
      setTimeout(()=>{
        Toast.clear();
        this.$router.push('/chat')
      },1000)
    },
    getHistoryList(){
      rechargeHistory(this.user.id).then(res=>{
        this.list = res
        this.changeList = this.list.filter(value => {return value.type === 1 })
        this.table = this.list.filter(value => {return value.type === 0|| value.type ===2})
      }).catch(err=>{
        // errorTips(err.msg)
      })
    },
  },

  mounted() {
    this.webkit=getItem('website')
    this.user= JSON.parse(decrypt(getItem('BaseUser')))
    this.getHistoryList()
    console.log(this.user)
  }
}
</script>

<style scoped lang="scss">
.safe{
  width: 100%;
  height: 60px;
}
.hole{
  width: 100%;
  min-height: 100vh;
  background: #f8f8f8;
  background: url("@/assets/images/bgk_car.png") no-repeat 100%;
  background-position:left center;
  background-size: cover;
  display: flex;
  justify-content: center;
  .recharge-box{
    width: 1400px;
    padding: 60px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .left{
      width: 50%;
      padding: 100px 0 0 0;
      box-sizing: border-box;
      p:nth-child(1){
        width: 550px;
        font-weight: 600;
        font-size: 64px;
        color: #fff;
      }
      p:nth-child(2){
        margin-top: 30px;
        width: 550px;
        font-weight: 300;
        font-size: 18px;
        color: #fff;
      }
    }
    .right-box{
      width: 700px;
      min-height: 400px;
      background: #fff;
      border-radius: 6px;
      padding: 3%;
      box-sizing: border-box;
      position: relative;

      .box-card{
        width: 100%;
        height: 180px;
        border-radius: 8px;
        background: #000;
        padding: 3%;
        position: relative;
        box-sizing: border-box;
        p:nth-child(1){
          margin-top: 10px;
          font-size: 18px;
          color: #c8c8c8;
        }
        p:nth-child(2){
          font-size: 28px;
          margin-top: 10px;
          color: #fff;
        }
        .box-tips{
          margin-top: 20px;
          color: #f6f6f6;
          width: 100%;
          font-size: 14px;
        }
        .box-btn{
          width: 200px;
          height: 80px;
          top: 0;
          right: 30px;
          position: absolute;
          color: #000;
          box-sizing: border-box;
          margin-top: 20px;
        }
      }
      .title{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: left;
        margin-top: 30px;
        a{
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          margin-right: 10px;
          height: 35px;
          background: #fff;
          color: #000;
          border-radius: 5px;
          border: 1px solid #000;
        }
        .active{
          background: #000;
          color: #fff;
        }
      }
      ::-webkit-scrollbar{
        display: none;
      }
      .box-nav-box{
        width: 100%;
        height: 400px;
        overflow-y: scroll;
        .item{
          width: 100%;
          min-height: 100px;
          border-radius: 8px;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          padding: 3%;
          box-sizing: border-box;
          margin-bottom: 20px;
          .title-item{
            width: 100%;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
          }
          .title-item-status{
            width: 100%;
            margin-top: 20px;
            height: 30px;
            display: flex;
            justify-content: right;
            .status{
              display: flex;
              justify-content: center;
              align-items: center;
              height: 30px;
              width: 90px;
              background: #000;
              color: #fff;
              font-size: 12px;
            }
          }
          .title-item-ramke{
            width: 100%;
            margin-top: 5px;
            p{
              font-size: 14px;
              color: #B63036;
            }
            p:nth-child(2){
              margin-top: 5px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>