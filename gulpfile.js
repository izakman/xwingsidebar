
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

var webpack = require('webpack-stream');
// var named   = require('vinyl-named');

var render = require('gulp-react-render');


gulp.task('styles', function () {
	return gulp.src('src/styles/*.scss')
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
				libraryTarget: 'commonjs2',
				filename: "[name].js"
			}
		}))
		.pipe(gulp.dest('./build/scripts'));
});

gulp.task('html', ['scripts'], function() {
	return gulp.src('src/*.html')
		.pipe(render())
		.pipe(gulp.dest('./build'));
});

gulp.task('default', ['scripts', 'styles']);
