<template>
  <div
      ref="floatDrag"
      class="float-position"
      :style="{ left: left + 'px', top: top + 'px', right: right + 'px !important', zIndex: zIndex }"
      @touchmove.prevent
      @mousemove.prevent
      @mousedown="mouseDown"
      @mouseup="mouseUp"
  >
    <div class="content">
      <img src="@/assets/images/icon_chat_i.png" alt="">
    </div>
  </div>
</template>

<script>


export default {
  // components: {
  //   Icon,
  // },
  name: 'DragBall',
  props: {
    distanceRight: {
      type: Number,
      default: 36,
    },
    distanceBottom: {
      type: Number,
      default: 350,
    },
    isScrollHidden: {
      type: Boolean,
      default: false,
    },
    isCanDraggable: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 50,
    },
    value: {
      type: String,
      default: '悬浮球！',
    },
  },


  //data 域
  data() {
    return {
      clientWidth: null,
      clientHeight: null,
      left: null,
      top: null,
      right: null,
      timer: null,
      currentTop: 0,
      mousedownX: 0,
      mousedownY: 0,
    };
  },
  created() {
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
  },
  mounted() {
    this.isCanDraggable &&
    this.$nextTick(() => {
      this.floatDrag = this.$refs.floatDrag;
      // 获取元素位置属性
      this.floatDragDom = this.floatDrag.getBoundingClientRect();
      // 设置初始位置
      // this.left = this.clientWidth - this.floatDragDom.width - this.distanceRight;
      this.right = 0;
      this.top = this.clientHeight - this.floatDragDom.height - this.distanceBottom;
      this.initDraggable();
    });
    // this.isScrollHidden && window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    /**
      * 窗口resize监听
      */
    handleResize() {
      // this.clientWidth = document.documentElement.clientWidth;
      // this.clientHeight = document.documentElement.clientHeight;
      // console.log(window.innerWidth);
      // console.log(document.documentElement.clientWidth);


      this.checkDraggablePosition();
    },
    /**
      * 初始化draggable
      */
    initDraggable() {
      this.floatDrag.addEventListener('touchstart', this.toucheStart);
      this.floatDrag.addEventListener('touchmove', (e) => this.touchMove(e));
      this.floatDrag.addEventListener('touchend', this.touchEnd);
    },
    mouseDown(e) {
      const event = e || window.event;
      this.mousedownX = event.screenX;
      this.mousedownY = event.screenY;
      const that = this;
      let floatDragWidth = this.floatDragDom.width / 2;
      let floatDragHeight = this.floatDragDom.height / 2;
      if (event.preventDefault) {
        event.preventDefault();
      }
      this.canClick = false;
      this.floatDrag.style.transition = 'none';
      document.onmousemove = function (e) {
        var event = e || window.event;
        that.left = event.clientX - floatDragWidth;
        that.top = event.clientY - floatDragHeight;
        if (that.left < 0) that.left = 0;
        if (that.top < 0) that.top = 0;
        // 鼠标移出可视区域后给按钮还原
        if (
            event.clientY < 0 ||
            event.clientY > Number(this.clientHeight) ||
            event.clientX > Number(this.clientWidth) ||
            event.clientX < 0
        ) {
          this.right = 0;
          this.top = this.clientHeight - this.floatDragDom.height - this.distanceBottom;
          document.onmousemove = null;
          this.floatDrag.style.transition = 'all 0.3s';
          return;
        }
        if (that.left >= document.documentElement.clientWidth - floatDragWidth * 2) {
          that.left = document.documentElement.clientWidth - floatDragWidth * 2;
        }
        if (that.top >= that.clientHeight - floatDragHeight * 2) {
          that.top = that.clientHeight - floatDragHeight * 2;
        }
      };
    },
    mouseUp(e) {
      const event = e || window.event;
      //判断只是单纯的点击，没有拖拽
      if (this.mousedownY == event.screenY && this.mousedownX == event.screenX) {
        this.$emit('handlepaly');
        this.$router.push('/chat')
      }
      document.onmousemove = null;
      this.checkDraggablePosition();
      this.floatDrag.style.transition = 'all 0.3s';
    },
    toucheStart() {
      this.canClick = false;
      this.floatDrag.style.transition = 'none';
    },
    touchMove(e) {
      this.canClick = true;
      if (e.targetTouches.length === 1) {
        // 单指拖动
        let touch = event.targetTouches[0];
        this.left = touch.clientX - this.floatDragDom.width / 2;
        this.top = touch.clientY - this.floatDragDom.height / 2;
      }
    },
    touchEnd() {
      if (!this.canClick) return; // 解决点击事件和touch事件冲突的问题
      this.floatDrag.style.transition = 'all 0.3s';
      this.checkDraggablePosition();
    },
    /**
      * 判断元素显示位置
      * 在窗口改变和move end时调用
      */
    checkDraggablePosition() {
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
      if (this.left + this.floatDragDom.width / 2 >= this.clientWidth / 2) {
        // 判断位置是往左往右滑动
        this.left = this.clientWidth - this.floatDragDom.width;
      } else {
        this.left = 0;
      }
      if (this.top < 0) {
        // 判断是否超出屏幕上沿
        this.top = 0;
      }
      if (this.top + this.floatDragDom.height >= this.clientHeight) {
        // 判断是否超出屏幕下沿
        this.top = this.clientHeight - this.floatDragDom.height;
      }
    },
  },
};
</script>
<style>
html,
body {
  overflow: hidden;
}
</style>
<style scoped lang="scss">
.float-position {
  position: fixed;
  z-index: 10003 !important;
  right: 0;
  top: 50%;
  width: 70px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;


  .content {
    width: 50px;
    height: 50px;
    background: rgba(255,255,255,1);
    color: #fff;
    border-radius: 50%;
    position: relative;
    line-height: 80px;
    text-align: center;
    display: flex;
    align-items: center;
    align-content: center;
    img{
      height: 36px;
    }
    justify-content: center;
  }

  .close {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    right: -10px;
    top: -12px;
    cursor: pointer;
  }
}

.cart {
  border-radius: 50%;
  width: 5em;
  height: 5em;
  //display: flex;
  align-items: center;
  display: none;
  justify-content: center;
}

.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }

  .notice-badge {
    color: inherit;

    .header-notice-icon {
      font-size: 16px;
      padding: 4px;
    }
  }
}

.drag-ball .drag-content {
  overflow-wrap: break-word;
  font-size: 14px;
  color: #fff;
  letter-spacing: 2px;
}
</style>