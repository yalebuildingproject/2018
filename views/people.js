var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')

var TITLE = 'bp - people'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var people = state.site.pages.people.people

  return html`
    <body class="ff-sans">
      ${header()}
      <div class="c12 x xjb px2 pt5 pb1">
        <div class="c3">
          <div class="c3 psf mt5 mb1 t0 b0 l0 pl2" style="border-right: 1px solid #e0e0e0">
            <p>Sort by:</p>
            <p>First Name</p>
            <p style="color: gray">Last Name</p>
            <p>Team</p>
            <p>Hometown</p>
          </div>
        </div>
        <div class="c4">
            ${people.map(person => {
              return fmt(person)
            })}
        </div>
        <div class="c5">
          <div class="c5 psf mt5 mb1 t0 b0 r0 pr2" style="border-left: 1px solid #e0e0e0">
          </div>
        </div>
      </div>
    </body>
  `
}

function fmt(person) {
  var name = `${person.first} ${person.last}`
  return html`<p class="fs1-6">${name}</p>`
}
