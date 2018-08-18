var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')
var utils = require('../lib/utils')

var header = require('../elements/header')
var layout = require('../elements/primary-layout')
var imageLayout = require('../elements/image-group')

var Lightbox = require('../components/lightbox')
var lightbox = new Lightbox()

var tint = css`
  :host img {
    filter: brightness(0.98);
    -webkit-filter: brightness(0.98);
  }
`

var bubble = css`
  :host {
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
  }
`

var TITLE = 'Design - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var teams = state.page('/content/design').children().toArray()
  utils.shuffle(teams)
  teams.sort((x, y) => {
    return x.name == 'g' ? -1 : y.name == 'g' ? 1 : 0
  })

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/design')}
      <div class="${tint} container">
        <div class="mb1 bb1-lightgray sm-dn"><h1>Design</h1></div>
        ${teams.map(team => {
          var imgs = Object.values(team.files)
          return html`<div>
            ${layout(text(team), imageLayout(imgs))}
            <div class="my1 bt1-lightgray"></div>
          </div>`
        })}
      </div>
      ${lightbox.render()}
    </body>`
}

function text(team) {
  var selected = team.name == 'g' ?
    html`<div class="psa t0 r0 mt1 bgc-black c-white ${bubble}">Selected Design</div>` :
    ''
  return html`<div class="psr">
    ${selected}
    <h2 class="m0-75 fs3-2 ttu">${team.name}</h2>
    <div class="x">
      <ul class="mb2">
        ${team.people.map(person => {
          return html`<li class="hang-indent">${utils.fullname(person.first, person.last)}</li>`
        })}
      </ul>
    </div>
    <p>${raw(team.html)}</p>
  </div>`
}
