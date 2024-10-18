const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    clean: true, // Очищает output папку перед новой сборкой
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css', // Имя выходного файла для CSS
      chunkFilename: '[id].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              // параметры по желанию
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // Извлечение CSS
          'css-loader', // Обработка CSS
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Поддержка различных форматов изображений
        type: 'asset/resource', // Хранение изображений в отдельной папке
        generator: {
          filename: 'images/[hash][ext][query]', // Путь, куда будут сохраняться изображения
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true, // Включает сжатие
    port: 9000, // Порт для dev server
  },
  resolve: {
    extensions: ['.js', '.ts', '.css'], // Автоматическое добавление расширений
  },
};
