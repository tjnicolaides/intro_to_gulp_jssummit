var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var smushit = require('gulp-smushit');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
	console.log('hello Javascript Summit 2015!');
});

gulp.task('sass', function() {
	return gulp.src('scss/main.scss').pipe(sass()).on('error', function(err) {
		console.log(err.message);
	}).pipe(gulp.dest('css'));
});

gulp.task('smush', function() {
	return gulp.src('images/*.{jpg,png}').pipe(smushit({
		'verbose': true
	})).pipe(gulp.dest('images'));
});

gulp.task('minify', function() {
	
	var together = gulp.src([
			'js/src/vendor/jquery-1.11.1.min.js', 
			'js/src/vendor/jquery.validate.js', 
			'js/src/**/*.js', 
			'!js/src/vendor/modernizr-2.6.2.min.js'
		])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('js/dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/dist'));
		
	var separate = gulp.src('js/src/vendor/modernizr-2.6.2.min.js')
		.pipe(gulp.dest('js/dist/vendor'));
		
	return merge(together, separate);
});

gulp.task('lint', function() {
	return gulp.src(['js/src/**/*.js', '!js/src/vendor/*.js']) 
		// lint all js files but what's in the vendor dir
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});