import injectHTML from "vite-plugin-html-inject";
import path from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        // 추가하고 싶은 페이지는 pages에서 추가하면 됨
        main: path.resolve(__dirname, "index.html"), // 홈
        todo: path.resolve(__dirname, "todo.html"), // todo
        movies: path.resolve(__dirname, "pages/movies.html"), // 영화
        stock: path.resolve(__dirname, "pages/stock.html"), // 주식
        weather: path.resolve(__dirname, "pages/weather.html"), // 날씨
      },
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    injectHTML(),
    // handlebars({
    //   partialDirectory: path.resolve(__dirname, "partials"),
    // }),
  ],
};
