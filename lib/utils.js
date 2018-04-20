var parse = require('date-fns/parse')

module.exports = {
  sitemap: sitemap,
  fullname: fullname,
  headshot: headshot,
  teamshot: teamshot,
  shuffle: shuffle,
  sortDate: sortDate
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

function headshot(first, last) {
  return `/content/people/${first}_${last}.jpg`
}

function teamshot(team) {
  return `/content/people/${team}.jpg`
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

function sortDate(arr) {
  return arr
    .map(image => {
      image.date = parse(image.date)
      return image
    })
    .sort(compareDate)
}

function compareDate(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}
