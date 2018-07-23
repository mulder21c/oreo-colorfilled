const gulp = require('gulp');
const webserver = require('gulp-webserver');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const gulpsync = require('gulp-sync')(gulp);
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const wait = require('gulp-wait');

const scssOpts = {
  outputStyle: 'compressed',
  sourceComments: false
};

gulp.task('clean', () => {
  del.sync(['./dist/']);
});

gulp.task('html', () => {
  return gulp.src(['source/html/**/*.html'])
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
});

gulp.task('css', () => {
  return gulp.src(['source/css/**/*.css'])
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('scss', () => {
  return gulp.src(['./source/scss/**/*.scss'])
    .pipe(wait(200))
    .pipe(sass(scssOpts).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 3 versions', 'ie > 9'] }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('images', () => {
  return gulp.src(['source/images/**/*'])
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(gulp.dest('./dist/images'))
    .pipe(livereload());
});

gulp.task('sprite', () => {
  const spriteData = gulp.src('./source/sprite/**/*.{png,jpg,gif,jpeg}')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      padding: 8
    }));

  const imgStream = spriteData.img
    .pipe(gulp.dest('./dist/images/'));

  const cssStream = spriteData.css
    .pipe(replace(/sprite\.png/gm, '/images/sprite.png'))
    .pipe(replace(/^\.icon-/gm, '.'))
    .pipe(gulp.dest('./source/scss/moduels/'));

  return merge(imgStream, cssStream);
});

gulp.task('libs', () => {
  return gulp.src(['source/libs/**/*'])
    .pipe(gulp.dest('./dist/libs'))
    .pipe(livereload());
});

gulp.task('js-vender', () => {
  return gulp.src([
      'node_modules/clipboard/dist/clipboard.js',
      'node_modules/lodash/lodash.js',
      'node_modules/requirejs/require.js'
    ])
    .pipe(uglify())
    .pipe(concat('vender.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js-entry', () => {
  return gulp.src(['source/js/**/*'])
    .pipe(babel({
      presets: [['env',{
        'targets': {
          'browsers': ['last 3 versions', 'ie > 9']
        }
      }]]
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js', ['js-vender', 'js-entry']);

gulp.task('webserver', () => {
  return gulp.src('./dist/')
    .pipe(webserver({
      livereload: true,
      host: 'localhost',
      port: 8888,
      open: true
    }));
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(['source/html/**/*'], ['html']);
  gulp.watch(['source/css/**/*'], ['css']);
  gulp.watch(['source/scss/**/*'], ['scss']);
  gulp.watch(['source/libs/**/*'], ['libs']);
  gulp.watch(['source/images/**/*'], ['images']);
  gulp.watch(['source/js/**/*'], ['js']);
  gulp.watch(['source/sprite/**/*'], ['sprite']);
});

gulp.task('default', gulpsync.sync(['html', 'css', 'scss', 'libs', 'sprite', 'images', 'js', 'watch', 'webserver']));
