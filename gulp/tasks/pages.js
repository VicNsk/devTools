import fileInclude from "gulp-file-include"
import htmlformat from "gulp-format-html"
import htmlmin from "gulp-htmlmin"

export const pages = () => {
	return app.gulp.src(app.path.html.src)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
    //
    .pipe(fileInclude({
      prefix: '{{',
      suffix: '}}',
      basepath: '@file'
    }))
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(htmlformat())
    //
    .pipe(app.gulp.dest(app.path.html.dev))
    .pipe(app.plugins.if(app.isProd, app.gulp.dest(app.path.html.build)))
    .pipe(app.plugins.if(app.isProd, app.plugins.replace('.css', '.min.css')))
    .pipe(app.plugins.if(app.isProd, app.plugins.replace('.js', '.min.js')))
    .pipe(app.plugins.if(app.isProd, htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(app.plugins.if(app.isProd, app.gulp.dest(app.path.html.prod)))

}