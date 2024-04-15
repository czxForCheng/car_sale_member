<template>
  <div>
    <div class="mine">
      <div class="my-top-style">
<!--        <img src="@/assets/images/icon/icon_main.png" alt="">-->
      </div>
      <div class="my-main-page">
        <div class="card_main">
          <div class="avatar">
            <img  class="avatar_img"  src="@/assets/images/avatar.png" alt="">
            <div class="right">
              <div class="icon_right">
<!--                <img :src="data.userLevelImg" alt="">-->

              </div>
            </div>
          </div>
          <div class="username-and-invitation-code">
            <p>用户名</p>
            <p>邀请码:123456 <img src="@/assets/images/icon/icon_copy.png" alt=""></p>
          </div>
          <div class="usdt">
            <div class="left">
              <p>USD 150.00</p>
              <p>用户总额</p>
            </div>
            <div class="left">
              <p>USD 150</p>
              <p> 佣金</p>
            </div>
          </div>
        </div>
        <div class="menu_top">
<!--          <div @click="routerSetup(item)" class="list" v-for="(item,index) in menu.slice(0,4)" :key="index">-->
<!--            <img :src="item.icon" alt="">-->
<!--            <p>{{ item.name[language]  }}</p>-->
<!--          </div>-->

        </div>
        <div class="menu_top menu_main" >
<!--          <div  @click="routerSetup(item)" class="list" v-for="(item,index) in menu.slice(4,)" :key="index">-->
<!--            <img :src="item.icon" alt="">-->
<!--            <p>{{ item.name[language]  }}</p>-->
<!--          </div>-->

        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return{

    }
  },
  methods:{

  },

}
</script>

<style scoped lang="scss">
.mine{
  width: 100%;
  min-height: 100vh;
  background: #171717;
  overflow: hidden;
  padding: 0 0 100px 0;
  .my-top-style{
    width: 100%;
    height: 186px;
    background: linear-gradient( 180deg, #171717 61%, rgba(177,46,68,0) 100%);
    opacity: 1;
  }
  .my-main-page{
    margin-top: -140px;
    width: 100%;
    padding: 0 3%;
    box-sizing: border-box;
    margin-bottom: 100px;
    .card_main{
      width: 100%;
      position: relative;
      min-height: 229px;
      background: rgba(255,255,255,1);
      box-shadow: 0px 4px 19px 0px rgba(64,81,93,0.04);
      border-radius: 12px 12px 12px 12px;
      border: 1px solid;
      padding: 4%;
      box-sizing: border-box;
      //border-image: linear-gradient(180deg, rgba(255, 255, 255, 0.33), rgba(255, 255, 255, 0)) 1 1;

      .avatar{
        width: 100%;
        height: 80px;
        padding:15px 3%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avatar_img{
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .right{
          padding: 15px 0 0 0;
          width: 100%;
          box-sizing: border-box;
          height: 100px;
          display: flex;
          justify-content: right;
          .icon_right{
            min-width: 130px;
            padding: 3px 5px;
            height: 30px;
            background: linear-gradient( 146deg, #171717 0%, #171717 100%);
            border-radius: 10px;
            opacity: 1;
            font-size: 13px;
            font-weight: 400;
            color: #FFC0B1;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              margin-right: 5px;
              height: 30px;
            }
          }
        }
      }
      .username-and-invitation-code{
        width: 100%;
        height: 50px;
        margin: 8px 0;
        p:nth-child(1){
          font-size: 20px;
          font-weight: 500;
          color: #333333;
          line-height: 23px;
        }
        p:nth-child(2){
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          line-height: 16px;
          img{
            height: 16px;
          }
        }
      }
      .usdt{
        width: 100%;
        min-height: 80px;
        display: flex;
        justify-content: space-between;
        .left{
          width: 45%;
          box-sizing: border-box;
          height: 80px;
          background: #EFEFFB;
          border-radius: 12px 12px 12px 12px;
          opacity: 1;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding: 15px 3% 20px 3%;
          p:nth-child(1){
            font-size: 16px;
            font-weight: 500;
            color: #333333;
            line-height: 19px;
          }
          p:nth-child(2){
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            color: #666666;
            line-height: 16px;
          }
        }
        .left:nth-child(2){
          background: #FCF1ED;
        }
      }
    }
    .menu_top{
      width: 100%;
      min-height: 90px;
      background: #FFFFFF;
      margin-top: 20px;
      border-radius: 12px 12px 12px 12px;
      opacity: 1;
      display: flex;
      padding: 2%;
      box-sizing: border-box;

      .list{
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px 0;
        margin-right: 1%;
        box-sizing: border-box;
        img{
          width: 30px;
          height: 30px;
        }
        p{
          width: 100%;
          text-align: center;
          font-size: 13px;
          font-weight: 400;
          color: #333333;
          white-space: nowrap; /* 不换行 */
          overflow: hidden;    /* 隐藏超出部分 */
          text-overflow: ellipsis; /* 显示省略号 */
        }
      }
    }
    .menu_main{
      min-height: 90px;
      flex-wrap: wrap;
      margin-bottom: 100px;
    }
  }



}
</style>