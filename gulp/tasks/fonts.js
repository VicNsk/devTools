import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
	// Ищем файлы шрифтов .otf
  return app.gulp.src(`${app.path.fonts.src}/*.otf`, {})
		// Конвертируем в .ttf
		.pipe(fonter({formats: ['ttf']}))
		// Выгружаем в исходную папку
		.pipe(app.gulp.dest(`${app.path.fonts.src}/`))
}

export const ttfToWoff = () => {
	// Ищем файлы шрифтов .ttf
	return app.gulp.src(`${app.path.fonts.src}/*.ttf`, {})
		// Выгружаем *.ttf
    .pipe(app.gulp.dest(`${app.path.fonts.dest}`))
		// Конвертируем в .woff
		.pipe(fonter({formats: ['woff']}))
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.fonts.dest}`))
		// Ищем файлы шрифтов .ttf
		.pipe(app.gulp.src(`${app.path.fonts.src}/*.ttf`))
		// Конвертируем в .woff2
		.pipe(ttf2woff2())
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.fonts.dest}`));
}

export const fontStyle = (cb) => {
  let fontsStyleFile = `${app.path.src}/sass/_fonts.scss`;
  // удаляем существующий файл стилей
  if (fs.existsSync(fontsStyleFile)) {fs.unlink(fontsStyleFile, cb)}
  // Проверяем существуют ли файлы шрифтов
	fs.readdir(app.path.fonts.dest, function (err, fontsFiles) {
		if (fontsFiles) {
      fs.writeFile(fontsStyleFile, '', cb);
			let newFileOnly;
      // Записываем подключения шрифтов в файл стилей
      for (var i = 0; i < fontsFiles.length; i++) {
        let fontFileName = fontsFiles[i].split('.')[0];
        if (newFileOnly !== fontFileName) {
          let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
          let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
          if (fontWeight.toLowerCase() === 'thin') {
            fontWeight = 100;
          } else if (fontWeight.toLowerCase() === 'extralight') {
            fontWeight = 200;
          } else if (fontWeight.toLowerCase() === 'light') {
            fontWeight = 300;
          } else if (fontWeight.toLowerCase() === 'medium') {
            fontWeight = 500;
          } else if (fontWeight.toLowerCase() === 'semibold') {
            fontWeight = 600;
          } else if (fontWeight.toLowerCase() === 'bold') {
            fontWeight = 700;
          } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
            fontWeight = 800;
          } else if (fontWeight.toLowerCase() === 'black') {
            fontWeight = 900;
          } else {
            fontWeight = 400;
          }
          fs.appendFile(fontsStyleFile, `@font-face {\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"),\n\t\turl("../fonts/${fontFileName}.woff") format("woff"),\n\t\turl("../fonts/${fontFileName}.ttf") format("ttf");\n\tfont-family: "${fontName}";\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n\tfont-display: swap;\n}\r\n`, cb);
          newFileOnly = fontFileName;
        }
      }
    }
  });

  return cb();
}