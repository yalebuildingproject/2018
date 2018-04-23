var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var Leaflet = require('../components/leaflet')
var Picture = require('../components/picture')

var leaflet = new Leaflet()

var picture = new Picture()

var header = require('../elements/header')
var layout = require('../elements/primary-layout')

var TITLE = 'About - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var about = state.page('/content/about').value()

  var image = state.page('/content/about').images().toArray()[0]

  var col2 = html`<div>
    <div class="px4 pb2">
      <div class="x" style="padding-right: 8rem;">
        <div class="p0-25 w100">
          ${leaflet.render([41.292086, -72.936191])}
        </div>
      </div>
    </div>
    <div class="px4">
      <div style="padding-left: 5rem; padding-right: 2rem;">
        <div class="p0-25">
          ${picture.render(image)}
        </div>
      </div>
    </div>
  </div>`

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/about')}
      <div class="container">
        ${layout(raw(about.html), col2)}
      </div>
    </body>`
}
