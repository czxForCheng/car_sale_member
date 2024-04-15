<template>
  <div class="tabbar-bottom">
    <van-grid :border="false" :column-num="4">
      <van-grid-item @click="changeRouter(1)">
        <van-image v-if="active===1" class="image-size" :src="require('@/assets/images/icon/h.png')" />
        <van-image v-else class="image-size" :src="require('@/assets/images/icon/h1.png')" />
        <span :class="{'active':active===1}" class="font-icon">Home</span>
      </van-grid-item>
      <van-grid-item @click="changeRouter(2)">
        <van-image v-if="active===2" class="image-size" :src="require('@/assets/images/icon/t.png')" />
        <van-image v-else class="image-size" :src="require('@/assets/images/icon/t1.png')" />
        <span :class="{'active':active===2}" class="font-icon">Task</span>
      </van-grid-item>
      <van-grid-item @click="changeRouter(3)">
        <van-image v-if="active===3" class="image-size" :src="require('@/assets/images/icon/g.png')" />
        <van-image v-else class="image-size" :src="require('@/assets/images/icon/g1.png')" />
        <span :class="{'active':active===3}" class="font-icon">Group</span>
      </van-grid-item>
      <van-grid-item @click="changeRouter(4)">
        <van-image v-if="active===4" class="image-size" :src="require('@/assets/images/icon/u.png')" />
        <van-image v-else class="image-size" :src="require('@/assets/images/icon/u1.png')" />
        <span :class="{'active':active===4}" class="font-icon">Mine</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        active:1
      }
    },

    methods:{
      changeRouter(item){
        this.active = item
        switch (item){
          case 1:{
            this.$router.push('/').catch(err=>{})
            break
          }
          case 2:{
            this.$router.push('/task').catch(err=>{})
            break
          }
          case 3:{
            this.$router.push('/grop').catch(err=>{})
            break
          }
          case 4:{
            this.$router.push('/mine').catch(err=>{})
            break
          }
        }
      },
      getPath(){
        setTimeout(()=>{
          if (/product/.test(this.$route.name)){
            this.active =2
          }else if (/mine/.test(this.$route.name)){
            this.active =4
          }else if (/shop/.test(this.$route.name)){
            this.active =2
          }else{
            this.active =1
          }
        },100)

      }
    },
    mounted() {
      this.getPath()
    }

  }
</script>


<style scoped lang="scss">
.tabbar-bottom{
  width: 100%;
  height: 70px;
  padding:0 3%;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  bottom:0;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.image-size{
  height: 25px;
}
.font-icon{
  margin-top: 5px;
  font-size: 12px;
  color: #aaa;
}
.active{
  color: #333;
}
</style>