var parse = require('date-fns/parse')
var path = require('path')
var html = require('choo/html')

module.exports = {
  fileprefix: fileprefix,
  fullname: fullname,
  headshot: headshot,
  teamshot: teamshot,
  shuffle: shuffle,
  sortDate: sortDate,
  sourceTag: sourceTag,
  srcset: srcset,
  blankFile: blankFile
}

function fileprefix(filepath) {
  return filepath.substr(0, filepath.lastIndexOf(path.extname(filepath)))
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
