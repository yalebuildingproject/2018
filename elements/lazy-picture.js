var MonoImage = require('monoimage')
var path = require('path')

module.exports = function (file, aspect) {
  var name = file.substr(0, file.lastIndexOf(path.extname(file)))

  var data = {
    sizes: {
      600: `${name}-md.jpg`,
      1024: `${name}.jpg`,
      2048: `${name}-xl.jpg`
    },
    dimensions: {
      ratio: aspect
    }
  }
  var image = new MonoImage()
  return image.render(data)
}
