
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

var webpack = require('webpack-stream');
var named   = require('vinyl-named');


gulp.task('styles', function () {
	gulp.src('src/styles/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('build/styles'));
});

gulp.task('scripts', function () {
	return gulp.src('src/scripts/*.jsx')
		.pipe(webpack({
			devtool: 'source-map',
			entry: {
				'xwingsidebar':          './src/scripts/xwingsidebar.jsx',
				'xwingsidebar-settings': './src/scripts/xwingsidebar-settings.jsx',
			},
			module: {
				loaders: [ { test: /\.jsx?$/, loader: 'babel' } ]
			},
			output: {
				filename: "[name].js"
			}
		}))
		.pipe(gulp.dest('./build/scripts'));
});


gulp.task('default', ['scripts', 'styles']);
