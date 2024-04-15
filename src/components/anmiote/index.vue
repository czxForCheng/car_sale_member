<template>
  <div class="listScroll" ref="box">
    <slot></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "listScroll",
  created() {},
  props: {
    // 控制动画滚动 速度
    speed: {
      default: 1,
      type: Number,
    },
    // 控制 鼠标移入滚动停止功能
    isMouseControl: {
      default: true,
      type: Boolean,
    },
    // 控制 滚动到底部是跳到下一页 还是无缝循环滚动
    isNextPage: {
      default: false,
      type: Boolean,
    },
    // 控制 切换下一页是丝滑切换数据 还是回到顶部再滚动
    // isSmoothSwitch: {
    //   default: true,
    //   type: Boolean,
    // },
  },
  mounted() {
    //在盒子内容高度小于可视高度时不滚动
    // if (this.boxHeight < this.ele0.clientHeight) {
    //   this.start(this.height);
    //   this.setEvet();
    // }
    // else {
    //   this.isScroll = false;
    // }
    this.start(this.height);
    // 根据props 控制鼠标移入功能
    if (this.isMouseControl) {
      this.setEvet();
    }
  },
  computed: {
    //第一个slot
    ele0() {
      return this.$refs.box.children[0];
    },
    //第二个slot
    ele1() {
      return this.$refs.box.children[1];
    },
    //盒子的可视高度
    boxHeight() {
      return this.$refs.box.clientHeight;
    },
  },
  data() {
    return {
      height: 0,
      isScroll: true,
    };
  },
  methods: {
    //鼠标移入停止滚动 移出继续滚动
    setEvet() {
      this.$refs.box.onmouseenter = () => {
        this.isScroll = false;
        // this.height = 0;
      };
      this.$refs.box.onmouseleave = () => {
        this.isScroll = true;
        this.$nextTick(() => {
          this.start(this.height);
        });
      };
    },
    //滚动方法
    start(height) {
      this.ele0.style = `transform:translateY(-${height}px);`;
      this.ele1.style = `height:${this.boxHeight}px;transform:translateY(-${height}px);overflow: hidden;`;

      if (height >= this.ele0.clientHeight) {
        // 判断滚动到底部是跳到下一页 还是无缝循环滚动
        if (this.isNextPage) {
          // 让父组件跳到下一页
          this.$emit('nextPage', 'hello');
        }else{
          this.height = 0;
        }

      } else {
        this.height += this.speed;
      }

      if (!this.isScroll) return;
      window.requestAnimationFrame(() => {
        this.start(this.height);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.listScroll {
  overflow: hidden;
}
.hover {
  overflow-y: auto;
}
.hide {
  display: none;
}
</style>le>