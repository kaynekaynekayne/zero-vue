const {vueLoaderPlugin}=require('vue-loader/lib/plugin');
const path=require('path');

module.exports={
    entry:{
        app:path.join(__dirname,'main.js') //하나로 합쳐질 파일의 이름
    },
    module:{
        rules:[{
            test: /\.vue$/,
            loader: 'vue-loader'
        }],
    },
    plugins:[
        new vueLoaderPlugin()
    ],
    output:{
        filename:'[name].js',
        path:path.join(__dirname, 'dist'),
    }
}