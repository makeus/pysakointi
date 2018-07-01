const gulp = require('gulp');
const clean = require('gulp-clean');
const jest = require('gulp-jest').default;
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const npmDist = require('gulp-npm-dist');
const zip = require('gulp-zip');
const rename = require('gulp-rename');

gulp.task('clean', () => {
    return gulp.src(['build', 'dist'], {read: false, allowEmpty: true}).pipe(clean());
});

gulp.task('cleanBuild', () => {
    return gulp.src('build', {read: false, allowEmpty: true}).pipe(clean());
});

gulp.task('typescript', () => {
    return gulp.src('./src/**/*.ts', {base: './'})
        .pipe(tsProject())
        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace(/src/, '');
        }))
        .pipe(gulp.dest('build/'))
});

gulp.task('libs', () => {
    return gulp.src(npmDist(), {base: './node_modules/'})
        .pipe(gulp.dest('build/node_modules'));
});

gulp.task('zip', () => {
    return gulp.src('build/**/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('libs', 'typescript'), 'zip', 'cleanBuild'));

gulp.task('test', gulp.series('clean', () => {
    process.env.NODE_ENV = 'test';

    return gulp.src('tests').pipe(jest());
}));