<template>
  <div>
    <Headers></Headers>
    <div class="safe"/>
    <div class="hole">
      <div class="center-box">
        <div class="invitation-safe">
          <div class="center">
            <img src="@/assets/images/invitation.png" alt="">
            <p class="title">{{ $t('h.I001') }}</p>
            <p class="code"> {{ user.inviteCode }} </p>
            <van-button @click="oncopy" block round color="#ecae38">{{ $t('h.I002') }}</van-button>
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
  import {decrypt} from "@/utils/AES";
  import {getItem} from "@/utils/auth";

  export default {
    components:{Headers,Footer},
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
.safe{
  width: 100%;
  height: 60px;
}
.hole {
  width: 100%;
  min-height: 100vh;
  background: #f8f8f8;
  background: url("@/assets/images/bgk_car.png") no-repeat 100%;
  background-position: left center;
  background-size: cover;
  display: flex;
  justify-content: center;
  padding: 60px 0;
  box-sizing: border-box;
  .center-box{
    width: 700px;
    background: #fff;
    .invitation-safe{
      width: 100%;
      padding: 3%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
      .center{
        width: 300px;
        min-height: 350px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        img{
          height: 260px;
        }
        p{
          width: 100%;
          text-align: center;
        }
        .title{
          margin-bottom: 50px;
          font-size: 18px;
          color: #5a5a5a;
        }
        .code{
          font-weight: 600;
          font-size: 27px;
          margin-bottom: 50px;
        }
      }
    }
  }
}
</style>