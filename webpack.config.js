const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/,
                query:{
                    presets:['react', 'es2015', 'stage-0'],
                    plugins:['react-html-attrs','transform-class-properties','transform-decorators-legacy']
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                    attrs: [':data-src']
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist")
    }
  };