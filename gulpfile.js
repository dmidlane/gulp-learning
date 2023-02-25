const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const gulpSass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
/*
-- TOP LEVEL FUNCTIONS --
  - gulp.task - define tasks
  - gulp.src - point to files we will use
  - gulp.dest - point to output folder
  - gulp.watch - watch files and folders for changes
*/

// Logs a message
async function message() { 
  console.log('gulp is running!!!!!!!!');
}

// copy html files from source folder to dest
async function copyHtml() { 
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
};

// minify images
async function imageMin() { 
  gulp.src('src/images/*.jpeg')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
};

// minify Javascript - using inside concat instead
// async function minifyJs(){
//   gulp.src('src/js/*.js')
//   .pipe(uglify())
//   .pipe(gulp.dest('dist/js'))
// };

// Compile SASS
async function sass(){
  gulp.src('src/sass/*.scss')
  .pipe(gulpSass().on('error', gulpSass.logError))
  .pipe(gulp.dest('dist/css'))
};

// Combine all js files into one and then minify the result
// using uglify
async function scripts(){
  gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
};

async function defaultTask() {
  console.log('running build');
  copyHtml();
  imageMin();
  // minifyJs();
  sass();
  scripts();
}

async function watch() {
  gulp.watch('src/js/*.js', scripts);
  gulp.watch('src/images/*', imageMin);
  gulp.watch('src/sass/*.sass', sass);
  gulp.watch('src/*html', copyHtml);
}


exports.default = defaultTask
exports.message = message
exports.copyHtml = copyHtml
exports.copyImages = imageMin
exports.scripts = scripts
exports.watch = watch

exports.sass = sass