<template>
  <div>
    <Headers></Headers>
    <div class="safe"/>
    <div class="hole">
        <div class="withdraw-box">
            <div class="left">
              <div class="withdraw-center">
                <div class="box-main">
                  <div class="title-main">{{ $t('h.w001') }}</div>
                  <div class="main-money">{{ website.supervisorName }} {{ user.balanceMoney  }}</div>
                  <div class="tips">{{$t('h.w012')}}</div>
                </div>
              </div>
              <van-divider />
              <div class="box-main-withdraw">
                <div class="box-text">
                  {{$t('h.w011')}}
                </div>
                <van-divider />
                <div class="title">
                  <p>{{$t('h.w013')}}</p>
                  <p>{{$t('h.w014')}}</p>
                </div>

                <div class="form">

                  <div class="item wallet">
                    <div class="label ">{{$t('h.w002')}}</div>
                    <div class="input wallet-input">{{ user.walletAddress }}</div>
                    <div class="row"></div>
                  </div>
                  <div class="item">
                    <div class="label block">{{$t('h.w004')}}</div>
                    <div class="bottom">
                      <div class="input"><input  @change="withdrawalAmount" v-model="form.balanceMoney" :placeholder="$t('h.w004') " type="number"></div>
                      <div class="row"><span class="right_icon" @click="getAll">All</span></div>
                    </div>

                  </div>
                  <div class="item">
                    <div class="label">{{$t('h.w003')}}</div>
                    <div class="bottom">
                      <div class="input"><input :type="isPwd ? 'text':'password' " v-model="form.tradingPwd" :placeholder="$t('h.w005')"></div>
                      <div class="row">
                        <a @click="isPwd=false" v-if="isPwd" href="javascript:void (0)"><van-icon name="eye-o" /></a>
                        <a @click="isPwd=true" v-else href="javascript:void (0)"><van-icon name="closed-eye" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="submit">
                  <van-button @click="withdrawalSubmit" :disabled="form.configPassword !== form.password || form.configPassword ===''" color="#000" type="danger" round block>{{$t('h.w006')}}</van-button>
                </div>
              </div>
            </div>
            <div class="left right">
              <p class="right-title">{{$t('h.W025')}}</p>
              <div class="card-box">
                <div class="nav-box-first">
                  <div class="item" v-for="(item,index) in list" :key="index">
                    <p class="order">{{ $t('h.r006') }}：<span>{{ item.orderNo }}</span></p>
                    <p class="order">{{ $t('h.r007') }}：<span class="money">{{ website.supervisorName }} {{ item.money }}</span></p>
                    <p class="order">{{ $t('h.r008') }}：<span>
              <van-tag size="large" type="primary" v-if="item.auditStatus===0">{{ renderStatus(item.auditStatus) }}</van-tag>
              <van-tag size="large" type="success" v-else-if="item.auditStatus===1">{{ renderStatus(item.auditStatus) }}</van-tag>
              <van-tag size="large" type="danger" v-else>{{ renderStatus(item.auditStatus) }}</van-tag>
            </span></p>
                    <p class="order" v-if="item.reject">{{ $t('h.r009') }}：<span class="money">{{ item.reject }}</span></p>
                  </div>
                </div>
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
  import {withdrawalFinance, withdrawalRecord} from "@/api/apiFox";
  import {decrypt} from "@/utils/AES";
  import {getItem} from "@/utils/auth";

  export default {
    components:{Headers,Footer},
    data() {
      return {
        active: 0,
        isPwd:false,
        user:'',
        form:{balanceMoney:'',tradingPwd:''},
        website:'',
        list:[],
      };
    },
    computed:{
      renderStatus(){
        return item=>{
          switch (item){
            case 0:{
              return this.$t('h.o002')
            }
            case 1:{
              return this.$t('h.r010')
            }
            case 2:{
              return this.$t('h.r012')
            }
          }
        }
      }
    },

    methods:{
      getAll(){
        this.form.balanceMoney = this.user.balanceMoney
      },
      withdrawalAmount(){
        if (this.user.balanceMoney<0){
          Toast(this.$t('h.w015'))
        }else{
          if (this.form.balanceMoney > this.user.balanceMoney){
            Toast(this.$t('h.w016'))
            this.form.balanceMoney = this.user.balanceMoney
          }else if (this.form.balanceMoney<0){
            Toast(this.$t('h.w017'))
          }
        }
      },
      withdrawalSubmit(){
        if (this.user.balanceMoney<0){
          Toast(this.$t('h.w015'))
        }else{
          if (this.form.balanceMoney===''){
            Toast(this.$t('h.w018'))
          }else if (this.user.walletAddress==='' || this.user.walletAddress===null){
            Toast(this.$t('h.w019'))
          }else if(this.form.tradingPwd === ''){
            Toast(this.$t('h.w020'))
          }else{
            let form = {userId:this.user.id,money:this.form.balanceMoney,usdt:this.user.walletAddress,tradingPwd:this.form.tradingPwd}
            withdrawalFinance(form).then(res=>{
              Toast({duration: 3000, forbidClick: false, message: this.$t('h.w021')});
              this.active = 1
              this.form.tradingPwd=this.form.balanceMoney=''
              this.getWithdrawal()
              this.getUserMessage()
            }).catch(err=>{
              if (err.code !== 500){
                Toast(err.msg)
              }
            })
          }
        }
      },

      getWithdrawal(){
        withdrawalRecord(this.user.id).then(res=>{
          console.log(res)
          this.list = res
        }).catch(err=>{})
      },
      getUserMessage(){
        this.$store.dispatch('getUserList',this.user.id).then(res=>{
          this.user=res
        })
      }
    },

    mounted() {
      this.user=JSON.parse(decrypt(getItem('BaseUser')))
      this.website=getItem('website')
      this.getUserMessage()
      this.getWithdrawal()
      console.log(this.user)
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
  padding: 60px 0;
  box-sizing: border-box;
  justify-content: center;
  .withdraw-box{
    width: 1200px;
    height: 100vh;
    background: #fff;
    display: flex;
    border-radius: 8px;
    padding: 1%;
    box-sizing: border-box;
    .left{
      width: 600px;
      .withdraw-center{
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3%;
        box-sizing: border-box;
        .box-main{
          width: 100%;
          height: 120px;
          border-radius: 15px;
          //background: url("../../assets/image/images/icon_home.png") no-repeat 50%;
          background: #000;
          background-position: top;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding: 3%;
          box-sizing: border-box;
          .title-main{
            width: 100%;
            height: 20px;
            font-size: 14px;
            color: #f6f6f6;
          }
          .main-money{
            width: 100%;
            margin-top: -15px;
            font-size: 21px;
            color: #fff;
          }
          .tips{
            width: 100%;
            font-size: 14px;
            color: #fff;
          }
        }
      }
      .box-main-withdraw{
        width: 100%;
        padding: 3%;
        box-sizing: border-box;
        .box-text{
          width: 100%;
          font-size: 14px;
          color: #333;
          line-height: 20px;
        }
        .title{
          width: 100%;
          height: 40px;
          font-size: 16px;
          margin-top: 15px;
          font-weight: 600;
          p:nth-child(2){
            font-size: 14px;
            margin-top: 10px;
            font-weight: 400;
          }
        }
        .form{
          width: 100%;
          min-height: 120px;
          background: #fff;
          border-radius: 15px;
          margin-top: 40px;
          padding:0 3%;
          box-sizing: border-box;
          .wallet{

            .wallet-input{
              width: 100%;
              line-height: 20px;
            }
          }
          .item{
            width: 100%;
            //display: flex;
            //align-items: center;
            border-bottom: 1px solid #f5f5f5;
            padding: 10px 0 0 0;
            box-sizing: border-box;
            //flex-wrap: wrap;
            div{
              display: flex;
              align-items: center;
              font-size: 12px;
              white-space: nowrap; /* 防止换行 */
              overflow: hidden; /* 隐藏超出部分 */
              text-overflow: ellipsis; /* 添加省略号 */
            }

            .label{
              font-size: 12px;
              width: 150px;
              padding: 10px 0;
              box-sizing: border-box;
            }
            .block{
              width: 100%;
            }
            .bottom{
              display: flex;
              justify-content: space-between;
              width: 100%;
              input{
                width: 100%;
              }
            }
            .input{
              height: 50px;
              padding: 0 0 0 15px;
              box-sizing: border-box;
              white-space: pre-wrap;
              word-break: break-word;
              width: 100%;
            }
            .row{
              width: 60px;
              //height: 50px;
              font-size: 16px;
              img{
                height:12px
              }
            }
          }
        }
        .submit{
          width: 100%;
          margin-top: 20px;
        }
      }
    }
    ::-webkit-scrollbar{
      display: none;
    }
    .right{
      height: 90vh;
      overflow-y: scroll;
      .right-title{
        font-size: 18px;
        text-indent: 30px;
        font-weight: 600;
      }
      .card-box{
        width: 100%;
        padding: 3%;
        box-sizing: border-box;

        .box-withdraw{
          width: 100%;
          min-height: 400px;
          background: #fff;
          border-radius: 15px;
          margin-top: 20px;
          padding: 4%;
          box-sizing: border-box;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          .box-item{
            width: 100%;
            min-height: 45px;
            border-bottom: 1px solid #f6f6f6;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            padding: 10px 0;
            box-sizing: border-box;
            .left{
              width: 50%;
              font-size: 15px;
              display: flex;
              align-items: center;
              span{
                margin-right: 10px;
                display: flex;
                width: 6px;
                height: 15px;
                background: #ecae38;
              }
            }
            .right{
              height: 45px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 16px;
            }
            .right-nav{
              width: 100%;
              min-height: 30px;
              display: flex;
              justify-content: left;
              color: #ecae38;
              font-size: 14px;
            }
            .justify-content{
              padding: 10px 0 0 0;
              box-sizing: border-box;
              justify-content: space-between;
              input{
                width: 80%;
              }
              a{
                display: flex;
                height: 30px;
                width: 50px;
                background: #ecae38;
                color: #fff;
                border-radius: 30px;
                justify-content: center;
                align-items: center;
              }
            }
            .password{
              a{
                background: none;
                color: #000;
                font-size: 18px;
              }
            }
          }
          .button{
            width: 100%;
            margin-top: 30px;
          }
        }
        .nav-box-first{
          width: 100%;
          min-height: 200px;
          margin-top: 20px;
          background: #fff;
          border-radius: 10px;
          padding: 3%;
          box-sizing: border-box;
          .item:last-child{
            border-bottom: none;
          }
          .item{
            width: 100%;
            min-height: 100px;
            border-bottom: 1px solid #f6f6f6;
            .order{
              width: 100%;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              display: flex;
              justify-content: space-between;
              .money{
                color: #F56C6C;
              }
              .status{
                display: flex;
                width: 80px;
                height: 30px;
                justify-content: center;
                align-items: center;
                border-radius: 30px;
                background: #F56C6C;
                color: #fff;
              }

              .success{
                background: #67C23A !important;
              }
              .pending{
                background: #666 !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>