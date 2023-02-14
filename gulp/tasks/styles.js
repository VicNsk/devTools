import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import groupMedia from 'gulp-group-css-media-queries'

const sass = gulpSass(dartSass);

export const styles = () => {
  return app.gulp.src(app.path.css.src, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      }))
    )
    //
    // .pipe(app.plugins.if(app.isDev, sass({ outputStyle: 'expanded' })))
    // .pipe(app.plugins.if(app.isProd, sass({ outputStyle: 'compressed' })))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(app.plugins.replace(/@_img\//g, '../img/'))
    .pipe(groupMedia())
    .pipe(autoprefixer())
    .pipe(app.plugins.if(app.isDev, app.gulp.dest(app.path.css.dev)))
    //
    .pipe(app.plugins.if(app.isProd, app.gulp.dest(app.path.css.build)))
    .pipe(app.plugins.if(app.isProd, cleanCss({level: 2})))
    .pipe(app.plugins.if(app.isProd, app.plugins.rename({ suffix: ".min" })))
    //
    .pipe(app.plugins.if(app.isProd, app.gulp.dest(app.path.css.prod)))
}