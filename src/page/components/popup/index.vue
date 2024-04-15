<template>
  <div>
    <el-dialog
        :visible.sync="isShow"
        width="800px"
        :before-close="closePopup">
        <div class="contents">
          <span v-html="renderedContent"></span>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:['isShow','content'],
  data(){
    return{
      show:true
    }
  },
  computed: {
    renderedContent() {
      let modifiedContent = this.content.replace(/<img(.*?)src="(.*?)"(.*?)>/g, (match, p1, p2, p3) => {
        return `<img${p1}src="${p2}" style="width: 100% !important; height: 80%!important;">`;
      });
      return modifiedContent;
    }
  },

  methods:{
    closePopup(){
      sessionStorage.removeItem('tips')
      this.$emit('closePopup',true)
    },

    // getWebsite(){
    //   announcementList().then(res=>{
    //     this.content=res.data.content
    //   }).catch(err=>{})
    // }
  },

  mounted() {
    // this.getWebsite()
  }
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar{
  display: none;
}
.contents{
  width: 100%;
  overflow-y: scroll;
  min-height: 400px;
  //background: #fff;
}
</style>