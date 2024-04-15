<template>
  <div class="invitation">
    <Header></Header>
    <div class="safe"/>

    <div class="invitation-safe">
      <div class="center">
        <img src="@/assets/images/invitation.png" alt="">
        <p class="title">{{ $t('h.I001') }}</p>
        <p class="code"> {{ user.inviteCode }} </p>
        <van-button @click="oncopy" block round color="#ecae38">{{ $t('h.I002') }}</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import Header from "@/components/Header/index.vue";
  import {decrypt} from "@/utils/AES";
  import {getItem} from "@/utils/auth";
  import {Toast} from "vant";

  export default {
    components:{Header},
    data(){
      return{
        user:''
      }
    },

    methods:{
      oncopy() {

        let s = location.origin+'/reg?code='+this.user.inviteCode
        this.$copyText(s).then(
            e => {
              Toast({
                position: 'center',
                message: this.$t('h.R015')
              })
            },
            e => {
              console.log('error：', e);
            }
        )
      },
    },

    mounted() {
      this.user=JSON.parse(decrypt(getItem('BaseUser')))
    }
  }
</script>

<style scoped lang="scss">
.invitation{
  width: 100%;
  min-height: 100vh;
  background: #fff;
  .safe{
    width: 100%;
    height: 60px;
  }
  .invitation-safe{
    width: 100%;
    padding: 3%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    .center{
      width: 300px;
      min-height: 350px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      img{
        height: 200px;
      }
      p{
        width: 100%;
        text-align: center;
      }
      .title{
        font-size: 14px;
        color: #5a5a5a;
      }
      .code{
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
}

</style>