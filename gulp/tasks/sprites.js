import svgSprite from "gulp-svg-sprite"
import svgmin from "gulp-svgmin"
import cheerio from "gulp-cheerio"

//svg sprite
export const sprites = () => {
  return app.gulp.src(app.path.svg.src)
    .pipe(svgmin({js2svg: {pretty: true,},}))
    .pipe(cheerio({run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');},
        parserOptions: {xmlMode: true},}))
    .pipe(app.plugins.replace('&gt;', '>'))
    .pipe(svgSprite({mode: {stack: {sprite: "../sprite.svg"}},}))
    .pipe(app.gulp.dest(app.path.svg.dest));
}