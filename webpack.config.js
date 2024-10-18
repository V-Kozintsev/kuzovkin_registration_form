const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Очищает output папку перед новой сборкой
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // Применяется ко всем .js файлам
        exclude: /node_modules/, // Исключить папку node_modules
        use: {
          loader: 'babel-loader', // Используем babel-loader для обработки JS
        },
      },
      {
        test: /\.css$/, // Регулярное выражение для нахождения файлов .css
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, // Для обработки изображений и шрифтов
        type: 'asset/resource', // Webpack 5 использует asset module
        generator: {
          filename: 'images/[hash][ext][query]', // Путь к сохраненным изображениям
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
