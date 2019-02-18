
module.exports = {
    entry: './src/app.js',
    output: {
        filename: './dist/app.js',
        publicPath: '/',
    },
    watch: true,
    mode: 'development',
    devServer: {
        historyApiFallback: true,
      },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
            ]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            }
        }]
    }
};