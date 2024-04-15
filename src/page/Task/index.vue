<template>
  <div>
    <Headers></Headers>
    <div class="safe"/>
    <div class="task">
      <div class="task-main">

        <div class="card-template">
          <div class="card-left">
            <p class="new">{{ $t('h.h001') }}</p>
            <p class="title">{{ $t('h.h002') }}</p>
            <p class="tips">{{ $t('h.h003') }}</p>
            <el-carousel indicator-position="none" height="400px">
              <el-carousel-item>
                <img class="car" src="@/assets/images/car.png" alt="">
              </el-carousel-item>
              <el-carousel-item>
                <img class="car" src="@/assets/images/byd.png" alt="">
              </el-carousel-item>
              <el-carousel-item>
                <img class="car" src="@/assets/images/bydh.png" alt="">
              </el-carousel-item>
              <el-carousel-item>
                <img class="car" src="@/assets/images/dz.png" alt="">
              </el-carousel-item>
            </el-carousel>

          </div>
          <div class="card-left">
            <div class="card">
              <p class="money">
                <i v-if="isPwd">{{ userInfo.balanceMoney }}</i> <i v-else>***</i> <span>  {{ webSite.supervisorName }}</span>
              </p>
              <p class="money tips-money">  {{ $t('h.h004') }}</p>
              <p class="money tip-money"> {{ $t('h.h005') }} {{ userInfo.userLevelName }} </p>
              <el-divider></el-divider>
              <div class="card-nav">
                <div class="item">
                  <p class="title-item">{{ $t('h.h006') }}</p>
                  <p class="money-item">{{ webSite.supervisorName ? webSite.supervisorName:'USTD' }}  {{ userInfo.balanceMoney ? userInfo.balanceMoney.toFixed(2) :0  }}</p>
                </div>
                <div class="item">
                  <p class="title-item">{{ $t('h.h007') }}</p>
                  <p class="money-item">{{ webSite.supervisorName ? webSite.supervisorName:'USTD' }} {{ userInfo.nowCommissionMoney ? userInfo.nowCommissionMoney :0}}</p>
                </div>
                <div class="item">
                  <p class="title-item">{{ $t('h.h008') }}</p>
                  <p class="money-item">{{ userInfo.colorMoney }}</p>
                </div>
                <div class="item">
                  <p class="title-item">{{ $t('h.h009') }}</p>
                  <p class="money-item">{{ userInfo.nowOrderNum ? userInfo.nowOrderNum : 0 }}/{{userInfo.robOrderNum ? userInfo.robOrderNum : 0}}</p>
                </div>
              </div>
              <div class="switch-box">
                <van-switch active-color="#000000" inactive-color="#f2f2f2" v-model="isPwd" size="18px" />
                <span>{{ $t('h.h010') }}</span>
              </div>
              <div class="switch-button">
                <a @click="startBrushingOrders" href="javascript:void (0)">{{ $t('h.h011') }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="task-page-box">
          <p class="baseInfo">
            <span v-html="renderedContent"></span>
          </p>
          <!--      <div class="card-box">-->
          <!--        <img src="@/assets/images/bm.jpeg" alt="">-->
          <!--        <p class="titles-box-task">{{ $t('h.t001') }}</p>-->
          <!--        <p class="titles-box-task second">{{ $t('h.t002') }}</p>-->
          <!--        <p class="titles-box-task third">-->
          <!--          <span>$5400.00</span>-->
          <!--          <span>400km/h</span>-->
          <!--        </p>-->
          <!--        <van-divider />-->
          <!--        <p class="bottom-btn">-->
          <!--          <span>Marietta, GA</span>-->
          <!--          <span>-->
          <!--              <svg t="1712482629646" class="icon" viewBox="0 0 1105 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6249" width="22" height="22"><path d="M308.9127 778.278712c57.150784 68.094551 129.501244 148.95683 127.677283 243.194825-133.757154 14.59169-277.242101-34.047276-357.496393-145.308908C35.926508 816.581897 20.726832 749.095333 17.686896 676.744873c-3.039935-80.254292-1.823961-159.900598 1.823962-240.15489 156.860662 18.847599 300.953596 109.437671 385.463798 243.194825 0 30.399353 0 60.798706 1.823961 90.590072 3.039935 43.167081 9.119806 85.726176 21.887534 126.461309-24.319483-44.991043-58.366758-86.334163-89.982085-123.421373-64.446629-77.822344-130.717219-154.428714-215.227421-211.579498-14.59169-9.727793-27.967405 13.375715-13.375715 23.103508 78.430331 52.286887 139.229037 122.2054 198.81177 193.339886zM1027.553408 25.590728c37.695198 177.532222 60.190719 361.144315 49.246952 542.932447-4.863897 83.294228-38.303185 168.412416-95.453969 229.81911-54.110849 58.366758-117.94949 108.221697-190.907938 141.052999-44.383056 20.063573-90.590072 31.615327-139.229037 38.911172-38.911172 6.079871-75.998383 15.199677-113.693581 26.751431-11.551754-72.35046 10.33578-144.092934 36.479224-210.971511 13.983702-34.655263 27.967405-67.486564 34.655263-104.573775 1.823961-9.119806 3.039935-18.847599 4.863896-27.967405 89.374098-34.047276 173.8843-108.221697 274.202166-94.237995 17.023638 2.431948 24.319483-23.711495 7.295844-26.143443-103.965788-14.59169-184.828067 51.6789-275.418139 88.766111 3.039935-12.767728 6.687858-26.143444 10.943767-38.911172 44.991043-132.54118 149.564817-232.251058 255.962553-317.977234 13.375715-10.943767-5.471884-29.791366-18.847599-18.847599-110.045658 89.374098-215.835407 192.731899-262.650411 329.528988-6.687858 19.455586-10.943767 39.519159-14.591689 59.582732a13.928431 13.928431 0 0 0-2.431949 12.767729c-1.823961 12.159741-4.255909 23.711495-6.687857 35.871236-7.295845 37.695198-24.319483 72.35046-38.303185 108.221697-24.319483 63.230655-40.735133 128.893257-33.439289 196.379822-48.638965-61.406693-68.702538-139.229037-74.782408-217.051382a1137.37798 1137.37798 0 0 1-2.431949-101.533839 6.715493 6.715493 0 0 0 0-4.863897c0-10.33578 0-20.063573 0.607987-30.399353 0.607987-45.59903 1.823961-91.198059 14.59169-134.973128 23.103508-78.430331 74.782409-146.524882 131.933193-204.283653 57.150784-58.366758 122.2054-109.437671 193.947873-148.95683 42.559094-23.103508 88.158124-40.735133 131.933192-62.622668 41.34312-20.063573 82.078254-43.167081 122.2054-66.27059z" fill="#38CF99" p-id="6250"></path></svg>-->
          <!--          </span>-->
          <!--        </p>-->
          <!--      </div>-->
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Headers from "@/page/components/Headers/index.vue";
  import Footer from "@/page/components/Footer/index.vue";
  import {homepageText, pushProduct} from "@/api/apiFox";
  import {debounce} from "@/utils/evenNumbers";
  import {Toast} from "vant";
  import {getItem, setItem} from "@/utils/auth";
  import {decrypt} from "@/utils/AES";
  export default {
    components:{Headers,Footer},
    data(){
      return{
        isPwd:true,//是否显示金额
        webSite:'',
        userInfo:'',
        deal:'',
        // 用户信息
        contentText:'',
      }
    },
    computed: {
      renderedContent() {
        let modifiedContent = this.contentText.replace(/<img(.*?)src="(.*?)"(.*?)>/g, (match, p1, p2, p3) => {
          return `<img${p1}src="${p2}" style="width: 100% !important;border-radius:15px">`;
        });
        return modifiedContent;
      }
    },

    methods:{
      getBaseInfo(){
        homepageText().then(res=>{
          if (res){
            let contentText=res.filter(values=>{return values.state === 1})
            this.contentText = contentText[0].content
          }
        }).catch(err=>{})
      },
      startBrushingOrders:debounce(function (){
        if (this.userInfo.nowOrderNum >= this.userInfo.robOrderNum){
          Toast({
            position:'top',
            message:this.$t('h.R016'),
            duration:5000})
        }else{
          if (this.userInfo.balanceMoney < 0){
            Toast(this.$t('h.R017'))
          }else{
            this.loading=true
            pushProduct(this.userInfo.username).then(res=>{
              if (res.data){
                setItem('order',res.data)
                this.loading=false
                this.$router.push('/deal')
              }
            }).catch(err=>{
              if (err.code === 314){
                this.$router.push('/order')
              }
              this.loading=false
            })
          }
        }

      },600),
    },

    mounted() {
      this.getBaseInfo()
      this.userInfo=JSON.parse(decrypt(getItem('BaseUser')))
      this.$store.dispatch('getUserList',this.userInfo.id).then(res=>{
        this.userInfo=res
      })
      this.webSite=getItem('website')
    }
  }
</script>

<style scoped lang="scss">
.safe{
  width: 100%;
  height: 60px;
}
.task{
  width: 100%;
  min-height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  .task-main{
    width: 1200px;
    padding: 100px 0 ;
    .template-task-box{
      width: 100%;
      min-height: 600px;
      background: #f8f8f8;

      .titles-box-header{
        background: #f8f8f8;
        height: 280px;
        width: 100%;
        padding: 40px 0 0 0;
        box-sizing: border-box;
        .header{
          width: 100%;
          min-height: 40px;
          display: flex;
          justify-content: center;
          .header-top{
            width: 50px;
            height: 30px;
            background: #9ad3f3;
            border-radius: 8px;
            text-align: center;
            line-height: 30px;
            color: #000;
            font-size: 12px;
          }
          .content{
            margin-top: 10px;
            width: 200px;
            line-height: 36px;
            font-weight: 600;
            text-align: center;
            font-size: 28px;
            color: #333;
          }
          .content-tips{
            width: 100%;
            padding: 3%;
            box-sizing: border-box;
            color: #666;
            font-weight: 600;
            font-size: 14px;
            text-align: center;
          }
        }
      }
      .main-box-header{
        width: 100%;
        min-height: 100px;
        padding: 0 0 20px 0;
        .box-card{
          width: 100%;
          height: 100px;
          text-align: center;
          background: #fff;
          img{
            height: 100px;
          }
        }
        .box-money{
          background: #fff;
          width: 100%;
          height: 80px;
          text-align: center;
          font-family: Radikal,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,Roboto,sans-serif;
          font-size: 20px;
          i{
            font-weight: 600;
            font-size: 54px;
          }
        }
        .box-tips{
          width: 100%;
          height: 30px;
          background: #fff;
          font-size: 14px;
          text-align: center;
        }
        .rank{
          color: #999;
          font-size: 12px;
        }
        .divider{
          width: 100%;
          padding:0 3%;
          box-sizing: border-box;
        }
        .total-box-main{
          min-height: 130px;
          width: 100%;
          padding:0 3%;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          box-sizing: border-box;
          .box{
            width: 160px;
            margin-bottom: 15px;
            min-height: 50px;
            border-radius: 2px;
            border: 1px solid #707070;
            padding:2% 2%;
            box-sizing: border-box;
            .title{
              width: 100%;
              color: #999;
              font-size: 12px;
            }
            .money{
              margin-top: 5px;
              width: 100%;
              font-size: 14px;
              font-weight: 500;
            }
          }
        }
        .whether-hide-amount{
          width: 100%;
          height: 60px;
          padding: 0 4%;
          margin-top: 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          font-size: 12px;
          span{
            margin-left: 15px;
          }
        }
        .submit-button{
          width: 100%;
          height: 70px;
          box-sizing: border-box;
          background: #f8f8f8;
          padding: 0 3%;
          .submit-image{
            width: 100%;
            height: 40px;
            border-radius: 30px;
            background: #000;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
          }
          .bottom-divider{
            width: 100%;
            height: 2px;
            background: #e5e5e5;
            margin-top: 20px;
          }
        }
      }
      .box-nav-next{
        width: 100%;
        min-height: 200px;
        padding: 0 4%;
        box-sizing: border-box;
        background: #f8f8f8;
        .title{
          width: 100%;
          text-align: center;
          font-size: 26px;
          color: #333;
          font-weight: 600;
        }
        .card{
          width: 100%;
          height: 150px;
          background: #fff;
          border-radius: 15px;
          margin-top: 20px;
          padding: 5%;
          box-sizing: border-box;
          .title-tops{
            width: 100%;
            height: 60px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
              height: 40px;
            }
          }
          .card-content{
            font-size: 16px;
            width: 100%;
            margin-top: 10px;
          }
        }
      }
    }
    .task-page-box{
      width: 100%;
      min-height: 300px;
      padding:0 3%;
      box-sizing: border-box;
      .baseInfo{
        width: 100%;
        span{
          font-size: 14px;
          line-height: 26px;
        }
      }
      .card-box{
        width: 100%;
        border-radius: 5px;
        min-height: 270px;
        padding: 0 0 10px 0;
        margin-bottom: 20px;
        background:#fff;
        background-position: center left;
        background-size: cover;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        img{
          width: 100%;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        }
        .titles-box-task{
          width: 100%;
          padding:1% 3%;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 600;
        }
        .bottom-btn{
          width: 100%;
          height: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 3%;
          box-sizing: border-box;
          span{
            font-size: 12px;
            color: #999;
          }
        }
        .second{
          font-weight: 400;
          color: #171717;
        }
        .third{
          display: flex;
          justify-content: space-between;
          padding: 0 3%;
          font-weight: 300;
          font-size: 14px;
          margin-top: 10px;
          span:nth-child(1){
            color: #F56C6C;
            font-weight: 600;
          }
          span:nth-child(2){
            font-size: 10px;
          }
        }
      }
    }
    .card-template{
      width: 100%;
      height: 700px;
      display: flex;
      .card-left{
        width: 50%;
        height: 500px;
        .new{
          width: 50px;
          height: 34px;
          text-align: center;
          line-height: 35px;
          background: #9ad3f3;
          border-radius: 10px;
          font-size: 14px;
        }
        .title{
          width: 100%;
          margin-top: 20px;
          font-size: 34px;
        }
        .tips{
          width: 60%;
          margin-top: 20px;
          font-size: 18px;
          color: #999;
        }
        .car{
          height: 240px;
          margin-top: 50px;
        }
        .card{
          margin-top: 40px;
          width: 600px;
          height: 550px;
          background: #fff;
          margin-left: 50px;
          padding: 3%;
          box-sizing: border-box;
          .money{
            width: 100%;
            text-align: center;
            margin-top: 20px;
            i{
              font-size: 72px;
              font-weight: 600;
            }
            span{
              font-size: 18px;
            }
          }
          .tips-money{font-size: 18px;}
          .tip-money{
            margin-top: 10px;
            font-size: 14px;
            color: #999;
          }
          .card-nav{
            width: 100%;
            height: 150px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .item{
              width: 45%;
              height: 60px;
              border-radius: 6px;
              border: 1px solid #333;
              padding: 8px 2%;
              box-sizing: border-box;
              .title-item{
                font-size: 14px;
                color: #999;
              }
              .money-item{
                margin-top: 5px;
                font-size: 18px;
              }
            }
          }
          .switch-box{
            width: 100%;
            height: 30px;
            padding: 0 25px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            span{
              font-size: 16px;
              margin-left: 15px;
              color: #5a5a5a;
            }
          }
          .switch-button{
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 30px;
            box-sizing: border-box;
            a{
              margin-top: 40px;
              display: flex;
              width: 100%;
              justify-content: center;
              border-radius: 40px;
              align-items: center;
              height: 50px;
              background: #000;
              color: #fff;
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>