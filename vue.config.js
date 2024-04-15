const { defineConfig } = require('@vue/cli-service')
const timeStamp = new Date().getTime()

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  pwa:{
    themeColor: 'none',
    iconPaths: {
      favicon32: 'favicon.png',
      favicon16: 'favicon.png',
      appleTouchIcon: 'favicon.png',
      maskIcon: 'favicon.png',
      msTileImage: 'favicon.png'
    }
  },
  devServer:{
    client:{
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    proxy:{
      '/h5Api':{
        target:process.env.VUE_APP_API_ROOT ,
        changeOrigin:true,
        ws:false,
        pathRewrite:{'^/h5Api':''},
      },
      '/public':{
        target : process.env.VUE_APP_API_ROOT,
        PathRewrite: { '^/public': '' },
        ws: false,
        changeOrigin: true
      },
    }
  },
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: `js/[name].${timeStamp}.js`,
      chunkFilename: `js/chunk.[id].${timeStamp}.js`,
    },
  },
  css: {
    extract: {
      filename: `css/[name].${timeStamp}.css`,
      chunkFilename: `css/chunk.[id].${timeStamp}.css`,
    },
  }
})
