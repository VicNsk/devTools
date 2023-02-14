export const resDev = () => {
  return app.gulp.src(app.path.res.src)
    .pipe(app.gulp.dest(app.path.res.dev))
}

export const resBuild = (cb) => {
  return app.gulp.src(app.path.res.src)
    .pipe(app.gulp.dest(app.path.res.prod))
    .pipe(app.gulp.dest(app.path.res.build))
}