<template>
  <div class="overall">
    <img class="bgk" src="@/assets/images/active_bgk.png" alt="">
    <div class="activity_body">
      <div class="title">
        <img @click="goBack"  class="back" src="../../assets/images/icon_back.png" alt="">
      </div>
      <div class="box-name" :style="{fontSize:$t('h.A001') ? $t('h.A001').length>20 ? '26px':'34px':null}">
        {{ $t('h.A001') }}
      </div>
      <div class="main">
        <img class="hat" src="@/assets/images/hat.png" alt="">
        <img class="pan_bgk" src="@/assets/images/pan_gbk.png" alt="">
        <div class="zp-box">
          <div class="panzi">
            <div class="bck-box" :style="` transform: rotate(${-90+180/list.length}deg)`">
              <div
                  class="bck"
                  v-for="(i,index) in list"
                  :key="index"
                  :style="`transform: rotate(${-index*360/list.length}deg) skew(${-90 + 360/list.length}deg);`"
              ></div>
            </div>
            <div
                class="jiang"
                :style="`transform: rotate(${-index*360/list.length}deg) translateY(-100px);`"
                v-for="(i,index) in list"
                :key="index"
            >
              <span class="title">{{i.prizeName}}</span>
              <div class="img">
                <!-- <img src="@/assets/img/bck.jpg" alt /> -->
                <!--                        img{{index}}-->
                <img src="@/assets/activity/activity.png" alt="">
              </div>
            </div>
          </div>
          <div class="start-btn" @click="start()">
            <img src="@/assets/images/go_icon.png" alt="">
          </div>
        </div>
        <div class="bottom_down">
          <img src="@/assets/images/down_bgk.png" alt="">
          <div class="num_down">
            {{ $t('h.A003') }}：{{ number }}
          </div>
        </div>
      </div>
      <div class="quick_people">
        <div class="titles">  {{ $t('h.A005') }}</div>
        <animateList class="box" :speed="0.5" ref="listScroll" >
          <div class="list">
            <div class="item" v-for="(item,index) in lists" :key="index">
              <div class="left">
                <img src="@/assets/images/activity_avatar.png" alt="">
                <span>{{ item.userName }}</span>
                <span class="gift">{{ item.prizeName }}</span>
              </div>
              <span class="time">{{ parseTime(item.createTimeStr)}}</span>
            </div>
          </div>
        </animateList>
      </div>
      <div class="quick_people" style="margin-top: 15px">
        <div class="titles">{{ $t('h.A006') }}</div>
        <div class="content">
          <span v-html="activityInfo.drawContent ? activityInfo.drawContent :''"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import animateList from "@/components/anmiote/index.vue";

import {lottery, lotteryGetNum, lottoList, prizeList} from "@/api/apiFox";
import {Toast} from "vant";
import { Dialog } from 'vant';
import {parseTime} from "@/utils";
import {nextTick} from "vue";
import {debounce} from "@/utils/evenNumbers";

export default {
  components:{animateList},
  computed: {
    animationClass() {
      switch (this.winner) {
        case 0:
          return 'wr0'
        case 1:
          return 'wr1'
        case 2:
          return 'wr2'
        case 3:
          return 'wr3'
        case 4:
          return 'wr4'
        case 5:
          return 'wr5'
        case 6:
          return 'wr6'
      }
    }
  },
  data() {
    return {
      winner: 2, //指定获奖下标 specified为true时生效
      specified: false, //是否指定获奖结果，false时为随机
      loading: false, //抽奖执行状态，防止用户多次点击
      panziElement: null,
      list: [
        // {
        //   prizeName: '特等奖'
        // },
        // {
        //   prizeName: '一等奖'
        // },
        // {
        //   prizeName: '二等奖'
        // },
        // {
        //   prizeName: '三等奖'
        // },

      ],
      activityInfo:'',
      number:0,
      gift:'',
      lists: [],
      // 控制 切换下一页是丝滑切换数据 还是回到顶部再滚动
      isSmoothSwitch:false
    }
  },
  mounted() {
    let s = sessionStorage.getItem('activity')
    if (s){
      this.activityInfo=JSON.parse(s)
      // this.number=this.activityInfo.lottoNumLimit ? this.activityInfo.lottoNumLimit:0
      this.getPrize(this.activityInfo.id)
    }else{
      this.$router.push('/')
    }


  },
  methods: {
    parseTime,
    start:debounce(function () {
      if (this.number>0){
        if (!this.loading) {
          this.panziElement = document.querySelector('.panzi')
          this.panziElement.classList.remove(this.animationClass)
          nextTick(()=>{
            lottery(this.activityInfo.id).then(res=>{

              if (res){
                let s= this.list.findIndex(item => item.id === res.id)
                this.winner=s
                this.winCallback()
                this.gift=res
              }else{
                this.loading = false
              }
            }).catch(err=>{ this.loading = false;
              console.log(err)})
          })
          this.loading = true
        }

      }else{
        Toast(this.$t('h.A004'))
      }
    },500),
    goBack(){
      sessionStorage.removeItem('activity')
      this.$router.push('/')
    },
    winCallback() {
      setTimeout(() => {
        this.panziElement.classList.add(this.animationClass)
      }, 0)
      setTimeout(() => {
        this.loading = false
        if (this.number>0){
          this.number-=1
        }
        Dialog.alert({
          title: this.content.public.cong[this.language],
          message: this.gift.prizeName,
          theme: 'round-button',
        }).then(() => {
          this.panziElement = document.querySelector('.panzi')
          this.panziElement.classList.remove(this.animationClass)
        });

      }, 3000)
    },
    getPrize(id){
      prizeList(id).then(res=>{

        if (res){
          for(let a=0;a<res.length;a++){
            this.list.push({payName:''})
          }
        }
        this.list=res
        let root = document.querySelector(':root')
        root.style.setProperty('--nums', this.list.length)
      }).catch(err=>{this.number=0})

      lotteryGetNum(id).then(res=>{
        this.number=res
      }).catch(err=>{
        this.number=0
      })

      lottoList(id).then(res=>{
        this.lists=res
      }).catch(err=>{})


    }

  }
}
</script>
<style lang="scss" scoped>
$zp_size: 230px; //转盘尺寸
$btn_size: 60px; //抽奖按钮尺寸
$time: 2s; //转动多少秒后停下的时间
.bgk{
  width: 100%;
  min-height: 100vh;
  position: fixed;
  z-index:0
}
.activity_body{
  width: 100%;
  min-height: 100vh;
  background: #B63036;
  padding: 3%;
  box-sizing: border-box;
  .title{
    width: 100%;
    height: 50px;
    display: flex;
    z-index: 999;
    position: relative;
    align-items: center;
    .back{
      width: 24px;
      height: 24px;
    }
  }
  .box-name{
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 34px;
    color: #fff;
    margin-bottom: 50px;
  }
  .main{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .pan_bgk{
      width: 293px;
      height: 293px;
      position: absolute;
    }
    .hat{
      position: absolute;
      height: 113px;
      z-index: 999;
      top: 115px;
      right:35px;
    }
    .zp-box {
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: $zp_size;
      height: $zp_size;
      /* 抽奖按钮 */
      .start-btn {
        display: inline-block;
        position: relative;
        z-index: 2;
        cursor: pointer;
        width: $btn_size;
        height: $btn_size;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        box-sizing: border-box;
        position: relative;
        z-index: 2;
        &::before {
          content: '';
          width: 0;
          height: 0;
          /*border: 2px solid transparent;*/
          /*border-top: 3px solid transparent;*/
          /*border-bottom: 3px solid #f53737;*/
          /*position: absolute;*/
          /*top: -5px;
          z-index: -1;*/
        }
        img{
          width: 60px;
        }
      }
      /* 盘子样式 */
      .panzi {
        overflow: hidden;
        border-radius: 50%;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        animation: rotate 10s linear infinite;
        /* 每个奖项的样式 */
        .jiang {
          position: absolute;
          .title {
            font-weight: bold;
            font-size: 12px;
            color: #3b3b3b;
            margin-top: 25px;
          }
          .img {
            margin: 0px auto;
            width: 40px;
            height: 40px;
            line-height: 20px;
            font-size: 12px;
            margin-top: -10px;
            /*border: 2px dashed #f87373;*/
            overflow: hidden;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              margin-top:0;
              height: 30px
            }
          }
        }
      }
      .bck-box {
        overflow: hidden;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        // background: blue;
        border-radius: 50%;

        /* 转盘扇形背景 */
        .bck {
          box-sizing: border-box;
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 1;
          top: -50%;
          left: 50%;
          transform-origin: 0% 100%;
          // transform:skew(30deg);
        }
        /* 转盘背景色 */
        .bck:nth-child(2n) {
          background: #fff;
        }
        .bck:nth-child(2n + 1) {
          background: #FFA6A2;
          //box-shadow: 0 0 5px red;
        }
      }
      .wr0,
      .wr1,
      .wr2,
      .wr3,
      .wr4,
      .wr5,
      .wr6,
      .wr7 {
        animation-duration: $time;
        animation-timing-function: ease;
        animation-fill-mode: both;
        animation-iteration-count: 1;
      }
      .wr0 {
        animation-name: play0;
      }
      .wr1 {
        animation-name: play1;
      }
      .wr2 {
        animation-name: play2;
      }
      .wr3 {
        animation-name: play3;
      }
      .wr4 {
        animation-name: play4;
      }
      .wr5 {
        animation-name: play5;
      }
      .wr6 {
        animation-name: play6;
      }
      .wr7 {
        animation-name: play7;
      }
      @keyframes rotate {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
      }

      @keyframes play0 {
        to {
          transform: rotate(calc(6 * 360deg + 360deg / var(--nums) * 0));
        }
      }
      @keyframes play1 {
        to {
          transform: rotate(calc(6 * 360deg + 360deg / var(--nums) * 1));
        }
      }
      @keyframes play2 {
        to {
          transform: rotate(calc(6 * 360deg + 360deg / var(--nums) * 2));
        }
      }
      @keyframes play3 {
        to {
          transform: rotate(calc(6 * 360deg + 360deg / var(--nums) * 3));
        }
      }
      @keyframes play4 {
        to {
          transform: rotate(calc(6 * 360deg + 360deg / var(--nums) * 4));
        }
      }
      @keyframes play5 {
        to {
          transform: rotate(calc(6 * 360deg + 360deg / var(--nums) * 5));
        }
      }
      @keyframes play6 {
        to {
          transform: rotate(calc(6 * 360deg + 360deg / var(--nums) * 6));
        }
      }
      @keyframes play7 {
        to {
          transform: rotate(calc(6 * 360deg + 360deg / var(--nums) * 7));
        }
      }
    }

    .bottom_down{
      width: 100%;
      min-height: 80px;
      display: flex;
      justify-content: center;
      position: absolute;
      margin-top: 340px;
      img{
        width: 258px;
        height: 114px;
      }
      .num_down{
        position: absolute;
        top: 65px;
        min-width: 114px;
        height: 28px;
        padding: 0 3px;
        background: #005B22;
        border-radius: 15px 15px 15px 15px;
        opacity: 1;
        font-size: 13px;
        color:#fff ;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .quick_people{
    margin-top: 120px;
    width: 100%;
    min-height: 250px;
    max-height: 300px;
    background: rgba(229,246,234,0.8);
    border-radius: 14px 14px 14px 14px;
    opacity: 1;
    .titles{
      width: 100%;
      height: 34px;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      background: #B63036;
      font-size: 15px;
      color: #fff;
      display: flex;
      padding: 0 3%;
      box-sizing: border-box;
      align-items: center;
    }
    .box{
      padding: 3%;
      box-sizing: border-box;
      width: 100%;
      height: 250px;
      font-size: 14px;
      .item{
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #CEB2B3;
        .left{
          width: 150px;
          height: 60px;
          display: flex;
          align-items: center;
          img{
            margin-right: 10px;
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }
          .gift{
            margin-left: 10px;
          }
        }

        .time{
          float: right;
        }
      }
    }
    .content{
      width: 100%;
      height: 165px;
      font-size: 14px;
      padding: 3%;
      box-sizing: border-box;
      text-indent: 24px;
      line-height: 24px;
    }
  }

}

</style>
