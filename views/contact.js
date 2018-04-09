var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')

var TITLE = 'bp - contact'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var contact = state.site.pages.contact

  return html`
    <body class="ff-sans">
      ${header('/contact')}
      <div class="c12 x xjb px2 pt5 pb1">
        <div class="c4">
          <div class="c3 psf mt5 mb1 t0 b0 l0 pl2" style="border-right: 1px solid #e0e0e0">
          </div>
        </div>
        <div class="c4">
        </div>
        <div class="c4">
        </div>
      </div>
    </body>
  `
}
