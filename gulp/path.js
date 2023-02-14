/* path to project folders */
const appFolder = "./app"
const srcFolder = "./src"
const devFolder = "./app/dev"
const prodFolder = "./app/prod"
const buildFolder = "./app/build"

//
export const path = {
  src: srcFolder,
  dev: devFolder,
  prod: prodFolder,
  build: buildFolder,
  //
  res: {
    src: `${srcFolder}/assets/**/*.*`,
    dev: `${devFolder}`,
    prod: `${prodFolder}`,
    build: `${buildFolder}`
  },
  svg: {
    src: `${srcFolder}/images/svg/*.svg`,
    dest: `${srcFolder}/assets/img`,
  },
  img: {
    src: [`${srcFolder}/images/**/*.{jpg,jpeg,png,svg}`,
          `!${srcFolder}/images/svg/**/*.*`],
    srcImg: [`${srcFolder}/images/**/*.{jpg,jpeg,png}`,
          `!${srcFolder}/images/svg/**/*.*`],
    dest: `${srcFolder}/assets/img`
  },
  fonts: {
    src: `${srcFolder}/fonts`,
    dest: `${srcFolder}/assets/fonts`
  },
  html: {
    src: `${srcFolder}/pages/*.html`,
    watch: `${srcFolder}/**/*.html`,
    dev: `${devFolder}`,
    prod: `${prodFolder}`,
    build: `${buildFolder}`
  },
  css: {
    src: `${srcFolder}/sass/*.{scss, sass}`,
    watch: `${srcFolder}/sass/**/*.{scss, sass}`,
    dev: `${devFolder}/css`,
    prod: `${prodFolder}/css`,
    build: `${buildFolder}/css`
  },
  js: {
    src: [`${srcFolder}/js/main.js`,
          `!${srcFolder}/js/vendor/**/*.*`],
    watch: `${srcFolder}/js/**/*.js`,
    dev: `${devFolder}/js`,
    prod: `${prodFolder}/js`,
    build: `${buildFolder}/js`
  }

}