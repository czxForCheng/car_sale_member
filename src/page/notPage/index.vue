

<template>
<div class="hole">
  <Headers></Headers>
  <div class="safe"/>
  <div class="font">
    <img src="@/assets/images/icon/none.png" alt="">
    <p><i>404</i></p>
    <div style="width: 100%;display: flex;justify-content: center">
      <van-button style="width: 200px;" @click="toIndex" type="primary" round block>{{ $t('h.A009') }}</van-button>

    </div>
  </div>
</div>
</template>
<script >
import Headers from "@/page/components/Headers/index.vue";


export default {
  components:{Headers},
  methods:{
    toIndex(){
      this.$router.push('/')
    }
  },
  mounted() {
    setTimeout(()=>{
      this.$router.push('/')
    },2000)
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