import pkg from 'gulp'
const { src, dest, series } = pkg

import concat        from 'gulp-concat'
import sourcemaps    from 'gulp-sourcemaps'
import postCss       from 'gulp-postcss'
import cssnano       from 'cssnano'
import autoprefixer  from 'autoprefixer'
import imagemin      from 'gulp-imagemin'
import changed       from 'gulp-changed'
import del           from 'del'

function cleandist() {
	return del('dist/**/*', { force: true })
}

function html() {
	return src(['app/**/*.html'])
		.pipe(dest('dist'));
}
function docs() {
	return src(['app/**/*.pdf', 'app/**/*.docx'])
		.pipe(dest('dist'));
}

function styles() {
	return src(['app/css/*.css', '!app/css/*.min.css'])
		.pipe(sourcemaps.init())
		.pipe(postCss([
			autoprefixer(),
			cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
		]))
		.pipe(concat('app.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/css'))
}

function scripts() {
	return src(['app/js/main.js']) // Укажите конкретный JS-файл
		.pipe(concat('app.min.js'))
		.pipe(dest('app/js'))
}

function images() {
	return src(['app/images/src/**/*'])
		.pipe(changed('app/images/'))
		.pipe(imagemin())
		.pipe(dest('app/images/'))
}

function buildcopy() {
	return src([
		'{app/js,app/css}/*.min.*',
		'app/images/**/*.*',
		'!app/images/src/**/*',
		'app/fonts/**/*'
	], { base: 'app/' })
	.pipe(dest('dist'))
}

export { scripts, styles, images, buildcopy, cleandist, html, docs }

export const build = series(
	cleandist,
	scripts,
	styles,
	images,
	html,
	docs,
	buildcopy
)
