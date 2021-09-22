const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
// const gulpIf = require('gulp-if');
// const argv = require('yargs').argv;
const webp = require('gulp-webp');
const ttfToWoff = require('gulp-ttf2woff');
const ttfToWoff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const rename = require('gulp-rename');
const tinypng = require('gulp-tinypng-compress');
const imageminWebp = require('imagemin-webp');
const webpHtml = require('gulp-webp-html');
const fileInclude = require('gulp-file-include');
const scss = require('gulp-sass');
const groupMedia = require('gulp-group-css-media-queries');

// DEV
const clean = () => {
  return del(['dist'])
}

const fonts = () => {
  src('src/fonts/**/*.ttf')
    .pipe(ttfToWoff())
    .pipe(dest('dist/fonts'))
  return src('src/fonts/**/*.ttf')
    .pipe(ttfToWoff2())
    .pipe(dest('dist/fonts'))
}

const cb = () => { }

let srcFonts = 'src/css/fonts.scss';
let appFonts = 'dist/fonts';

const fontsStyle = (done) => {
  let file_content = fs.readFileSync(srcFonts);

  fs.writeFile(srcFonts, '', cb);
  fs.readdir(appFonts, function (err, items) {
    if (items) {
      let c_fontname;
      for (var i = 0; i < items.length; i++) {
        let fontname = items[i].split('.');
        fontname = fontname[0];
        if (c_fontname != fontname) {
          fs.appendFile(srcFonts, '@include font-face("' + fontname + '", "' + fontname + '", 400);\r\n', cb);
        }
        c_fontname = fontname;
      }
    }
  })

  done();
}

const styles = () => {
  return src('src/css/**/*.css')
    // .pipe(gulpIf(argv.prod, sourcemaps.init()))
    .pipe(concat('style.css'))
    .pipe(groupMedia())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      flexbox: true,
    }))
    // .pipe(gulpIf(argv.prod, cleanCSS({
    //   level: 2,
    // })))
    // .pipe(gulpIf(argv.prod, rename({
    //   suffix: '.min'
    // })))
    // .pipe(gulpIf(argv.prod, sourcemaps.write()))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
};

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'))
}

const htmlMinify = () => {
  return src('src/**/*.html')
    // .pipe(gulpIf(argv.prod, htmlMin({
    //   collapseWhitespace: true
    // })))
    // .pipe(gulpIf(argv.prod, rename({
    //   suffix: '.min'
    // })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img'))
}

const scripts = () => {
  return src([
    'src/js/**/*.js',
  ])
    // .pipe(gulpIf(argv.prod, sourcemaps.init()))
    // .pipe(gulpIf(argv.prod, babel({
    //   presets: ['@babel/env']
    // })))
    .pipe(concat('script.js'))
    // .pipe(gulpIf(argv.prod, uglify({
    //   toplevel: true,
    // }).on('error', notify.onError())))
    // .pipe(gulpIf(argv.prod, rename({
    //   suffix: '.min'
    // })))
    // .pipe(gulpIf(argv.prod, sourcemaps.write()))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    notify: false,
  })
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/**/*.jpeg',
  ])
    // .pipe(webp({
    //   quality: 75,
    // }))
    // .pipe(dest('dist/img'))
    // .pipe(src([
    //   'src/img/**/*.jpg',
    //   'src/img/**/*.png',
    //   'src/img/**/*.jpeg',
    // ]))
    // .pipe(tinypng({
    //   key: 'BKcgq6YDxMn86Hxx2mDX90BCqGbzk0H3',
    // }))
    .pipe(tinypng({
      key: '79Nfsxzlv5DRDMRcFcpX61pYDFx6xHCC',
    }))
    .pipe(dest('dist/img'))
}

watch('src/**/*.html', htmlMinify);
watch('src/css/**/*.css', styles);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);
watch('src/fonts/**/*.ttf', fonts);
watch('src/fonts/**/*.ttf', fontsStyle);
watch('src/img/svg/**/*.svg', svgSprites);
watch([
  'src/img/**/*.jpg',
  'src/img/**/*.png',
  'src/img/**/*.jpeg',
], images);

exports.clean = clean;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;
exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.images = images;
exports.default = series(resources, htmlMinify, fonts, scripts, styles, images, svgSprites, fontsStyle, watchFiles);

// BUILD
const htmlMinifyBuild = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const stylesBuild = () => {
  return src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(groupMedia())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      flexbox: true,
    }))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
};

const scriptsBuild = () => {
  return src([
    'src/js/**/*.js',
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('script.js'))
    .pipe(uglify({
      toplevel: true,
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const imagesBuild = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/**/*.jpeg',
  ])
    .pipe(webp({
      quality: 75,
    }))
    .pipe(dest('dist/img'))
    .pipe(src([
      'src/img/**/*.jpg',
      'src/img/**/*.png',
      'src/img/**/*.jpeg',
    ]))
    .pipe(tinypng({
      key: 'BKcgq6YDxMn86Hxx2mDX90BCqGbzk0H3',
    }))
    .pipe(dest('dist/img'))
}

exports.build = series(resources, htmlMinifyBuild, fonts, scriptsBuild, stylesBuild, imagesBuild, svgSprites, fontsStyle, watchFiles);