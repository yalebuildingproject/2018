var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')

var TITLE = 'Home - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/')}
      <div class="container">
      </div>
    </body>`
}
