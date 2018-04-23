var parse = require('date-fns/parse')
var path = require('path')
var html = require('choo/html')
var flatten = require('lodash/flatten')
var _map = require('lodash/map')

module.exports = {
  fullname: fullname,
  headshot: headshot,
  teamshot: teamshot,
  shuffle: shuffle,
  sortByDataDate: sortByDataDate,
  normalizeDates: normalizeDates,
  sourceTag: sourceTag,
  srcset: srcset,
  blankFile: blankFile
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

function normalizeDates(obj) {
    var key = 'date'
    if (key in obj) return obj[key] = _transposeDate(parse(obj[key]))
    return flatten(_map(obj, function(v) {
        return typeof v == "object" ? normalizeDates(v) : [];
    }), true);
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

function sourceTag (file, type) {
  return html`<source type="${type}" srcset="${srcset(file, type)}">`
}

function srcset (file, type) {
  return Object.keys(suffixes).map(suffix => {
    var maxSize = suffixes[suffix]
    var width = (file.data.aspect > 1) ? maxSize : Math.floor(file.data.aspect * maxSize)
    var name = file.source.substr(0, file.source.lastIndexOf(file.extension))
    return `${name}${suffix}${types[type]} ${width}w`
  }).join(', ')
}

function blankFile (aspect) {
  return {
    extension: '.jpg',
    source: '/assets/blank.jpg',
    data: {
      aspect: aspect
    }
  }
}
