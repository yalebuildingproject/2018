var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var header = require('../elements/header')
var layout = require('../elements/primary-layout')
var utils = require('../lib/utils')

var TITLE = 'Sponsors - Building Project 2018'

var bw = css`
  :host {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }

  :host:hover {
    opacity: 1 !important;
    -webkit-filter: none !important;
    filter: none !important;
  }
`

var blur = css`
  :host:hover img {
    opacity: 0.5;
    filter: grayscale(100%);
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var sponsors = state.site.pages.sponsors
  var files = Object.values(sponsors.files)

  utils.shuffle(files)

  var imgs = files.map(file => {
            return file.source
          })

  var col2 = html`<div class="px1-5 x xw xjs ${blur}">
    ${imgs.map(src => {return image(src)})}
  </div>`

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/sponsors')}
      <div class="container">
        ${layout(raw(sponsors.html), col2)}
      </div>
    </body>`
}

function image(src) {
  return html`<div class="c3">
        <div class="p0-5">
          <img class="mx100 ${bw}" width="240" height="auto" src="${src}">
        </div>
  </div>`
}
