var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')
var container = require('../elements/list-container')

var TITLE = 'bp - contact'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var contact = state.site.pages.contact

  return html`
    <body class="ff-sans px1-5">
      ${header('/contact')}
      ${container('', '')}
    </body>
  `
}
