<template>
  <div>
    <div class="hole">
      <Headers></Headers>
      <div class="safe"/>
      <div class="hole-center">
        <div class="center">
          <div class="login-hole">
            <div class="title">{{ $t('h.L001') }}</div>
            <div class="form">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item :label="$t('h.L002')" prop="username">
                  <el-input  @keyup.enter.native="submitForm('ruleForm')" v-model.number="ruleForm.username" :placeholder="$t('h.L003')"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: -10px" :label="$t('h.L004')" prop="password">
                  <el-input @keyup.enter.native="submitForm('ruleForm')" v-model.number="ruleForm.password" show-password :placeholder="$t('h.L005')"></el-input>
                </el-form-item>
                <el-form-item >
                  <div @click="submitForm('ruleForm')"  class="submit">{{ $t('h.L001') }}</div>
                  <!--          <van-button @click="submitForm('ruleForm')" color="#002FFF" block type="primary">登录</van-button>-->
                </el-form-item>
              </el-form>
            </div>
            <div class="form-tips">
              {{ $t('h.L006') }}？<a @click="goRegister" href="javascript:void (0)">{{ $t('h.L007') }}</a>
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
      ruleForm: {username: '', password: '', },
      rules:{
        username: [{ required: true, message: this.$t('h.L003'), trigger: 'blur' }],
        password: [{ required: true, message:this.$t('h.L005'), trigger: 'blur' }],
      }
    }
  },
  methods:{
    goRegister(){
      this.$router.push('/reg')
    },
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('loginSetToken',this.ruleForm).then(res=>{
            setTimeout(()=>{
              this.$store.dispatch('getUserList',res.id).then(res=>{
                Toast.loading({forbidClick: true});
                setTimeout(()=>{
                  this.$router.push('/')
                },1500)
              }).catch(err=>{})
              connectSocket(res.id)
            },500)
          }).catch(err=>{
            console.log(err)
          })
        } else {
          return false;
        }
      })
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
      height: 450px;
      background: #fff;
      .login-hole{
        width: 100%;
        height: 80vh;
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