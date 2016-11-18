const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sysBuilder = require('systemjs-builder');
const runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();


gulp.task('clean:dist:js', function () {
  return del('public/dist/**/*');
});

gulp.task('clean:lib', function () {
  return del('public/lib/**/*');
});

// copy dependencies

gulp.task('copy:libs', function() {
  gulp.src(['node_modules/rxjs/**/*'])
    .pipe(gulp.dest('public/lib/js/rxjs'));
gulp.src(['node_modules/angular-in-memory-web-api/**/*'])
    .pipe(gulp.dest('public/lib/js/angular-in-memory-web-api'));
  // concatenate non-angular2 libs, shims & systemjs-config
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'system.config.js',
  ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/lib/js'));

  // copy source maps
  gulp.src([
    'node_modules/es6-shim/es6-shim.map',
    'node_modules/reflect-metadata/Reflect.js.map',
    'node_modules/systemjs/dist/system-polyfills.js.map'
  ]).pipe(gulp.dest('public/lib/js'));

  gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.*'
  ]).pipe(gulp.dest('public/lib/css'));

  return gulp.src(['node_modules/@angular/**/*'])
    .pipe(gulp.dest('public/lib/js/@angular'));
});
// TypeScript compile
gulp.task('compile:ts', function () {
  return gulp
    .src('app/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('public/dist/js'));
});
// Minify JS bundle
gulp.task('minify:js', function() {
  return gulp
    .src('public/dist/js/app.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'));
});

gulp.task('bundle:js', function() {
  var builder = new sysBuilder('public', './systemjs.config.js');
  return builder.buildStatic('app', 'public/dist/js/app.min.js')
    .then(function () {
      return del(['public/dist/js/**/*', '!public/dist/js/app.min.js']);
    })
    .catch(function(err) {
      console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
    });
});

gulp.task('copy', function(callback) {
  runSequence('clean:lib', 'copy:libs', callback);
});

gulp.task('scripts', function(callback) {
  runSequence(['clean:dist:js'], 'compile:ts', 'bundle:js', 'minify:js', callback);
});

gulp.task('build', function(callback) {
  runSequence('copy', 'scripts', callback);
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.ts', ['scripts']);
});