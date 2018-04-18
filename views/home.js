var html = require('choo/html')
var css = require('sheetify')

var format = require('date-fns/format')

var header = require('../elements/header')
var container = require('../elements/list-container')
var utils = require('../lib/utils')

var Timeline = require('../components/timeline')
var timeline = new Timeline()

var notAllowed = css`
  :host {
    cursor: not-allowed;
  }
`

var TITLE = 'Home - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var schedule = utils.sortDate(state.site.pages.home.schedule)
  var images = Object.values(state.site.pages.home.files)

  var col1 = html`<div>
    <p>Schedule:</p>
    <div>
      ${schedule.map(entry => {
        var hover = (entry.date > new Date()) ? notAllowed : 'tdu-hover'
        return html`<dl class="x xjb">
          <dt class="dib">${format(entry.date, 'M/DD')}</dt>
          <dd><a class="dib ${hover}" href="#">${entry.title}</a></dd>
        </dl>`
      })}
    </div>
  </div>`

  return html`
    <body class="ff-sans px1-5">
      ${header('/')}
      ${container(col1, timeline.render(images, schedule))}
    </body>`
}
