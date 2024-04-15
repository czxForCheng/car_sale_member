<template>
  <div>
    <div class="box-footer">
      <span>{{ version.version }} All Rights Reserved.</span>
    </div>
  </div>
</template>

<script >
  import {getWebsiteInfo} from "@/api/apiFox";
  import {getItem} from "@/utils/auth";

  export default {
    data(){
      return{
        version:''
      }
    },

    mounted() {
      this.version=getItem('website')
      getWebsiteInfo().then(res=>{
        if (this.version){
          if (res.version!==getItem('website').version){
            localStorage.clear()
            location.reload()
          }
        }else{
          this.version=res
        }

      }).catch(err=>{})
    }
  }
</script>

<style scoped lang="scss">
  .box-footer{
    width: 100%;
    background: #171717;
    text-align: center;
    line-height: 60px;
    height: 60px;
    color: #fff;
    font-size: 12px;
  }
</style>