const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const pEnv = process.env;
    const development =
        argv.mode === 'development' || pEnv.NODE_ENV === 'development';

    const sourceFolder = path.join(__dirname, 'src/common');
    const buildFolder = path.join(__dirname, 'build');
    const publicFolder = development
        ? buildFolder
        : path.join(buildFolder, 'public');

    return {
        entry: [
            './src/index',
        ],
        target: 'web',
        mode: development ? 'development' : 'production',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            symlinks: false,
        },
        devtool: development ? 'source-map' : false,
        // optimization: development
        //     ? {}
        //     : {
        //         minimize: true,
        //         minimizer: [
        //             new TerserPlugin({
        //                 cache: true,
        //                 parallel: true,
        //                 // sourceMap: true,
        //                 terserOptions: {
        //                     warnings: false,
        //                     parse: {},
        //                     compress: {
        //                         comparisons: false,
        //                     },
        //                     mangle: true,
        //                     // module: false,
        //                     output: {
        //                         comments: false,
        //                         ascii_only: true,
        //                     },
        //                     // toplevel: false,
        //                     // nameCache: null,
        //                     // ie8: false,
        //                     // keep_classnames: undefined,
        //                     // keep_fnames: false,
        //                     // safari10: false,
        //                 },
        //             }),
        //         ],
        //         nodeEnv: 'production',
        //         usedExports: true,
        //         sideEffects: true,
        //         concatenateModules: true,
        //         splitChunks: {
        //             chunks: 'all',
        //             minSize: 30000,
        //             minChunks: 1,
        //             maxAsyncRequests: 5,
        //             maxInitialRequests: 3,
        //             name: true,
        //             cacheGroups: {
        //                 commons: {
        //                     test: /[\\/]node_modules[\\/]/,
        //                     name: 'vendor',
        //                     chunks: 'all',
        //                 },
        //                 main: {
        //                     chunks: 'all',
        //                     minChunks: 2,
        //                     reuseExistingChunk: true,
        //                     enforce: true,
        //                 },
        //             },
        //         },
        //         runtimeChunk: true,
        //     },
        module: {
            rules: [
                {
                    test: /\.(j|t)sx?$/,
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                formatter: require.resolve(
                                    'react-dev-utils/eslintFormatter',
                                ),
                                eslintPath: require.resolve('eslint'),
                                emitWarning: true,
                            },
                            loader: require.resolve('eslint-loader'),
                        },
                    ],
                    include: sourceFolder,
                },
                { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/react',
                                    [
                                        '@babel/env',
                                        {
                                            modules: false,
                                            targets: {
                                                browsers: ['last 2 versions'],
                                            },
                                        },
                                    ],
                                ],
                                plugins: [
                                    [
                                        '@babel/plugin-proposal-decorators',
                                        { legacy: true },
                                    ],
                                    '@babel/plugin-proposal-object-rest-spread',
                                    '@babel/plugin-proposal-class-properties',
                                    'babel-plugin-styled-components',
                                ],
                                cacheDirectory: true,
                            },
                        },
                    ],
                    include: [path.join(__dirname, 'src/client'), sourceFolder],
                },
                {
                    test: /\.(txt)$/,
                    use: 'raw-loader',
                },
                {
                    test: /\.(html)$/,
                    use: 'html-loader',
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|gif|png|svg|ico)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10 * 1024,
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65,
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // webp: {
                                //     quality: 75,
                                // },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                __DEV__: development,
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, 'public'),
                        to: publicFolder,
                    },
                ],
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: path.join(publicFolder, 'index.html'),
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
            new HtmlWebpackInjector(),
            new Dotenv({
                systemvars: false,
            }),
        ].filter(x => !!x),
        output: {
            path: publicFolder,
            publicPath: '/',
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].chunk.js',
        },
    };
};
