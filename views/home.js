var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')
var container = require('../elements/list-container')

var Timeline = require('../components/timeline')
var timeline = new Timeline()

var TITLE = 'Home - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var schedule = state.site.pages.home.schedule

  var col1 = html`<div>
    <p>Schedule:</p>
    <ul>
      <li>Building Project Kickoff</li>
      <li>Schematic Review</li>
      <li><span class="dib tdu">Design Review</span></li>
      <li class="c-gray">Final Review & Project Selection</li>
      <li class="c-gray">Groundbreaking</li>
      <li class="c-gray">Summer Internship Begins</li>
      <li class="c-gray">Construction Ends</li>
      <li class="c-gray">Open House Party</li>
    </ul>
  </div>`

  return html`
    <body class="ff-sans px1-5">
      ${header('/')}
      ${container(col1, timeline.render())}
    </body>`
}
