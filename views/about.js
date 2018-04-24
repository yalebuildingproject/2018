var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var Picture = require('../components/picture')
var picture = new Picture()

var header = require('../elements/header')
var layout = require('../elements/primary-layout')

var collapse = css`
  @media (max-width: 768px) {
    :host {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
`

var TITLE = 'About - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var about = state.page('/content/about').value()

  var image = state.page('/content/about').images().toArray()[0]

  var col2 = html`<div>
    <div lg="px4" class="pb2">
      <div class="x ${collapse}" style="padding-right: 8rem;">
        <div class="p0-25 w100">
          <iframe class="w100" style="height: 300px;" src="/assets/map.html" frameborder="0" marginheight="0" marginwidth="0"></iframe>
        </div>
      </div>
    </div>
    <div lg="px4">
      <div class="${collapse}" style="padding-left: 5rem; padding-right: 2rem;">
        <div class="p0-25">
          ${picture.render(image.source, image.data.aspect)}
        </div>
      </div>
    </div>
  </div>`

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/about')}
      <div class="container">
        <div sm="dn" class="mb1 bb1-lightgray"><h1>About</h1></div>
        ${layout(raw(about.html), col2)}
      </div>
    </body>`
}
