var parse = require('date-fns/parse')
var path = require('path')
var html = require('choo/html')

module.exports = {
  fullname: fullname,
  headshot: headshot,
  teamshot: teamshot,
  shuffle: shuffle,
  sortByDataDate: sortByDataDate,
  normalizeDates: normalizeDates,
  sourceTag: sourceTag,
  srcset: srcset
}

function fullname(first, last) {
  return `${first} ${last}`
}

function headshot(first, last) {
  return `${first}_${last}.jpg`
}

function teamshot(team) {
  return `${team}.jpg`
}

function _transposeDate(d) {
  return new Date(d.getTime() + d.getTimezoneOffset() * 60000);
}

function normalizeDates(site) {
    if (site.date) {
      site.date = _transposeDate(parse(site.date))
    }
    for (var prop in site) {
      if (typeof site[prop] == 'object' && site[prop]) normalizeDates(site[prop])
    }
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

function sortByDataDate(arr) {
  return arr
    .sort(_compareDataDate)
}

function _compareDataDate(a, b) {
  if (a.data.date < b.data.date) {
    return -1;
  }
  if (a.data.date > b.data.date) {
    return 1;
  }
  return 0;
}

var suffixes = {
  '-md': 600,
  '': 1024,
  '-xl': 2048
}

var types = {
  'image/webp': '.webp',
  'image/jpeg': '.jpg'
}

function sourceTag (file, aspect, type) {
  return html`<source type="${type}" srcset="${srcset(file, aspect, type)}" sizes="50vw">`
}

function srcset (file, aspect, type) {
  return Object.keys(suffixes).map(suffix => {
    var maxSize = suffixes[suffix]
    var width = (aspect > 1) ? maxSize : Math.floor(aspect * maxSize)
    var name = file.substr(0, file.lastIndexOf(path.extname(file)))
    return `${name}${suffix}${types[type]} ${width}w`
  }).join(', ')
}
