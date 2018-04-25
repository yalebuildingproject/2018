var html = require('choo/html')
var css = require('sheetify')
var utils = require('../lib/utils')
var Picture = require('../components/picture')

var collapse = css`
  @media (max-width: 768px) {
    :host {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
`

module.exports = layout

function layout (imgs) {
  var els = []

  utils.shuffle(imgs)

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
  return html`<div lg="px4">
    <div class="${collapse} x" style="padding-left: ${p + 'rem'}; padding-right: ${p + 'rem'};">
      <div class="c12 thumb cursor-expand p0-25">
        ${(new Picture()).render(img.source, img.data.aspect)}
      </div>
    </div>
  </div>`
}

function split(img1, img2) {
  var p = randPadding(true)
  var s = randSplit()
  return html`<div lg="px4">
    <div class="${collapse} x xjb" style="padding-left: ${p + 'rem'}; padding-right: ${p + 'rem'};">
      <div class="thumb cursor-expand p0-25" style="width: ${s + '%'};">
        ${(new Picture()).render(img1.source, img1.data.aspect)}
      </div>
      <div class="thumb cursor-expand p0-25" style="width: ${100 - s + '%'};">
        ${(new Picture()).render(img2.source, img2.data.aspect)}
      </div>
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
