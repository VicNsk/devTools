import webpack from "webpack";
import webpackStream from "webpack-stream";

export const scripts = () => {
  return app.gulp.src(app.path.js.src)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      }))
    )
    //
    .pipe(webpackStream({
      mode: app.isDev ? 'development' : 'production',
      output: {filename: 'main.js'},
      module: {
        rules: [{
          test: /\.js$/,
          exclude: '/node_modules/',
          use: { loader: 'babel-loader' }
        }]
      },
      optimization: {minimize: false},
      devtool: app.isDev ? 'inline-source-map' : false,
    }, webpack))
    //
    .pipe(app.plugins.if(app.isDev, app.gulp.dest(app.path.js.dev)))
    .pipe(app.plugins.if(app.isProd, app.gulp.dest(app.path.js.build)))
}

export const scriptsMin = () => {
  return app.gulp.src(app.path.js.src)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      }))
    )
    //
    .pipe(webpackStream({
      mode: 'production',
      output: {filename: 'main.min.js'},
      module: {
        rules: [{
          test: /\.js$/,
          exclude: '/node_modules/',
          use: { loader: 'babel-loader' }
        }]
      },
      optimization: {minimize: true},
      devtool: false,
    }, webpack))
    //
    .pipe(app.gulp.dest(app.path.js.prod))
}