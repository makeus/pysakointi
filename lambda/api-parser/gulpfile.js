const gulp = require('gulp');
const clean = require('gulp-clean');
const jest = require('gulp-jest').default;
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');


gulp.task('clean', () => {
    gulp.src('dist/**/*.js', {read: false}).pipe(clean());
});

gulp.task('build', ['clean'], () => {
    tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist/'));
});

gulp.task('test', ['clean'], () => {
    process.env.NODE_ENV = 'test';

    return gulp.src('tests').pipe(jest());
});