var html = require('choo/html')
var css = require('sheetify')
var utils = require('../lib/utils')

var header = require('../elements/header')
var container = require('../elements/list-container')

var TITLE = 'bp - people'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var people = state.site.pages.people.people

  var col1 = html`<div>
    <p>Sort by:</p>
    <ul>
      <li><a href="#" class="dib ${(state.sortBy == 'first') ? 'tdu' : ''} tdu-hover" data-method="first" onclick=${sort}>First Name</a></li>
      <li><a href="#" class="dib ${(state.sortBy == 'last') ? 'tdu' : ''} tdu-hover" data-method="last" onclick=${sort}>Last Name</a></li>
      <li><a href="#" class="dib ${(state.sortBy == 'team') ? 'tdu' : ''} tdu-hover" data-method="team" onclick=${sort}>Team</a></li>
    </ul>
  </div>`

    var col2 = html`<ul>
      ${people.map(person => {
        return html`<li class="fs1-6 hang-indent">
          ${utils.fullname(person.first, person.last)}
        </li>`
      })}
    </ul>`

  return html`
    <body class="ff-sans px1-5">
      ${header('/people')}
      ${container(col1, col2)}
    </body>
  `
  function sort(e) {
    emit('people:sort', e.target.dataset.method)
  }
}
