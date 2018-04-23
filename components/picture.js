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

  createElement (file, aspect) {
    this.file = file
    this.aspect = aspect
    return html`<div class="oh ${loaded} ${loading} b1-lightgray">
      <div class="psr w100" style="${calcPadding(aspect)}">
        <picture>
          ${utils.sourceTag(file, aspect, 'image/webp')}
          ${utils.sourceTag(file, aspect, 'image/jpeg')}
          <img class="mx100 w100 psa" data-aspect="${aspect}" src="${file}">
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

  update (file, aspect) {
    return (this.file !== file) ||
      (this.aspect !== aspect)
  }
}

module.exports = Picture

function calcPadding (aspect) {
  return `padding-bottom: ${100 / aspect}%;`
}
