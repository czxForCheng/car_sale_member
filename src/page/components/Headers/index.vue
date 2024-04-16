<template>
  <div class="header-index-style">
    <div class="header-center">
      <img @click="stepNewRouter('/')" class="logo" :src="logo ? logo.websiteBigLogo : null" alt="">
      <div  class="center-header">
        <div v-if="isShow" class="btn-nav-list">
          <div class="item">
            <a @click="stepNewRouter('/')"  href="javascript:void (0)">{{ $t('h.s003') }}</a>
          </div>
          <div class="item">
            <a href="javascript:void (0)">{{ $t('h.A0011') }} <i class="el-icon-caret-bottom"></i></a>
            <div class="item-nav">
              <a @click="stepNewRouter('/faqs',{status:1})"  class="nav" href="javascript:void (0)">
                <img src="@/assets/images/icon/icon_cret.png" alt="">
                <span>{{ $t('h.s004') }}</span>
              </a>
              <a @click="stepNewRouter('/faqs',{status:2})"  class="nav" href="javascript:void (0)">
                <img src="@/assets/images/icon/icon_tc.png" alt="">
                <span>{{ $t('h.s005') }}</span>
              </a>
              <a @click="stepNewRouter('/faqs',{status:3})"  class="nav" href="javascript:void (0)">
                <img src="@/assets/images/icon/icon_faqs.png" alt="">
                <span>{{ $t('h.s006') }}</span>
              </a>
              <a @click="stepNewRouter('/faqs',{status:4})"  class="nav" href="javascript:void (0)">
                <img src="@/assets/images/icon/icon_email.png" alt="">
                <span>{{ $t('h.s007') }}</span>
              </a>
              <a @click="stepNewRouter('/faqs',{status:5})"  class="nav" href="javascript:void (0)">
                <img src="@/assets/images/icon/icon_desc.png" alt="">
                <span>{{ $t('h.s008') }}</span>
              </a>
            </div>
          </div>
          <div class="item">
            <a href="javascript:void (0)">{{ $t('h.A0012') }} <i class="el-icon-caret-bottom"></i></a>
            <div class="item-nav">
              <a class="nav" @click="stepNewRouter('/task')" href="javascript:void (0)"><img src="@/assets/images/icon/icon_tast.png"
                                                                                             alt=""><span>{{ $t('h.s009') }}</span></a>
              <a class="nav" @click="stepNewRouter('/order')" href="javascript:void (0)"><img src="@/assets/images/icon/icon_orders.png"
                                                                                              alt=""><span>{{ $t('h.s010') }}</span></a>
              <a class="nav"  @click="stepNewRouter('/recharge')" href="javascript:void (0)"><img src="@/assets/images/icon/icon_recharge.png"
                                                                                                  alt=""><span>{{ $t('h.s011') }}</span></a>
              <a class="nav" @click="stepNewRouter('/withdraw')" href="javascript:void (0)"><img src="@/assets/images/icon/icon_withdraw.png"
                                                                                                 alt=""><span>{{ $t('h.s012') }}</span></a>
              <a class="nav" @click="stepNewRouter('/wallet')" href="javascript:void (0)"><img src="@/assets/images/icon/icon_wallet.png"
                                                                                               alt=""><span>{{ $t('h.s013') }}</span></a>
            </div>
          </div>
          <div class="item">
            <a href="javascript:void (0)">{{ $t('h.A0013') }} <i class="el-icon-caret-bottom"></i></a>
            <div class="item-nav">
              <a class="nav" @click="stepNewRouter('/security')"  href="javascript:void (0)"><img src="@/assets/images/icon/icon_security.png"
                                                                                                  alt=""><span>{{ $t('h.s014') }}</span></a>
              <a class="nav" @click="stepNewRouter('/invitation')" href="javascript:void (0)"><img src="@/assets/images/icon/icon_invitation.png" alt=""><span>{{
                  $t('h.s015')
                }}</span></a>
              <a class="nav"  @click="stepNewRouter('/chat')" href="javascript:void (0)"><img src="@/assets/images/icon/icon_service.png"
                                                                                              alt=""><span>{{ $t('h.s016') }}</span></a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isShow" class="btn-right-login">
        <a class="avatar-img" href="javascript:void (0)">
          <img src="@/assets/images/login.png" alt="">
          {{ base.username || '' }}
          <i class="el-icon-caret-bottom"></i>
        </a>
        <div class="item-avatar">
          <div class="avatar-top">
            <img v-if="base.avatar" :src="base.avatar" alt="">
            <img v-else src="@/assets/images/avatar.png" alt="">
            <div class="right">
              <p>{{ base.username || '' }}</p>
              <p>
                {{ $t('h.s002') }}：{{ base.inviteCode  || ''}}
                <a href="javascript:void (0)"><img @click="oncopy" src="@/assets/images/icon/icon_copy.png" alt=""></a>
              </p>
            </div>
          </div>
          <div class="btn-list">
            <div class="box">
              {{ $t('h.A0010') }}: {{ base.creditScore }}%  <img v-if="base.userLevelImg" :src="base.userLevelImg" alt="">
            </div>
          </div>
          <div class="avatar-list">
            <div class="item">
              <p>{{ base.balanceMoney || 0 }}</p>
              <p> {{ $t('h.h006') }}</p>
            </div>
            <div class="item">
              <p>{{ base.commissionMoney || 0 }}</p>
              <p>{{ $t('h.h007') }}</p>
            </div>
          </div>
          <div class="btn-login">
            <a @click="removeLogin" href="javascript:void (0)">
              <img src="@/assets/images/icon/icon_logout.png" alt="">
              {{ $t('h.s017') }}
            </a>
          </div>
        </div>
      </div>
      <Language></Language>
    </div>
  </div>
</template>

<script>
import Language from "@/page/components/languages/index.vue";
import {Toast} from "vant";
import {leaveLogin} from "@/api/apiFox";
import {closeSocketWs} from "@/utils/scoket";
import {getItem} from "@/utils/auth";
import {decrypt} from "@/utils/AES";

export default {
  components: {Language},
  data() {
    return {
      show: false,
      activeName: '2',
      base:'',
      isShow:true,
      logo:''
    };
  },
  methods:{
    stepNewRouter(path,item){
      this.$router.push({path:path,query:item}).catch(err=>{})
      if (item){
        this.$bus.$emit('faqsChangePc',item)
      }
      this.closeSider()
    },
    oncopy() {
      let s = location.origin+'/reg?code='+this.base.inviteCode
      this.$copyText(s).then(
          e => {
            Toast({
              position: 'top',
              message: this.$t('h.R015')
            })
          },
          e => {
            console.log('error：', e);
          }
      )
    },
    removeLogin(){
      leaveLogin().then(res=>{}).catch(err=>{})
      this.$store.dispatch('removeLoginStatus')
      location.reload()
      closeSocketWs()
      // this.$router.push('/login').catch(err=>{})
    }
  },
  mounted() {
    if (getItem('admin')){
      this.base=JSON.parse(decrypt(this.$store.state.User))
      console.log(this.base)
    }
    /login|reg/.test(this.$route.path) ? this.isShow=false :this.isShow=true
    this.logo=getItem('website')
  },
  watch: {
    '$route'(to,from){
      if (to.path==='/login' || to.path==='/reg'){
        this.isShow=false
      }else{
        this.isShow=true
      }
    },
    deep: true,
    immediate: true,
  },
}
</script>

<style scoped lang="scss">
.header-index-style {
  width: 100%;
  height: 60px;
  background: #000;
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 999;
  top: 0;

  .header-center {
    width: 1300px;
    height: 60px;
    display: flex;
    align-items: center;
    .logo {
      height: 35px;
    }
    .center-header{
      width: 1400px;
      display: flex;
      .btn-nav-list {
        width: 600px;
        height: 60px;
        display: flex;
        align-items: center;

        .item {
          width: 140px;
          height: 60px;
          font-size: 16px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;

          a {
            font-family: Radikal, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, Roboto, sans-serif;
            color: #fff;
          }
          ::-webkit-scrollbar{
            display: none;
          }
          .item-nav {
            min-width: 160px;
            top: 60px;
            min-height: 100px;
            background: #000;
            position: absolute;
            display: none;
            padding: 0 20px;
            box-sizing: border-box;

            .nav {
              display: flex;
              width: 100%;
              height: 45px;
              justify-content: center;
              align-items: center;
              border-bottom: 1px solid #171717;
              font-size: 14px;

              img {
                height: 20px;
                margin-right: 10px;
              }

              span {
                display: flex;
                min-width: 90%;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              span:hover {
                text-decoration-line: underline;
                text-decoration-color: #fff; /* 红色 */
              }
            }
          }
        }

        .item:hover {
          .item-nav {
            transition: 0.3s;
            display: block;
          }
        }
      }

      .btn-right-lang {
        a {
          font-size: 14px;

          img {
            height: 20px;
          }
        }
      }
    }
    .btn-right-login {
      width: 200px;
      height: 60px;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 14px;

      .avatar-img {
        margin-right: 5px;
        color: #fff;
        font-size: 16px;
        display: flex;
        height: 60px;
        align-items: center;
        font-weight: 300;

        img {
          margin-right: 10px;
          height: 30px;
        }
      }

      .item-avatar{
        width: 350px;
        min-height: 250px;
        background: #000;
        position: absolute;
        top: 60px;
        box-sizing: border-box;
        padding: 30px 20px 0 20px;
        display: none;
        .avatar-top{
          width: 100%;
          height: 60px;
          display: flex;

          img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .right{
            width: 100%;
            height: 40px;
            padding:0 4%;
            box-sizing: border-box;
            p:nth-child(1){
              font-size: 18px;
              margin-top: 5px;
              font-weight: 400;
            }
            p:nth-child(2){
              font-size: 14px;
              font-weight: 400;
              color: #999;
              margin-top: 5px;
              display: flex;
              height: 20px;
              width: 100%;

              a{
                margin-left: 10px;
                img{
                  height: 16px;
                  width: 16px;
                }
              }
            }
          }
        }
        .btn-list{
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          .box{
            padding: 5px 10px;
            background: #745DDD;
            border-radius: 4px 4px 4px 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            img{
              margin-left: 10px;
              height: 20px;
            }
          }
        }
        .avatar-list{
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item{
            width: 150px;
            height: 60px;
            background: #fff;
            border-radius: 6px;
            padding: 3%;
            box-sizing: border-box;
            p:nth-child(1){
              font-size: 16px;
              margin-top: 5px;
              margin-bottom: 5px;
              color: #333;
            }
            p:nth-child(2){
              font-size: 12px;
              color: #999;
            }
          }
        }
        .btn-login{
          width: 100%;
          height: 80px;
          padding: 3% 0;
          box-sizing: border-box;
          a{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #fff;
            width: 100%;
            height: 40px;
            background:#2A2A2A;
            border-radius: 5px;
            img{
              height: 25px;
            }
          }
        }
      }
    }
    .btn-right-login:hover{
      .item-avatar{
        display: block;
      }
    }
  }
}
</style>