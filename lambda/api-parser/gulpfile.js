const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');


gulp.task('clean', () => {
    gulp.src('dist/**/*.js', {read: false}).pipe(clean());
});

gulp.task('build', () => {
    tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist/'));
});
