var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')
var utils = require('../lib/utils')

var header = require('../elements/header')
var layout = require('../elements/primary-layout')
var images = require('../elements/image-group')
var lightbox = require('../elements/lightbox')

var TITLE = 'bp - design'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var teams = Object.values(state.site.pages.design.pages)

  utils.shuffle(teams)

  //lightbox(Object.values(teams[0].files)[0])

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('/design')}
      <div class="container">
        ${teams.map(team => {
          var imgs = Object.values(team.files).map(file => {
            return file.source
          })
          return layout(fmt(team), images(imgs))
        })}
      </div>
    </body>`
}

function fmt(team) {
  return html`<div>
    <h1 class="mb1 fs3-2 ttu">${team.name}</h1>
    <div class="x">
    <ul class="s2 mb1">
      ${team.people.map(person => {
        return html`<li class="hang-indent">${utils.fullname(person.first, person.last)}</li>`
      })}
    </ul>
    </div>
    <p class="fs0-9">${raw(team.html)}</p>
  </div>`
}
