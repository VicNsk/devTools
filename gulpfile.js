/* connecting npm-modules */
import gulp from "gulp"
import { plugins } from "./gulp/plugins.js"

/* import configuration file */
import { path } from "./gulp/path.js"

/* global variable values */
global.app = {
  isDev: true,
  isProd: false,
  gulp: gulp,
	path: path,
  plugins: plugins
}

/* import tasks */
import { cleanDev, cleanBuild } from "./gulp/tasks/clean.js"
import { resDev, resBuild } from "./gulp/tasks/resources.js"
import { sprites } from "./gulp/tasks/sprites.js"
import { img, webpImg, avifImg } from "./gulp/tasks/images.js"
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js"
import { pages } from "./gulp/tasks/pages.js"
import { styles } from "./gulp/tasks/styles.js"
import { scripts, scriptsMin } from "./gulp/tasks/scripts.js"

/* task execution scripts */
const toProd = (done) => {
  app.isDev = false
  app.isProd = true
  done()
};

const images = gulp.series(img, webpImg, avifImg)
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle)
const resurses = gulp.parallel(sprites, images, fonts)
//
const mainDevTasks = gulp.series(resurses, resDev, gulp.parallel(pages, styles, scripts))
const mainBuildTasks = gulp.series(resurses, resBuild, gulp.parallel(pages, styles, scripts, scriptsMin))

/*  tracking changes in files */
const watcher = () => {
  gulp.watch(path.res.src, resDev)
  gulp.watch(path.svg.src, sprites)
  gulp.watch(path.img.src, images)
  gulp.watch(path.html.watch, pages)
  gulp.watch(path.css.watch, styles)
  gulp.watch(path.js.watch, scripts);
}
// developer/building tasks
const dev = gulp.series(cleanDev, mainDevTasks, watcher)
const build = gulp.series(toProd, cleanBuild, mainBuildTasks)

/* export of tasks and scripts */
export { build }
export { sprites }
export { images }
export { fonts }

export const fntStyle = gulp.series(fontStyle)


/* default task */
export default dev