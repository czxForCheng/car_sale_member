<template>
  <div class="deal-hole">
    <Header></Header>
    <div class="safe"/>
    <div class="deal-home"
         v-loading="loading"
         :element-loading-text="loadingText"
         element-loading-background="rgba(0, 0, 0, 0.3)"
    >
      <img :src="form.productImage" alt="">
      <div class="product">
        <p class="title">
          {{ form.taskName }}
        </p>
        <p class="content">
          {{ form.productContent }}
        </p>
      </div>
      <van-divider/>
      <div class="product">
        <p class="title">
          {{ form.commission }} {{ website.supervisorName }}
        </p>
        <p class="content">
          {{ $t('h.o005') }}
        </p>
      </div>

      <div class="product">
        <p class="title">
          {{ form.productPrice }} {{ website.supervisorName }}
        </p>
        <p class="content">
          {{ $t('h.R018') }}
        </p>
      </div>
      <van-divider/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import {getItem, removeItem} from "@/utils/auth";
import {debounce} from "@/utils/evenNumbers";
import {editStatus, payOrderPrice} from "@/api/apiFox";
import {Toast} from "vant";

export default {
  components: {Header},
  data() {
    return {
      form: '',
      order: '',
      website: '',
      loadingText: '',
      loading: true
    }
  },
  methods: {
    dealSlip: debounce(function () {
      this.loading = true
      if (this.$route.query.value) {
        editStatus(this.order.id, 1, this.order.username, this.order.transactionAmount, this.order.orderNum).then(res => {
          setTimeout(() => {
            this.loading = false
            Toast(this.$t('h.R022'))
            this.$router.push('/task')
            removeItem('order')
          }, 5000)

        }).catch(err => {
          this.$router.push('/order')
          this.$router.push('/task')
          this.loading = false
        })

      } else {
        let data = {
          id: this.order.id,
          orderStatus: 1,
          username: this.order.username,
          transactionAmount: this.order.productPrice,
          productId: this.order.id,
          productName: this.order.taskName,
          productPrice: this.order.productPrice,
          productImage: this.order.productImage
        }
        payOrderPrice(data).then(res => {
          setTimeout(() => {
            this.loading = false
            Toast.success(this.$t('h.R022'))
            this.$router.push('/task')
            removeItem('order')
          }, 5000)
        }).catch(err => {
          this.loading = false
          const timer = setInterval(() => {
            clearInterval(timer);
            Toast.clear();
            if (err.code !== 300) {
              this.$router.push('/order')
            } else {
              this.$router.push('/task')
            }
          }, 2000);
        })
      }
    }, 600),
  },
  mounted() {
    this.loading = true
    this.dealSlip()
    this.loadingText = this.$t('h.R021')
    this.form = getItem('order')
    this.order = getItem('order')
    this.website = getItem('website')
  }
}
</script>

<style scoped lang="scss">
.deal-hole {
  width: 100%;
  min-height: 100vh;
  background: #fff;

  .safe {
    width: 100%;
    height: 60px;
  }

  .deal-home {
    width: 100%;
    padding: 3%;
    box-sizing: border-box;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0);
    position: relative;

    img {
      width: 100%;
      border-radius: 8px;
    }

    .booking {
      width: 300px;
      height: 120px;
      background: rgba(255, 255, 255, 1);
      margin-left: 6%;
      top: 2%;
      border-radius: 8px;
      position: absolute;
      padding: 3%;
      box-sizing: border-box;

      p {
        text-align: center;
        font-size: 14px;
        margin-bottom: 5px;
        color: #67C23A;
      }
    }

    .product {
      width: 100%;
      text-align: center;
      padding: 15px 0 0 0;

      .title {
        font-size: 18px;
        height: 34px;
        line-height: 34px;
      }

      .content {
        font-size: 14px;
        line-height: 36px;
      }
    }
  }
}
</style>