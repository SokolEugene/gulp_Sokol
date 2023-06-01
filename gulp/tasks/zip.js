import zipPlugin from "gulp-zip";
import deleteAsync from "del"

export const zip = () => {
	deleteAsync(`./${app.path.clean}.zip`);
	return app.gulp.src(`${app.path.clean}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "ZIP",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(zipPlugin(`${app.path.rootFolder}.zip`))
		.pipe(app.gulp.dest('./'));
}