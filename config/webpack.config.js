const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = (env) => require(`./webpack.${env}`)(env);

module.exports = ({ mode } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      entry: './src/index.ts',
      mode,
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(png|jpg|bmp)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  emitFile: true,
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        path: path.resolve(__dirname, '../dist'),
      },
      optimization: {
        minimize: false,
        usedExports: true,
        splitChunks: {
          chunks: 'all',
        },
      },
      node: {
        __dirname: true,
        __filename: true,
      },
      plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebPackPlugin({ template: './src/index.html' }),
      ],
    },
    modeConfig(mode),
  );
};
