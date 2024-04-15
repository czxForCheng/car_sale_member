<template>
  <div class="security-main">
    <Header></Header>
    <div class="safe"/>
    <div class="wallet-info">
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
              <van-button @click="updatePwd" :disabled="form.configPassword !== form.password || form.configPassword ===''"  block round color="#ecae38">{{ $t('h.s019') }}</van-button>
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
              <van-button @click="updatePwd" :disabled="form.configPassword !== form.password || form.configPassword ===''"  block round color="#ecae38">{{ $t('h.s019') }}</van-button>
            </div>
          </div>
        </van-tab>
      </van-tabs>


    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header/index.vue";
  import {decrypt} from "@/utils/AES";
  import {getItem} from "@/utils/auth";
  import {Toast} from "vant";
  import {updatePassword} from "@/api/apiFox";

  export default {
    components:{Header},
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
.security-main{
  width: 100%;
  min-height: 100vh;
  background: #fff;
  .safe{
    width: 100%;
    height: 60px;
  }
  .wallet-info{
    width: 100%;
    min-height: 400px;
    padding: 3%;
    box-sizing: border-box;
    .title-wallet{
      width: 100%;
      height: 80px;
      color: #000;
      font-size: 24px;
      font-weight: 300;
      line-height: 80px;
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
    }
    .none-border{
      border: none;
      width: 100%;
      padding: 0;
      margin-top: 20px;
    }
  }
}

</style>