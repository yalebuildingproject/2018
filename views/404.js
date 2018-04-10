var html = require('choo/html')

var header = require('../elements/header')
var layout = require('../elements/primary-layout')

var TITLE = '404 - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/404')}
      <div class="container fs2-4">
        <ul>
          <li>404: Not Found</li>
          <li class="c-gray"><a href="/">Home</a></li>
        </ul>
      </div>
    </body>`
}
