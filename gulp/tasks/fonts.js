import fs, { appendFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
//import { formats, normalize } from 'path';

export const otfToTtf = () => {
	// Ищем файлы шрифтов .otf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		//Конвертируем в .ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Выгружаем в исходную папку
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	// Ищем файлы шрифтов .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		// Конвертация в .woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// ВЫгружаем в папкус результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Ищем файлы шрифтов .ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		// Конвертируем в .woff2
		.pipe(ttf2woff2())
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}



/* коммент с ютуба
const fontStyle = () => {
	// Словарь возможных вариаций шрифта
	const fontDictionary = {
		THIN: 100,
		EXTRALIGHT: 200,
		LIGHT: 300,
		REGULAR: 400,
		MEDIUM: 500,
		SEMIBOLD: 600,
		BOLD: 700,
		EXTRABOLD: 800,
		HEAVY: 800,
		BLACK: 900,
	}

	// Путь файла стилей подключения шрифтов
	const fontStyle = `${app.path.pathSrc}/scss/config/fonts.scss`;

	// Проверяем существует ли файл стилей для подключения шрифтов
	if (fs.existsSync(fontStyle)) {
		console.log(`Файл ${fontStyle} уже существует. Для обновления файла нужно его удалить!`);
		return app.gulp.src(app.path.pathSrc);
	}

	// получаем уникальный набор шрифтов
	const fontFiles = fs.readdirSync(app.path.build.fonts).reduce((res, fontFile) => {
		// Имя файла без разрешения
		const fileNoExt = path.parse(fontFile).name;

		let fontWeightName = fileNoExt.split('-')[1]?.toUpperCase();
		const fontName = fileNoExt.split('-')[0] || fileNoExt;
		const fontWeight = fontDictionary[fontWeightName] || 400;

		res[fileNoExt] = {
			fontName,
			fontWeight,
		}
		return res;
	}, {})

	// формируем файл стилей для полученных шрифтов
	Object.keys(fontFiles).forEach(font => {
		fs.appendFileSync(fontStyle,
			`@font-face {
			  font-family: ${fontFiles[font].fontName};
			  font-display: swap;
			  src: url("../fonts/${font}.woff2") format("woff2"), url("../fonts/${font}.woff") format("woff");
			  font-weight: ${fontFiles[font].fontWeight};
			  font-style: normal;
			}\r\n`)
	})

	return app.gulp.src(`${app.path.pathSrc}`)
}*/


export const fontsStyle = () => {
	// Файл стилей подлкючения шрифтов
	let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
	// Проверям существую ли файлы шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверям существуют ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, создаем его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[0] : fontFileName;
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
						fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			}
			else {
				// Если файл есть, выводим сообщение
				console.log("Файл scss/fonts.scss уже существует для обновления файла нужно его удалить!");
			}

		}


	});


	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
}


