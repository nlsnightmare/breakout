const path = require('path');

module.exports = {
    entry: './src/code.js',
    mode: 'development',
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    devServer:{
        overlay:true,
        contentBase: path.join(__dirname,'dist'),
        compress: true,
        port:8001
    },
};
