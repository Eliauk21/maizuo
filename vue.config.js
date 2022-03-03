module.exports = {
  publicPath:'./',
  devServer:{
      open:true,
      proxy:{
          '/api': {  
              target: 'https://api.iynn.cn/film/',
              changeOrigin: true,  //改变源
          }
      }
  }
}