var staticModule = require('static-module')
var through = require('through2')
var path = require('path')
var parse = require('./parse')

var hypha = require('hypha')

module.exports = transform

function transform (filename) {
  if (/\.json$/.test(filename)) return through()

  var vars = {
    __filename: filename,
    __dirname: path.dirname(filename)
  }

  var sm = staticModule({
    hypha: {
      readPageSync: function (pathPage, opts) {
        opts = opts || { }
        opts.pathRoot = opts.pathRoot || vars.__dirname
        opts.parse = parse

        var pathDir = path.isAbsolute(pathPage) ? pathPage : path.join(vars.__dirname, pathPage)
        var pageSync = hypha.readPageSync(pathDir, opts)

        var stream = through()
        stream.push(JSON.stringify(pageSync, { }, 2))
        stream.push(null)
        return stream
      },
      readSiteSync: function readDir (pathSite, opts) {
        opts = opts || { }
        opts.pathRoot = opts.pathRoot || vars.__dirname
        opts.parse = parse

        opts.onFile = function (pathFile) {
          sm.emit('file', pathFile)
        }

        var pathDir = path.isAbsolute(pathSite) ? pathSite : path.join(vars.__dirname, pathSite)
        var siteSync = hypha.readSiteSync(pathDir, opts)

        siteSync = removeResponsiveImages(siteSync)
        debugger;
        var stream = through()
        stream.push(JSON.stringify(siteSync, { }, 2))
        stream.push(null)
        return stream
      }
    }
  }, {
    vars: vars,
    varModules: {
      path: path
    }
  })

  return sm
}

function removeResponsiveImages(site) {
  for (var href in site) {
    var files = site[href].files
    for (var file in files) {
      if (isResponsive(files[file])) delete files[file]
    }
  }
  return site
}

function isResponsive(file) {
  if (file.extension == '.webp') return true
  var suffixes = ['-thumb', '-md', '-l', '-xl']
  for (var suffix of suffixes) {
    if (file.name.endsWith(suffix)) return true
  }
  return false
}
