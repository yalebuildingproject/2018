module.exports = {
  sitemap: sitemap
}

function sitemap(map, site) {
  for (var page in map.pages) {
    var data = map.pages[page]
    map.pages[page] = sitemap(site[data.path], site)
  }
  return map
}
