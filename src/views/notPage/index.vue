<template>
  <div class="hole">
    <Header></Header>
    <div class="safe"/>
    <div class="font">
      <img src="@/assets/images/icon/none.png" alt="">
      <p><i>404</i></p>
      <van-button @click="toIndex" type="primary" round block>{{ $t('h.A009') }}</van-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
export default {
  components:{Header},
  methods:{
    toIndex(){
      this.$router.push('/')
    }
  },
  mounted() {
    setTimeout(()=>{
        this.$router.push('/')
    },1000)
  }
}
</script>

<style scoped lang="scss">
  .hole{
    min-height: 100vh;
    background: #fff;
    width: 100%;
    .safe{
      width: 100%;
      height: 60px;

    }
    .font{
      padding: 3%;
      box-sizing: border-box;
      font-size: 54px;
      text-align: center;
      p{
        margin-bottom: 50px;
      }
    }
  }
</style>