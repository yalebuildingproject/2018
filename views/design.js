var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')

var TITLE = 'bp - design'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var a = state.site.pages.design.pages.a
  var b = state.site.pages.design.pages.b
  var c = state.site.pages.design.pages.c

  return html`
    <body class="ff-sans">
      ${header()}
      <div class="container c12 x xjb px2 pb1">
        <div class="c3 pr2"  style="border-right: 1px solid #e0e0e0; font-size: 0.9rem;">
          ${fmt(a)}
        </div>
        <div class="c9 px2">
          <div class="c8 co2 p025">
            <img class="mx100" src="/content/design/a/diagram.jpg">
          </div>
          <div class="c12 x xjb">
           <div class="c7 p025">
              <img class="mx100" src="/content/design/a/plan.jpg">
            </div>
            <div class="c5 p025">
              <img class="mx100" src="/content/design/a/model.jpg">
            </div>
          </div>
        </div>
      </div>
      <div class="c12 x xjb px2 py2">
        <div class="c3 pr2"  style="border-right: 1px solid #e0e0e0; font-size: 0.9rem;">
          ${fmt(b)}
        </div>
        <div class="c9 px2">
          <div class="c8 p025">
            <img class="mx100" src="/content/design/b/model.jpg">
          </div>
          <div class="c12 x xjb">
           <div class="c7 p025">
              <img class="mx100" src="/content/design/b/perspective.jpg">
            </div>
            <div class="c5 p025">
              <img class="mx100" src="/content/design/b/diagram.jpg">
            </div>
          </div>
        </div>
      </div>
    </body>`
}

function fmt(team) {
  return html`<div>
    <h1 class="mb1 fs1-2">${team.title}</h1>
    <ul  class="mb1">
      ${team.people.map((person) => {
        var name = `${person.first} ${person.last}`
        return html`<li>${name}</li>`
      })}
    </ul>
    <p>${team.text}</p>
  </div>`
}
