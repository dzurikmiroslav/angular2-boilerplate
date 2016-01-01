var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var sequence = require('gulp-sequence');
var ts = require('gulp-typescript');
var gls = require('gulp-live-server');

var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
  outDir: 'target'
});

gulp.task('js', function() {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(rename({
      dirname: 'app'
    }))
    .pipe(gulp.dest('target/'));
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('target'));
});

gulp.task('clean', function() {
  return gulp.src('target')
    .pipe(clean());
});

gulp.task('libs-js', function() {
  return gulp.src([
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/http.dev.js'
    ])
    .pipe(gulp.dest('target/lib'));
});
gulp.task('libs-bootstrap', function() {
  return gulp.src([
      'node_modules/bootstrap/dist/css/**',
      'node_modules/bootstrap/dist/fonts/**'
    ], {
      base: 'node_modules/bootstrap/dist/'
    })
    .pipe(gulp.dest('target/lib/bootstrap'));
});
gulp.task('libs', ['libs-js', 'libs-bootstrap']);

gulp.task('live', function() {
  var server = gls.static('target', 8888);
  server.start();

  gulp.watch(['target/**/*'], function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/**/*.ts'], ['js']);
});

gulp.task('default', sequence('clean', ['js', 'html', 'libs']));
