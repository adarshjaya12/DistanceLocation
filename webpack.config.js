const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = [
    {
        entry: {
            global: './app/index.tsx'
        },
        output: {
            filename: 'global-bundle.js',
            path: path.resolve(__dirname, './static/'),
            sourceMapFilename: 'global-bundle.js.map'
        },
        devtool: "source-map",
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                },
				 {
                    enforce: "pre",
                    test: /\.tsx$/,
                    use: 'source-map-loader',
                    exclude: /node_module/
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                Promise: 'es6-promise'
            })
        ]
    },
    // {
        // entry: {
            // Home: './ClientApp/Home/Home-Form/home.tsx'
        // },
        // output: {
            // filename: 'home-form-bundle.js',
            // path: path.resolve(__dirname, './wwwroot/dist/'),
            // sourceMapFilename: 'home-form-bundle.js.map'
        // },
        // devtool: "source-map",
        // resolve: {
            // extensions: ['.ts', '.tsx', '.js'],
            // alias: {
                // //moment: '/moment/moment.js',
            // },
            // modules: ['node_modules']
        // },
        // module: {
            // rules: [
                // {
                    // test: /\.tsx$/,
                    // use: 'ts-loader'
                // },
                // {
                    // enforce: "pre",
                    // test: /\.tsx$/,
                    // use: 'source-map-loader',
                    // exclude: /node_module/
                // }
            // ]
        // }
    // },
    
    {
        entry: {
            Home: './Sass/Main.scss'
        },
        output: {
            filename: 'main.css',
            path: path.resolve(__dirname, './static/')
        },
        module: {

            rules: [
                /*
                your other rules for JavaScript transpiling go in here
                */
                { // regular css files
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('css-loader?importLoaders=1'),
                },
                { // sass / scss loader for webpack
                    test: /\.(sass|scss)$/,
                    loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
                },
                {
                    test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({ // define where to save the file
                filename: 'main.css',
                allChunks: true,
            }),
            new LiveReloadPlugin()
        ]
    }
];

module.exports = config;