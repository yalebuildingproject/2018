var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var header = require('../elements/header')
var layout = require('../elements/primary-layout')

var TITLE = 'bp - sponsors'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var sponsors = state.site.pages.sponsors

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/sponsors')}
      <div class="container">
        ${layout(raw(sponsors.html), '')}
      </div>
    </body>`
}
