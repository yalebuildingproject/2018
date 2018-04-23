module.exports = removeResponsiveImages

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
  var suffixes = ['-md', '-l', '-xl']
  for (var suffix of suffixes) {
    if (file.name.endsWith(suffix)) return true
  }
  return false
}
