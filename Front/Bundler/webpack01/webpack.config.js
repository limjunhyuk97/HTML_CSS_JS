const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  // CLI 명령이 아니라, 구성옵션 파일로 '진입점 설정' 가능
  entry : './js/main.js',
  
  // '결과물(Bundle)을 반환'하는 설정
  output : {
    // path에 절대 경로를 반환해주어야 함 / path : path.resolve(__dirname, 'dist'),
    // 특별한 설정이 없으면 entry에 지정한 이름 그대로 들어가게 된다. / filename : 'main.js',
    clean : true
  },

  // 번들링 후 결과물 처리방식 등의, 다양한 처리방식을 설정해줄 수 있는 플러그인 설정 추가
  plugins : [
    new HtmlPlugin({
      template : './index.html'
    }),
    // static 폴더 안에 있는 내용이 copy되어 dist(output) 폴더 안으로 들어가게 된다.
    new CopyPlugin({
      patterns : [
        {from : 'static'}
      ]
    })
  ],

  devServer : {
    host : 'localhost'
  }

}