<template>
  <div>
    <Headers></Headers>
    <div class="safe"/>
    <div class="hole">
      <div class="recharge-box">
        <div class="left">
          <p>{{ $t('h.s014') }}</p>
          <p>{{ $t('h.A0015') }}</p>
        </div>
        <div class="right-box">
          <div class="title-wallet">{{ $t('h.s014') }}</div>
          <van-tabs color="#000" v-model="active">
            <van-tab :title="$t('h.R023')">
              <div class="card">
                <div class="input-label">
                  <input type="text" v-model="form.oldPassword" :placeholder="$t('h.s018')">
                </div>

                <div class="input-label">
                  <input v-model="form.password" :type="!isPwd ? 'password':'text' " :placeholder="$t('h.w004')">
                  <a @click="isPwd=false" v-if="isPwd" href="javascript:void (0)"><van-icon name="eye-o" /></a>
                  <a @click="isPwd=true" v-else href="javascript:void (0)"><van-icon name="closed-eye" /></a>
                </div>

                <div class="input-label">
                  <input v-model="form.configPassword" :type="!checkedPwd ? 'password':'text' " :placeholder="$t('h.w005')">
                  <a @click="checkedPwd=false" v-if="checkedPwd" href="javascript:void (0)"><van-icon name="eye-o" /></a>
                  <a @click="checkedPwd=true" v-else href="javascript:void (0)"><van-icon name="closed-eye" /></a>
                </div>

                <div class="input-label none-border">
                  <van-button @click="updatePwd" :disabled="form.configPassword !== form.password || form.configPassword ===''"  block round color="#000">{{ $t('h.s019') }}</van-button>
                </div>
              </div>

            </van-tab>
            <van-tab :title="$t('h.R024')">
              <div class="card">
                <div class="input-label">
                  <input v-model="form.oldPassword" type="text" :placeholder="$t('h.s018')">
                </div>

                <div class="input-label">
                  <input v-model="form.password"  :type="!isPwd ? 'password':'text' " :placeholder="$t('h.w004')">
                  <a @click="isPwd=false" v-if="isPwd" href="javascript:void (0)"><van-icon name="eye-o" /></a>
                  <a @click="isPwd=true" v-else href="javascript:void (0)"><van-icon name="closed-eye" /></a>
                </div>

                <div class="input-label">
                  <input v-model="form.configPassword" :type="!checkedPwd ? 'password':'text' " :placeholder="$t('h.w005')">
                  <a @click="checkedPwd=false" v-if="checkedPwd" href="javascript:void (0)"><van-icon name="eye-o" /></a>
                  <a @click="checkedPwd=true" v-else href="javascript:void (0)"><van-icon name="closed-eye" /></a>
                </div>

                <div class="input-label none-border">
                  <van-button @click="updatePwd" :disabled="form.configPassword !== form.password || form.configPassword ===''"  block round color="#000">{{ $t('h.s019') }}</van-button>
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
import {updatePassword} from "@/api/apiFox";
import {decrypt} from "@/utils/AES";
import {getItem} from "@/utils/auth";


export default {
  components:{Headers,Footer},
  data(){
    return{
      active:0,
      checkedPwd:false,
      isPwd:false,
      isDisabled:true,
      userInfo:'',
      form:{password:'',oldPassword:'',configPassword:''},
    }
  },
  methods:{
    getUserMessage(){
      this.$store.dispatch('getUserList',this.userInfo.id).then(res=>{
        this.user=res
      })
    },
    updatePwd(){
      let form = {
        userId:this.userInfo.id,
        type:this.active,
        oldPwd:this.form.oldPassword,
        newPwd:this.form.password,
        rePwd:this.form.configPassword
      }

      if(form.type === 0) {
        const reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
        if(!reg.test(form.newPwd)) {
          Toast(this.$t('h.R025'))
          return
        }
      }else{
        if(form.newPwd.length < 6) {
          Toast(this.$t('h.R026'))
          return
        }
      }
      updatePassword(form).then(res=>{
        Toast.success(this.$t('h.R027'))
        if(this.active===0){
          this.$store.dispatch('removeLoginStatus')
          location.reload()
          this.form = {password:'',oldPassword:'',configPassword:''}
        }else{
          this.form = {password:'',oldPassword:'',configPassword:''}
        }
      }).catch(er=>{

      })
    }
  },
  watch:{
    active(newValue,oldValue){
      if (newValue){
        this.form={password:'',oldPassword:'',configPassword:''}
      }
    }
  },
  mounted() {
    this.userInfo=JSON.parse(decrypt(getItem('BaseUser')))
    this.form.userId=this.userInfo.id
    // this.getUserMessage()
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
      width: 600px;
      height: 500px;
      background: #fff;
      border-radius: 6px;
      padding: 3%;
      box-sizing: border-box;
      position: relative;
      .title-wallet{
        width: 100%;
        height: 50px;
        color: #000;
        font-size: 24px;
        font-weight: 600;


      }
      .card{
        margin: 20px 0;
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
        input{
          height: 45px;
          width: 100%;
          font-size: 14px;
        }
        a{
          font-size: 18px;
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

</style>