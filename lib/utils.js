module.exports = {
  sitemap: sitemap,
  fullname: fullname,
  shuffle: shuffle
}

function sitemap(map, site) {
  for (var page in map.pages) {
    var data = map.pages[page]
    map.pages[page] = sitemap(site[data.path], site)
  }
  return map
}

function fullname(first, last) {
  return `${first} ${last}`
}

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
