var html = require('choo/html')
var css = require('sheetify')
var utils = require('../lib/utils')

var header = require('../elements/header')
var layout = require('../elements/primary-layout')
var images = require('../elements/image-group')

var TITLE = 'bp - design'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var a = state.site.pages.design.pages.a
  var b = state.site.pages.design.pages.b
  var c = state.site.pages.design.pages.c

  var col2 = html`
    <div>
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
    </div>`

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header()}
      <div class="container">
        ${layout(fmt(a), images(Object.values(a.files).map(file => {
          return file.source
        })))}
      </div>
      <div class="c12 x xjb px2 py2">
        <div class="c3 pr2"  style="border-right: 1px solid #e0e0e0;">
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
    <h1 class="mb1 fs3-2">A</h1>
    <div class="x">
    <ul class="s2 mb1">
      <li>Michelle Badr</li>
      <li>Helen Farley</li>
      <li>Tianyu Guan</li>
      <li>Andrew Kim</li>
      <li>Andrew Miller</li>
      <li style="text-indent: -1rem; padding-left: 1rem;">Max Ouellette-Howitz</li>
      <li>Laelia Vaulot</li>
    </ul>
    </div>
    <p style="">${team.text}</p>
  </div>`
}
