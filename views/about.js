var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var header = require('../elements/header')
var layout = require('../elements/primary-layout')

var TITLE = 'bp - about'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var about = state.site.pages.about

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/about')}
      <div class="container">
        ${layout(raw(about.html), '')}
      </div>
    </body>`
}
