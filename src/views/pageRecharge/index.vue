<template>
  <div class="hole">
    <Header></Header>
    <div class="safe"/>
    <div class="recharge">
      <div class="recharge-box">
        <p class="title-recharge">{{ $t('h.r001') }}</p>
        <p class="title-recharge-money">{{ webkit.supervisorName }} {{ user.balanceMoney }}</p>
      </div>
      <div class="tips">{{ $t('h.r002') }}</div>
      <div class="recharge-button">
        <van-button round @click="recharge" block color="#ECAE37">{{ $t('h.r003') }}</van-button>
      </div>
      <div class="title">{{ $t('h.r004') }}</div>
      <div class="nav-list">
        <div class="nav-active">
          <div @click="active=1" class="nav" :class="{'active':active===1}">{{ $t('h.r003') }}</div>
          <div @click="active=2" class="nav" :class="{'active':active===2}">{{ $t('h.r005') }}</div>
        </div>
      </div>
      <div v-if="active===1" class="nav-box-first">
        <div v-if="changeList.length<1" class="none">
          <img src="@/assets/images/icon/none.png" alt="">
        </div>
        <div v-else class="item" v-for="(item,index) in changeList" :key="index">
          <p class="order">{{ $t('h.r006') }}：<span>{{ item.orderNo }}</span></p>
          <p class="order">{{ $t('h.r007') }}：<span class="money">{{ webkit.supervisorName }} {{ item.money }}</span></p>
          <p class="order">{{ $t('h.r008') }}：<span class="status success">{{ $t('h.r010') }}</span></p>
          <p class="order" v-if="item.type===2">{{ $t('h.r009') }}：<span class="money">{{ item.handlingFee }}</span></p>
        </div>

      </div>
      <div v-else class="nav-box-first">
        <div v-if="table.length<1" class="none">
          <img src="@/assets/images/icon/none.png" alt="">
        </div>
        <div v-else class="item" v-for="(item,index) in table" :key="index">
          <p class="order">{{ $t('h.r006') }}：<span>{{ item.orderNo }}</span></p>
          <p class="order">{{ $t('h.r007') }}：<span class="money">{{ webkit.supervisorName }} {{ item.money }}</span></p>
          <p class="order">{{ $t('h.r008') }}：<span class="status success">{{ $t('h.r010') }}</span></p>
          <p class="order" v-if="item.type===2">{{ $t('h.r009') }}：<span class="money">{{ item.handlingFee }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import {decrypt} from "@/utils/AES";
import {getItem} from "@/utils/auth";
import {Toast} from "vant";
import {rechargeHistory} from "@/api/apiFox";

export default {
  components:{Header},
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
.hole{
  width: 100%;
  min-height: 100vh;
  background: #fff;
}
.none{
  width: 100%;
  min-height: 60vh;
  img{width: 100%;}
}
.safe{
  width: 100%;
  height: 60px;
}
.recharge{
  width: 100%;
  min-height: 100vh;
  padding: 3%;
  box-sizing: border-box;
  .recharge-box{
    width: 100%;
    height: 100px;
    background: #ECAE37;
    border-radius: 15px;
    padding: 5%;
    box-sizing: border-box;
    .title-recharge{
      width: 100%;
      height: 20px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(255,255,255,0.8);
    }
    .title-recharge-money{
      width: 100%;
      height: 100px;
      color: #fff;
      margin-top: 5px;
    }
  }
  .tips{
    margin-top: 15px;
    padding: 0 2%;
    box-sizing: border-box;
    width: 100%;
    color: #333;
    font-size: 14px;
  }
  .recharge-button{
    width: 100%;
    margin-top: 20px;
  }
  .title{
    font-size: 18px;
    color: #333;
    margin-top: 30px;
  }
  .nav-list{
    width: 100%;
    display: flex;
    justify-content: center;
    .nav-active{
      width: 200px;
      height: 30px;
      border-radius: 30px;
      margin-top: 20px;
      display: flex;
      border: 1px solid #999;

      .nav{
        width: 100px;
        height: 30px;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        border-radius: 30px;
      }
      .active{
        color: #fff;
        background: #000;
      }
    }
  }
  .nav-box-first{
    width: 100%;
    min-height: 200px;
    margin-top: 20px;
    background: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    padding: 3%;
    box-sizing: border-box;
    .item:last-child{
      border-bottom: none;
    }
    .item{
      width: 100%;
      min-height: 100px;
      border-bottom: 1px solid #f6f6f6;
      .order{
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        .money{
          color: #F56C6C;
          font-weight: 600;
        }
        .status{
          display: flex;
          width: 80px;
          height: 30px;
          justify-content: center;
          align-items: center;
          border-radius: 30px;
          background: #F56C6C;
          color: #fff;
        }
        .success{
          background: #67C23A;
        }
      }
    }
  }

}
</style>