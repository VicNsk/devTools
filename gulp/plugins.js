/* connecting npm-modules */
import gulpif from "gulp-if"
import plumber from "gulp-plumber"
import notify from "gulp-notify"
import replace from "gulp-replace"
import rename from "gulp-rename"

/* list plugins */
export const plugins = {
  plumber,
  notify,
  replace,
  rename,
  if: gulpif
}