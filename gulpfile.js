var gulp = require('gulp')
var babel = require('gulp-babel')
var sourcemaps = require('gulp-sourcemaps')
var replace = require('gulp-replace')
var path = require('path')
var jison = require('gulp-jison')
var merge = require('gulp-merge')
var through = require('through2')
var main = path.basename(require('./package.json').main, '.js')

gulp.task('build', function () {
  return merge(
    gulp.src(main + '.jison')
      .pipe(jison({
        moduleType: 'commonjs'
      }))
      .pipe(through.obj(function (file) {
        file.contents = new Buffer(String(file.contents).split(
          'if (typeof require !== \'undefined\' && typeof exports !== ' +
          '\'undefined\')')[0] + 'module.exports=parser.parse.bind(parser);')
        this.push(file)
      })),
    gulp.src('{cli,lib/**/*}.js')
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(replace(/#!\/usr\/bin\/env babel-node/, '#!/usr/bin/env node'))
    .pipe(sourcemaps.write('../maps'))
  )
  .pipe(gulp.dest('dist'))
})
