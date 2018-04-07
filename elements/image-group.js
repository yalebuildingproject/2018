var html = require('choo/html')

module.exports = layout

function layout (imgs) {
  var row = 0
  var els = []

  shuffle(imgs)

  while (imgs.length > 0) {
    var img1, img2
    if (Math.floor(Math.random() * 3) == 0 || imgs.length == 1) {
      img1 = imgs.shift()
      els.push(single(img1))
    } else {
      img1 = imgs.shift()
      img2 = imgs.shift()
      els.push(split(img1, img2))
    }
  }

  return html`
    <div>
      ${els}
    </div>
  `
}

function single(img) {
  var p = randPadding()
  return html`<div class="x" style="padding-left: ${p + 'rem'}; padding-right: ${p + 'rem'};">
    <div class="p0-25">
      <img class="mx100" src="${img}">
    </div>
  </div>`
}

function split(img1, img2) {
  var p = randPadding(true)
  var s = randSplit()
  return html`<div class="x xjb" style="padding-left: ${p + 'rem'}; padding-right: ${p + 'rem'};">
    <div class="p0-25" style="width: ${s + '%'};">
      <img class="mx100" src="${img1}">
    </div>
    <div class="p0-25" style="width: ${100 - s + '%'};">
      <img class="mx100" src="${img2}">
    </div>
  </div>`
}

function randSplit() {
  switch(Math.floor((Math.random() * 3))) {
    case 0:
      return 35;
    case 1:
      return 40;
    case 2:
      return 45;
  }
}

function randPadding(split) {
  var multiplier = split ? 2 : 3
  switch(Math.floor((Math.random() * multiplier))) {
    case 0:
      return 2;
    case 1:
      return 4;
    case 2:
      return 8;
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
