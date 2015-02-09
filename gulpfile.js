var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var smushit = require('gulp-smushit');
var concat = require('gulp-concat');
var merge = require('merge-stream');

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
	
	var together = gulp.src(['js/src/**/*.js', '!js/src/vendor/modernizr-2.6.2.min.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('js/dist'));
		
	var separate = gulp.src('js/src/vendor/modernizr-2.6.2.min.js')
		.pipe(gulp.dest('js/dist/vendor'));
		
	return merge(together, separate);
});