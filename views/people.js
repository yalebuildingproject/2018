var html = require('choo/html')
var css = require('sheetify')
var utils = require('../lib/utils')

var header = require('../elements/header')
var container = require('../elements/list-container')

var TITLE = 'People - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var people = state.site.pages.people.people

  var col1 = html`<div>
    <p>Sort by:</p>
    <ul>
      <li><a href="#" class="dib ${(state.sortPeople == 'first') ? 'tdu' : ''} tdu-hover" data-method="first" onclick=${sort}>First Name</a></li>
      <li><a href="#" class="dib ${(state.sortPeople == 'last') ? 'tdu' : ''} tdu-hover" data-method="last" onclick=${sort}>Last Name</a></li>
      <li><a href="#" class="dib ${(state.sortPeople == 'team') ? 'tdu' : ''} tdu-hover" data-method="team" onclick=${sort}>Team</a></li>
      <li><a href="#" class="dib ${(state.sortPeople == 'hometown') ? 'tdu' : ''} tdu-hover" data-method="hometown" onclick=${sort}>Hometown</a></li>
    </ul>
  </div>`

  var history = {}

  var col2 = html`<div>
    ${people.map(person => {
      var first = false
      if (state.sortPeople == 'team') {
        if (!history[person.team]) {
          history[person.team] = true
          first = true
        }
      }
      var detail = ''
      if (first) {
        detail = `Team ${person.team}`
      } else if (state.sortPeople == 'hometown') {
        detail = person.hometown
      }

      return html`<div class="c12 x xjb">
        <div class="c8 pr1-5 fs1-6 hang-indent">${utils.fullname(person.first, person.last)}</div>
        <div class="c4 fs1-6 c-gray">${detail}</div>
      </div>`
    })}
  </div>`

  return html`
    <body class="ff-sans px1-5">
      ${header('/people')}
      ${container(col1, col2, '')}
    </body>
  `
  function sort(e) {
    emit('people:sort', e.target.dataset.method)
  }
}
