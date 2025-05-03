import fs from 'fs'
import fonter from 'gulp-fonter'
import  ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
  // Ищем файлы с расширением .otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error <%= error.message %>"
      })
    ))
    // Конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    // Выгружаем в исходную папку
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
    /**************************************************** */
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/fonts/`))
}

export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error <%= error.message %>"
      })
    ))
    .pipe(fonter({
      formats: ['woff']
    }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    /************************************************* */
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // Конвертируем в .woff2
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/fonts/`))
}

export const fontsSttyle = () => {
  // Файл подклучения шрифтов
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // Проверем существование файла шрифтов 
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем существут ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // Если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb)
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Записываем подключенияшрифтов в файлы стилей
          const fontFileName = fontsFiles[i].split('.')[0];
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
            // fs.appendFile(fontsFile, 
              // `@font-face {
                // font-family: ${fontName};
                // font-weight: ${fontWeight};
                // font-display: swap;
                // font-style: normal;
                // src: url('../fonts/${fontName}.woff2') format('woff2'),
                  // url('../fonts/${fontName}.woff') format('woff'),
              // }/r/n`, cb);
            fs.appendFile(fontsFile, `@font-face {\tfont-family: '${fontName}';\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontName}.woff2') format('woff2'),\n\turl('../fonts/${fontName}.woff') format('woff'),\n\turl('../fonts/${fontName}.ttf') format('truetype');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        // Если файл есть, выводим сообщение
        console.log('Файл scss/fonts.scss уже существует. Для обновления файла его нужно удалить') 
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb () {}
}