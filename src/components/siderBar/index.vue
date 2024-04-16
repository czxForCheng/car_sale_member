<template>
  <div>
    <van-popup
        v-model="show"
        @close="closeSider"
        closeable
        close-icon-position="top-right"
        position="left"
        :style="{ height: '100%',width:'70%',borderTopRightRadius:'10px',borderBottomRightRadius:'10px'}"
    >
    <div class="van-box">
      <div class="avatar">
        <img v-if="base.avatar" :src="base.avatar" alt="">
        <img v-else src="@/assets/images/avatar.png" alt="">
        <p class="avatar-name username">{{ $t('h.s001') }} : {{ base.username || '' }} <img v-if="base.userLevelImg" :src="base.userLevelImg" alt=""></p>
        <p class="avatar-name">{{ $t('h.s002') }}： <b>{{ base.inviteCode  || ''}}</b> <img @click="oncopy" src="@/assets/images/icon/icon_copy.png" alt=""></p>
      </div>
      <van-cell :border="false" @click="stepNewRouter('/')" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_h6.png" alt="">{{ $t('h.s003') }}</span>
        </template>
      </van-cell>
      <van-cell @click="stepNewRouter('/task')" :border="false" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_tast.png" alt="">{{ $t('h.s009') }}</span>
        </template>
      </van-cell>
      <van-cell @click="stepNewRouter('/order')" :border="false" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_orders.png" alt="">{{ $t('h.s010') }}</span>
        </template>
      </van-cell>
      <van-cell @click="stepNewRouter('/recharge')" :border="false" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_recharge.png" alt="">{{ $t('h.s011') }}</span>
        </template>
      </van-cell>
      <van-cell @click="stepNewRouter('/withdraw')" :border="false" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_withdraw.png" alt="">{{ $t('h.s012') }}</span>
        </template>
      </van-cell>
      <van-cell @click="stepNewRouter('/wallet')" :border="false" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_wallet.png" alt="">{{ $t('h.s013') }}</span>
        </template>
      </van-cell>

      <van-divider />
      <van-cell :border="false" @click="stepNewRouter('/faqs',{status:1})" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_cret.png" alt="">{{ $t('h.s004') }}</span>
        </template>
      </van-cell>
      <van-cell :border="false" @click="stepNewRouter('/faqs',{status:2})" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_tc.png" alt="">{{ $t('h.s005') }}</span>
        </template>
      </van-cell>
      <van-cell :border="false" @click="stepNewRouter('/faqs',{status:3})" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_faqs.png" alt="">{{ $t('h.s006') }}</span>
        </template>
      </van-cell>
      <van-cell :border="false" @click="stepNewRouter('/faqs',{status:4})" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_email.png" alt="">{{ $t('h.s007') }}</span>
        </template>
      </van-cell>
      <van-cell :border="false" @click="stepNewRouter('/faqs',{status:5})" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_desc.png" alt="">{{ $t('h.s008') }}</span>
        </template>
      </van-cell>
      <van-divider />
      <van-cell @click="stepNewRouter('/security')" :border="false" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_security.png" alt="">{{ $t('h.s014') }}</span>
        </template>
      </van-cell>
      <van-cell @click="stepNewRouter('/invitation')" :border="false" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_invitation.png" alt="">{{ $t('h.s015') }}</span>
        </template>
      </van-cell>
      <van-cell @click="stepNewRouter('/chat')" :border="false" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_service.png" alt="">{{ $t('h.s016') }}</span>
        </template>
      </van-cell>
      <van-divider />
      <van-cell @click="removeLogin" :border="false" is-link>
        <template #title>
          <span class="custom-title"><img src="@/assets/images/icon/icon_logout.png" alt="">{{ $t('h.s017') }}</span>
        </template>
      </van-cell>

    </div>

    </van-popup>
  </div>
</template>

<script>
import Footer from '@/components/footer/index.vue'
import {decrypt} from "@/utils/AES";
import {Toast} from "vant";
import {closeSocketWs} from "@/utils/scoket";
import {leaveLogin} from "@/api/apiFox";
import {getItem} from "@/utils/auth";
export default {
  props:['isShow'],
  components:{Footer},
  data() {
    return {
      show: false,
      activeName: '2',
      base:''
    };
  },

  methods: {
    closeSider() {
      this.$emit('closeShow',true)
    },
    stepNewRouter(path,item){
      this.$router.push({path:path,query:item}).catch(err=>{})
      if (item){
        this.$bus.$emit('faqsChange',item)
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
      this.$router.push('/login').catch(err=>{})
    }
  },

  mounted() {
    if (getItem('admin')){
      this.base=JSON.parse(decrypt(this.$store.state.User))
    }
  },

  watch:{
    isShow(newValue,oldValue){
      newValue ?  this.show=true : this.show = false
    }
  }
};
</script>

<style scoped lang="scss">
  .van-box{
    width: 100%;
    min-height: 100vh;
    padding:0 0 40px 0;
    box-sizing: border-box;
    position: relative;
    .avatar{
      width: 100%;
      height: 200px;
      text-align: center;
      padding: 40px 0 0 0;
      box-sizing: border-box;
      img{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-bottom: 10px;
      }
      .avatar-name{
        width: 100%;
        font-size: 12px;
        color: #5a5a5a;
        display: flex;
        justify-content: center;
        img{
          height: 15px;
          width: 15px;
          margin-left: 10px;
        }
      }
      .username{
        margin-bottom: 5px;
        font-size: 14px;
        img{
          height: 20px;
          width: 20px;
        }
      }
    }
  }
  .custom-title{
    display: flex;
    align-items: center;
    font-size: 14px;
    img{
      margin-right: 10px;
      height: 20px;
    }
  }
</style>