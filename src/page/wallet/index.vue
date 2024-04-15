<template>
  <div>
    <Headers></Headers>
    <div class="safe"/>
    <div class="hole">
      <div class="recharge-box">
        <div class="left">
          <p>{{ $t('h.w007') }}</p>
          <p>{{ $t('h.A0014') }}</p>
        </div>
        <div class="right-box">
          <div class="wallet-info">
            <div class="title-wallet">{{ $t('h.w007') }}</div>
            <div class="input-label">
              <input v-if="isChange" type="text" v-model="form.walletAddress" :placeholder="$t('h.w008')">
              <span v-else>{{form.walletAddress}}</span>
            </div>
            <div v-if="isChange" class="input-label">
              <input v-model="form.tradingPwd" :type="!isPwd ? 'password':'text' " :placeholder="$t('h.w005')">
              <a @click="isPwd=false" v-if="isPwd" href="javascript:void (0)"><van-icon name="eye-o" /></a>
              <a @click="isPwd=true" v-else href="javascript:void (0)"><van-icon name="closed-eye" /></a>
            </div>

            <div  v-if="isChange" class="input-label">
              <input v-model="form.reTradingPwd" :type="!checkedPwd ? 'password':'text' " :placeholder="$t('h.w009')">
              <a @click="checkedPwd=false" v-if="checkedPwd" href="javascript:void (0)"><van-icon name="eye-o" /></a>
              <a @click="checkedPwd=true" v-else href="javascript:void (0)"><van-icon name="closed-eye" /></a>
            </div>

            <div  v-if="isChange" class="input-label none-border">
              <van-button @click="saveWallet" block  color="#000">{{ $t('h.w010') }}</van-button>
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
  import {improveWallet} from "@/api/apiFox";
  import {decrypt} from "@/utils/AES";
  import {getItem} from "@/utils/auth";

  export default {
    components:{Headers,Footer},
    data(){
      return{
        isPwd:false,
        checkedPwd:false,
        isChange:false,
        userInfo:'',
        form:{walletAddress:'',tradingPwd:'',reTradingPwd:'',userId:''}
      }
    },
    methods:{
      saveWallet(){
        let pattern = /^\d{6,}$/;
        if (this.form.walletAddress === ''){
          Toast(this.$t('h.w008'))
        }else if (this.form.tradingPwd==='' || this.form.reTradingPwd===''){
          Toast(this.$t('h.w005'))
        }else if (!pattern.test(this.form.tradingPwd)){
          Toast(this.$t('h.w022'))
        } else{
          if (this.form.tradingPwd!== this.form.reTradingPwd){
            Toast(this.$t('h.w023'))
          }else{
            improveWallet(this.form).then(res=>{
              Toast.success(this.$t('h.w024'))
              this.getUserMessage()
              this.isChange=false
            }).catch(err=>{

            })
          }
        }
      },
      getUserMessage(){
        this.$store.dispatch('getUserList',this.userInfo.id).then(res=>{
          this.user=res
          if (res.walletAddress){
            this.isChange=false
            this.form.walletAddress=res.walletAddress
          }else{
            this.isChange=true
          }
        })
      }
    },

    mounted() {
      this.userInfo=JSON.parse(decrypt(getItem('BaseUser')))
      this.form.userId=this.userInfo.id

      this.getUserMessage()
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
  .recharge-box {
    width: 1300px;
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
      height: 500px;
      background: #fff;
      border-radius: 6px;
      padding: 3%;
      box-sizing: border-box;
      position: relative;
      .wallet-info{
        width: 100%;
        min-height: 400px;
        padding: 3%;
        box-sizing: border-box;
        .title-wallet{
          width: 100%;
          height: 100px;
          color: #000;
          font-size: 24px;
          font-weight: 300;
          line-height: 80px;
        }
        .input-label{
          width: 100%;
          height: 45px;
          border: 1px solid #8d8d8d;
          border-radius: 5px;
          padding: 0 3%;
          margin-bottom: 20px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          span{
            font-size: 12px;
          }
          input{
            height: 45px;
            width: 100%;
            font-size: 14px;
          }
          a{
            font-size: 22px;
          }
        }
        .none-border{
          border: none;
          width: 100%;
          padding: 0;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>