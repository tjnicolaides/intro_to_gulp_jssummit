var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('default', function(){
	console.log('hello Javascript Summit 2015!');
});

gulp.task('sass', function () {
    return gulp.src('scss/main.scss')
		.pipe(sass())
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('css'));
});