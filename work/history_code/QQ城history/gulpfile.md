```css
const gulp = require('gulp');
const path = require('path');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const through2 = require('through2');
const imagemin = require('gulp-imagemin');
const minimist = require('minimist');

let appDir;
const dist = 'dist-qq'
const RESOLVE_DIST_QQ = path.resolve(__dirname, dist);
const nodeModules = ['blueimp-md5', 'crypto-js', 'redux', 'loose-envify', 'symbol-observable', 'mobx-miniprogram', 'mobx-miniprogram-bindings']
const knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
}
const options = minimist(process.argv.slice(2), knownOptions);

gulp.task('copy-dir', () => {
  const glob = [`${__dirname}/**`, `${__dirname}/dist-qq`];
  if (!options.test)[`!${__dirname}/**/__tests__`, `!${__dirname}/**/*.test.js`].forEach(e => glob.push(e));
  return gulp.src(glob).pipe(gulp.dest(dist))
})
// 编译stylus文件
gulp.task('stylus', () => {
  return gulp.src(`${dist}/**/*.styl`)
    .pipe(stylus())
    .pipe(rename({
      extanme: ".wxss"
    }))
    .pipe(gulp.dest(dist));
})
gulp.task('stylus1', () => {
  return gulp.src(`${__dirname}/**/*.styl`)
  .pipe(stylus())
  .pipe(rename({
    extname: ".wxss"
  }))
  .pipe(gulp.dest(__dirname))
})

gulp.task('imgs', () => {
  return gulp.src(`${dist}/**/*.{jpg,png,gif,svg}`)
    .pipe(gulp.dest(dist));
})

gulp.task('img-compress', () => {
  return gulp.src(`${dist}/**/*.{jpg,png,gif,svg}`)
    .pipe(imagemin())
    .pipe(gulp.dest(dist));
})

gulp.task('other', () => {
  return gulp.src(`${dist}/**/!(*.styl|*.jpg|*.png|*.gif|*.svg)`).pipe(gulp.dest(dist));
})

// 配置与模块
gulp.task('config', () => {
  return gulp.src(`${dist}/{app,project.config}.json`)
    .pipe(through2.obj(function(chunk, enc, cb){
      let projectConfig = JSON.parse(chunk.contents.toString());
      projectConfig.debug == !!options.debug;
      const result = `export default ${JSON.stringify(projectConfig)}`;
      chunk.contents = new Buffer(result);
      this.push(chunk);
      cb();
    }))
    .pipe(rename(function(path){
      path.basename = path.basename === 'app' ? 'app.config' : path.basename;
      path.extname = '.js';
    }))
    .pipe(gulp.dest(dist));
})
// 模块
gulp.task('modules', () => {
  const moduleDirs = nodeModules.join(',');
  return gulp.src(`node_modules/{${moduleDirs}}/**`).pipe(gulp.dest(`${dist}/node_modules`))
})
// 监听
gulp.task('watch', () => {
  const appWatch = gulp.watch(`${__dirname}/**`);
  appWatch.on('change', function(filepath, stats) {
    const dist = path.dirname(filepath).replace()
  })
})
// 开发模式
gulp.task('dev',
  gulp.series(
    'copy-dir',
    gulp.parallel('stylus', 'img-compress', 'other', 'config', 'modules'),
    function(done) {
      done();
    }
  ))
gulp.task('dev1',
  gulp.series(
    gulp.parallel('stylus1'),
    function(done) {
      done();
    }
))
```



```

```

```

```

