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

  var schedule = utils.sortDate(state.page('/content/home').v('schedule'))
  var images = state.page('/content/home').images().toArray()

  var col1 = html`<div>
    <p>Schedule:</p>
    <table>
      ${schedule.map(entry => {
        var active = (entry.date < new Date())
        var hover = active ? 'tdu-hover' : notAllowed
        return html`<tr>
          <td class="dib mr1">${format(entry.date, 'M/DD')}</td>
          <td><a class="dib ${hover} ${active ? 'active' : ''}" data-date="${entry.date}" href="#">${entry.title}</a></td>
        </tr>`
      })}
    </table>
  </div>`

  return html`
    <body class="ff-sans px1-5">
      ${header('/')}
      ${container(col1, timeline.render(images, schedule))}
    </body>`
}
