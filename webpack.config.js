const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const flexbugs = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const isDebug = process.env.NODE_ENV !== 'production';

function configureCssLoader() {
    const base = [
        ...isDebug ? [{ loader: 'style-loader' }] : [],
        { loader: 'css-loader', options: { url: true, importLoaders: 1 } },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: () => (isDebug
                    ? [flexbugs, autoprefixer()]
                    : [flexbugs, autoprefixer(), cssnano({ preset: 'default' })]
                )
            }
        },
        {
            loader: 'sass-loader',
            options: { precision: 9 }
        }
    ];

    return !isDebug
        ? ExtractTextPlugin.extract({ use: base, fallback: 'style-loader' })
        : base;
}

module.exports = {
    entry: { main: './src/app.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            // {
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, "css-loader"]
            // },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         "style-loader", // creates style nodes from JS strings
            //         "css-loader", // translates CSS into CommonJS
            //         "sass-loader" // compiles Sass to CSS, using Node Sass by default
            //     ]
            // }
            // {
            //     test: /\.scss$/,
            //     exclude: /node_modules/,
            //     use: configureCssLoader()
            // },
            {
                test: /\.scss$/,
                use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};