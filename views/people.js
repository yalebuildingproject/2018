var html = require('choo/html')
var css = require('sheetify')
var utils = require('../lib/utils')

var header = require('../elements/header')
var container = require('../elements/list-container')

var Hoverbox = require('../components/hoverbox')

var hoverbox = new Hoverbox()


var TITLE = 'People - Building Project 2018'

var marquee = css`

  :host .scroll-wrap {
    overflow: hidden;
  }

  :host:hover .scroll {
    width: 175%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transition: transform 2s linear, width 2s linear;
  }

  :host .scroll {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    will-change: transform;
    transition: transform .5s linear, width .5s linear;
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var people = state.page('/content/people').v('people')
  var images = state.page('/content/people').images().v()

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

  var col2 = html`<div class="cursor-plus">
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

      var image = (state.sortPeople == 'team') ? utils.teamshot(person.team) : utils.headshot(person.first, person.last)

      return html`<div data-image="${image}" class="person c12 x xjb ${marquee}">
        <div sm="c8" class="c12 pr1-5 fs1-6 hang-indent">${utils.fullname(person.first, person.last)}</div>
        <div sm="db" class="scroll-wrap c4 fs1-6 c-gray dn">
          <div class="${(state.sortPeople == 'hometown') ? 'scroll' : ''}">${detail}</div>
        </div>
      </div>`
    })}
  </div>`

  var aspect = (state.sortPeople == 'team') ? 1.3333333333333333 : 0.7501831501831502

  return html`
    <body class="ff-sans px1-5">
      ${header('/people')}
      ${container(col1, col2, hoverbox.render(images, aspect))}
    </body>
  `
  function sort(e) {
    emit('people:sort', e.target.dataset.method)
  }
}
