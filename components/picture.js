var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var raf = require('raf')
var utils = require('../lib/utils')

var loaded = css`
  :host img {
    opacity: 1;
    transition: opacity 0.3s;
  }
`

var loading = css`
  :host img {
    opacity: 0;
  }
`

class Picture extends Nanocomponent {
  constructor () {
    super()
  }

  createElement (file) {
    this.file = file
    return html`<div class="oh ${loaded} ${loading} b1-lightgray">
      <div class="psr w100" style="${calcPadding(file)}">
        <picture>
          ${utils.sourceTag(file, 'image/webp')}
          ${utils.sourceTag(file, 'image/jpeg')}
          <img class="mx100 w100 psa" src="${file.source}">
        </picture>
      </div>
    </div>`
  }

  load () {
    var div = this.element
    var img = div.querySelector('img')
    if (img.complete) div.classList.remove(loading)
    img.onload = function () {
      div.classList.remove(loading)
    }
  }

  afterupdate () {
    var div = this.element
    var img = div.querySelector('img')
    if (img.complete) div.classList.remove(loading)
    img.onload = function () {
      div.classList.remove(loading)
    }
  }

  update (file) {
    return (this.file.source !== file.source) ||
      (this.file.data.aspect !== file.data.aspect)
  }
}

module.exports = Picture

function calcPadding (file) {
  return `padding-bottom: ${100 / file.data.aspect}%;`
}
