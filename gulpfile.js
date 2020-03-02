const { src, dest, watch, series, parallel } = require('gulp');
const webserver = require('gulp-webserver');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const wait = require('gulp-wait');

const scssOpts = {
  outputStyle: 'compressed',
  sourceComments: false
};

const clean = () => {
  return del.sync(['./dist/']);
}

const html = () => {
  return src(['source/html/**/*.html'])
    .pipe(dest('./dist/'))
    .pipe(livereload());
}

const css = () => {
  return src(['source/css/**/*.css'])
    .pipe(dest('./dist/css'))
    .pipe(livereload());
}

const scss = () => {
  return src(['./source/scss/**/*.scss'])
    .pipe(sass(scssOpts).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 3 versions', 'ie > 9'] }))
    .pipe(dest('./dist/css'))
    .pipe(livereload());
}

const images = () => {
  return src(['source/images/**/*.*'])
    .pipe(dest('./dist/images'))
    .pipe(livereload());
}

const imagesMinify = () => {
  return src(['source/images/**/*.*'])
  .pipe(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo()
  ]))
  .pipe(dest('./dist/images'))
  .pipe(livereload());
};

const sprite = () => {
  const spriteData = src('./source/sprite/**/*.{png,jpg,gif,jpeg}')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      padding: 8
    }));

  const imgStream = spriteData.img
    .pipe(dest('./dist/images/'));

  const cssStream = spriteData.css
    .pipe(replace(/sprite\.png/gm, '/images/sprite.png'))
    .pipe(replace(/^\.icon-/gm, '.'))
    .pipe(dest('./source/scss/modules/'));

  return merge(imgStream, cssStream);
}

const libs = () => {
  return src(['source/libs/**/*'])
    .pipe(dest('./dist/libs'))
    .pipe(livereload());
}

const jsVendor = () => {
  return src([
    'node_modules/es6-promise/dist/es6-promise.auto.min.js',
    'node_modules/lodash/lodash.js',
    'node_modules/axios/dist/axios.min.js',
    'node_modules/clipboard/dist/clipboard.js',
    'node_modules/requirejs/require.js'
  ])
  .pipe(uglify())
  .pipe(concat('vender.js'))
  .pipe(dest('./dist/js'));
}

const jsEntry = () => {
  return src(['source/js/**/*'])
    .pipe(babel({
      presets: [['env',{
        'targets': {
          'browsers': ['last 3 versions', 'ie > 9']
        }
      }]]
    }))
    .pipe(dest('./dist/js'));
}

const runServer = () => {
  return src('./dist/')
    .pipe(webserver({
      livereload: true,
      host: 'localhost',
      port: 8888,
      open: true
    }));
}

const watchTask = () => {
  watch('source/html/**/*', html);
  watch('source/css/**/*', css);
  watch('source/scss/**/*', scss);
  watch('source/libs/**/*', libs);
  watch('source/images/**/*', images);
  watch('source/js/**/*', jsEntry);
  watch('source/sprite/**/*', sprite);
}

exports.default = series(html, css, scss, libs, sprite, images, jsVendor, jsEntry, runServer, watchTask);
exports.build = series(html, css, scss, libs, sprite, images, jsVendor, jsEntry);