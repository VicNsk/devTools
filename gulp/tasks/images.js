import webp from "gulp-webp";
import avif from "gulp-avif";
import imagemin from "gulp-imagemin";

export const img = () => {
	return app.gulp.src(app.path.img.src)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
      quality: 80,
			interlaced: true,
			optimizationLevel: 3 // 0 to 7
			}))
    //
    .pipe(app.gulp.dest(app.path.img.dest))
}

export const webpImg = () => {
	return app.gulp.src(app.path.img.srcImg)
		.pipe(webp())
    .pipe(app.gulp.dest(app.path.img.dest))
}

export const avifImg = () => {
	return app.gulp.src(app.path.img.srcImg)
		.pipe(avif())
    .pipe(app.gulp.dest(app.path.img.dest))
}