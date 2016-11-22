
var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');

var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var webpack = require('webpack-stream');

var filter = require('gulp-filter');
var render = require('gulp-render-react');
var wrap   = require('gulp-wrap');


gulp.task('styles', function () {
	return gulp.src('src/styles/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('build/styles'));
});

gulp.task('scripts', function () {
    var widgetFilter   = filter('**/xwingsidebar-widget.js', {restore: true});
    var settingsFilter = filter('**/xwingsidebar-settings.js', {restore: true});
    
	return gulp.src('src/scripts/*.jsx')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(webpack({
			devtool: 'source-map',
			entry: {
				'xwingsidebar-widget':   './src/scripts/xwingsidebar-widget.jsx',
				'xwingsidebar-settings': './src/scripts/xwingsidebar-settings.jsx',
			},
			module: {
				loaders: [ { test: /\.jsx?$/, loader: 'babel' } ]
			},
			output: {
				libraryTarget: 'umd',
				filename: "[name].js"
			}
		}))
		.pipe(gulp.dest('./build/scripts'))
		.pipe(filter('**/*.js'))
		
		.pipe(widgetFilter)
		.pipe(render({type: 'string'}))
		.pipe(wrap({ src: './src/widget-template.html'}))
        .pipe(widgetFilter.restore)
        
		.pipe(settingsFilter)
		.pipe(render({type: 'string'}))
		.pipe(wrap({ src: './src/settings-template.html'}))
        .pipe(settingsFilter.restore)
        
	    .pipe(gulp.dest('./build'));
});


gulp.task('default', ['scripts', 'styles']);
