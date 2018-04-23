var gulp = require('gulp')
var responsive = require('gulp-responsive');

var through = require('through2')
var yaml = require('js-yaml')
var probe = require('probe-image-size')
var Vinyl = require('vinyl')
var replaceExt = require('replace-ext')
var del = require('del');
var merge = require('lodash/merge')

var fs = require('fs')

gulp.task('clean', function () {
  return del('content/**/*');
});

gulp.task('text', () => {
  return gulp.src('text/**/*', {base: 'text/'})
    .pipe(gulp.dest('content'))
})

gulp.task('images', () => {
    return gulp.src('images/**/*.{png,gif,jpg,jpeg}', {base: 'images/'})
      .pipe(metadata())
      .pipe(responsive({
        '**/*.{png,gif,jpg,jpeg}': [{
          width: 600,
          height: 600,
          rename: {
            suffix: '-md',
            extname: '.jpg'
          }
        }, {
          width: 1024,
          height: 1024,
          rename: {
            extname: '.jpg'
          }
        }, {
          width: 2048,
          height: 2048,
          rename: {
            suffix: '-xl',
            extname: '.jpg'
          }
        }, {
          width: 600,
          height: 600,
          rename: {
            suffix: '-md',
            extname: '.webp'
          }
        }, {
          width: 1024,
          height: 1024,
          rename: {
            extname: '.webp'
          }
        }, {
          width: 2048,
          height: 2048,
          rename: {
            suffix: '-xl',
            extname: '.webp'
          }
        }],
      }, {
        quality: 80,
        sharpen: true,
        max: true,
        errorOnEnlargement: false,
        errorOnUnusedImage: false,
        passThroughUnused: true,
        strictMatchImages: false
      }))
      .pipe(gulp.dest('content'))
});

gulp.task('default', gulp.series('clean', gulp.parallel('text', 'images')))

function metadata() {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'))
      return callback(null, file)
    } else if (file.isBuffer()) {
      var txtFile = file.path + '.txt'
      fs.readFile(txtFile, 'utf8', (err, str) => {
        if (err) return writeAspectRatio.call(this, {}, file, callback)
        var metadata
        try {
          metadata = yaml.safeLoad(str)
        } catch (e) {
          return writeAspectRatio.call(this, {}, file, callback)
        }
        return writeAspectRatio.call(this, metadata, file, callback)
      })
    }
  })
}

function writeAspectRatio(metadata, file, callback) {
  var size = probe.sync(file.contents)
  if (size !== null) {
    metadata = merge(metadata, {
      data: {
        aspect: (size.width / size.height),
        primary: true
      }
    })
  }
  var doc
  try {
    doc = yaml.safeDump(metadata)
  } catch (e) {
    return callback(null, file)
  }
  var metaFile = new Vinyl({
    cwd: file.cwd,
    base: file.base,
    path: replaceExt(file.path, '.jpg') + '.txt',
    contents: Buffer.from(doc, 'utf-8')
  })
  this.push(metaFile)
  this.push(file)
  return callback()
}
