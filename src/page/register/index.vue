<template>
  <div>
    <div class="hole">
      <Headers></Headers>
      <div class="safe"/>
      <div class="hole-center">
        <div class="center">
          <div class="login-hole">
            <div class="title">{{ $t('h.R001') }}</div>
            <div class="form">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item style="margin-top: -15px" :label="$t('h.R002')" prop="mobile">
                  <el-input @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.mobile" :placeholder="$t('h.R012')"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: -15px" :label="$t('h.R003')" prop="username">
                  <el-input @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.username" :placeholder="$t('h.R013')"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: -15px" :label="$t('h.L004')" prop="password">
                  <el-input @keyup.enter.native="submitForm('ruleForm')" show-password type="password" v-model="ruleForm.password"  :placeholder="$t('h.L005')" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: -15px" :label="$t('h.R004')" prop="passwordConf">
                  <el-input @keyup.enter.native="submitForm('ruleForm')" show-password type="password"  :placeholder="$t('h.R005')" v-model="ruleForm.passwordConf" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: -15px" :label="$t('h.R006')" prop="inviteCode">
                  <el-input @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.inviteCode" :placeholder="$t('h.R007')"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: -15px" :label="$t('h.R008')" prop="mailbox">
                  <el-input @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.mailbox" :placeholder="$t('h.R009')"></el-input>
                </el-form-item>
                <el-form-item >
                  <div @click="submitForm('ruleForm')"  class="submit">{{ $t('h.R001') }}</div>
                  <!--          <van-button @click="submitForm('ruleForm')" color="#002FFF" block type="primary">登录</van-button>-->
                </el-form-item>
              </el-form>
            </div>
            <div class="form-tips">
              {{ $t('h.R010') }}？<a @click="goLogin" href="javascript:void (0)">{{ $t('h.R011') }}</a>
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
import {connectSocket} from "@/utils/scoket";
import {Toast} from "vant";

export default {
  components:{Headers,Footer},
  data(){
    return{
      isCLose:false,
      ruleForm: {username: '', mobile: '', password: '', passwordConf: '', inviteCode: '',mailbox:''},
      rules:{
        username: [{ required: true, message: this.$t('h.R012'), trigger: 'blur' }],
        mobile: [{ required: true, message: this.$t('h.R013'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('h.L005'), trigger: 'blur' }],
        passwordConf: [{ required: true, message: this.$t('h.R005'), trigger: 'blur' }],
        inviteCode: [{ required: true, message: this.$t('h.R007'), trigger: 'blur' }],
        mailbox: [{ required: true, message: this.$t('h.R009'), trigger: 'blur' }],
      }
    }
  },
  methods:{
    goLogin(){
      this.$router.push('/login')
    },
    submitForm(formName) {
      let pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$/;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!pattern.test(this.ruleForm.inviteCode)){
            Toast(this.$t('h.R014'))
          }else{
            this.$store.dispatch('registertSet',this.ruleForm).then(res=>{
              setTimeout(()=>{
                this.$store.dispatch('getUserList',res.id).then(res=>{
                  Toast.loading({forbidClick: true});
                  setTimeout(()=>{
                    this.$router.push('/')
                  },1500)
                }).catch(err=>{})
                connectSocket(res.id)
              },1000)
            }).catch(err=>{})
          }
        } else {
          return false;
        }
      })
    }
  },
  mounted() {
    if (this.$route.query){
      this.ruleForm.inviteCode = this.$route.query.code
    }else{
      this.ruleForm.inviteCode =''
    }
  }
}
</script>

<style scoped lang="scss">
.hole{
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
  background-position:left center;
  background-size: cover;
  .safe{
    width: 100%;
    height: 60px;
  }
  .hole-center{
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .center{
      width: 550px;
      border-radius: 10px;
      min-height: 450px;
      background: #fff;
      ::-webkit-scrollbar{
        display: none;
      }
      .login-hole{
        width: 100%;
        height: 80vh;
        overflow-y: scroll;
        padding: 5%;
        box-sizing: border-box;
        .login-header{
          width: 100%;
          height: 40px;
          background: #fff;
          font-size: 24px;
          display: flex;
          justify-content: space-between;

          box-sizing: border-box;
          img{
            height: 22px;
          }
        }
        .title{
          width: 100%;
          margin-top: 10px;
          font-weight: 600;
          font-size: 28px;
        }
        .login-method{
          width: 100%;
          margin-top: 20px;
          display: flex;
          .box{
            padding: 8px 30px;
            background: #eee;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #333;
            border-radius: 5px;
            margin-right: 15px;
          }
          .active{
            background: #002FFF;
            color: #fff;
          }
        }
        .form{
          width: 100%;
          margin-top: 20px;
          margin-bottom: 20px;
          .submit{
            width: 100%;
            display: block;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            text-align: center;
            color: #fff;
            background: #002FFF;
            border-radius: 5px;
          }
        }
        .form-tips{
          width: 100%;
          font-size: 14px;
          text-align: center;
          a{
            font-size: 14px;
            color: #4aa8ff;
          }
        }

      }
    }
  }
}
</style>