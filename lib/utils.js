var nmd = require('nano-markdown');

module.exports = {
  sitemap: sitemap,
  fullname: fullname
}

function sitemap(map, site) {
  if (map.text) map.html = nmd(map.text)
  for (var page in map.pages) {
    var data = map.pages[page]
    map.pages[page] = sitemap(site[data.path], site)
  }
  return map
}

function fullname(first, last) {
  return `${first} ${last}`
}
