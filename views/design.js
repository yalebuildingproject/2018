var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')
var utils = require('../lib/utils')

var header = require('../elements/header')
var layout = require('../elements/primary-layout')
var imageLayout = require('../elements/image-group')

var Lightbox = require('../components/lightbox')
var lightbox = new Lightbox()

var TITLE = 'Design - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var teams = state.page('/content/design').children().toArray()
  utils.shuffle(teams)

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/design')}
      <div class="container">
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
  return html`<div>
    <h1 class="m0-75 fs3-2 ttu">${team.name}</h1>
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
