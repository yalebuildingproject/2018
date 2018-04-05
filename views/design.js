var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')

var TITLE = 'bp - design'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="ff-sans">
      ${header()}
      <div class="container c12 x px2">
      </div>
    </body>
  `
}
