var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var header = require('../elements/header')
var layout = require('../elements/primary-layout')

var TITLE = 'Sponsors - Building Project 2018'

var bw = css`
  :host {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }

  :host:hover {
    -webkit-filter: blur(0px) !important;
    filter: blur(0px) !important;
  }
`

var blur = css`
  :host:hover img {
    filter: blur(5px) grayscale(100%);
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var sponsors = state.site.pages.sponsors

  var imgs = Object.values(sponsors.files).map(file => {
            return file.source
          })

  var col2 = html`<div class="px1-5 x xw xjs ${blur}" style="margin-top: -4rem">
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
  var rand = Math.random() * 8
  return html`<div class="c3">
        <div class="p0-5">
          <img class="mx100 ${bw}" width="240" height="auto" src="${src}">
        </div>
  </div>`
}
