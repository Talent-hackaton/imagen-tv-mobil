var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  return gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(gulp.dest('public/css'))
});

gulp.task("cargarINDEX",()=>{
	gulp.src('./src/' + "**/*.html")
		.pipe(gulp.dest('public'));
});

/*gulp.task('cargarJS', () =>{
	gulp.src('./src/' + 'js/*.js')
		.pipe(gulp.dest('public/js'));
});
*/


gulp.task('default', ['sass', 'cargarINDEX' ]);
