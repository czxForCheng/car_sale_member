<!-- GlobalLoadingIndicator.vue -->
<template>
  <div  v-if="isLoading"  class="global-loading-indicator">
<!--    加载中...-->
    <div class="central-region isLoading" v-if="status ===1">
      <img class="loading" src="@/assets/images/loading.gif" alt="">
      {{message}}
    </div>

<!--    成功-->
    <div class="central-region isSuccess"  v-if="status ===2">
      <img class="success" src="@/assets/images/success.png" alt="">
      <p>操作成功</p>
    </div>

    <div class="central-region isSuccess" v-if="status ===3">
      <img class="flied" src="@/assets/images/failed.png" alt="">
      <p class="filed_content">账号密码不正确</p>
    </div>
    <div class="central-region isSuccess" v-if="status ===4">
      <img class="success" src="@/assets/images/tips.png" alt="">
      <p>账号密码不正确</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      status:1,
      message:''
    };
  },
  methods: {
    show(message,status) {
      this.isLoading = true
    },
    hide(message) {
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.global-loading-indicator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //background: rgba(0, 0, 0, 0.4);

  border-radius: 8px;
  z-index: 1000;
  .isLoading{
  background: none !important;
  }
  .isSuccess{
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
    margin-top: -150px;
  }
  .central-region{
    min-height: 30px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,0.4);
    padding: 10px;
    animation: slideDown 0.5s ease-out;

    .loading{
      width: 150px;
    }
    .success{
      width: 20px;
    }
    .flied{
      width: 20px;
    }
    .filed_content{
      color: #F56C6C;
    }
    p{
      margin-top: 0;
      width: 100%;
      min-height: 26px;
      line-height: 26px;
      font-size: 14px;
      padding: 0 10px;
      box-sizing: border-box;
      color: #443;
    }
  }

}
</style>
