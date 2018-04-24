var html = require('choo/html')
var css = require('sheetify')

var format = require('date-fns/format')

var utils = require('../lib/utils')
var header = require('../elements/header')
var container = require('../elements/list-container')

var Picture = require('../components/picture')
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

  var schedule = state.page('/content/home').v('schedule')
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
      <div sm="dn" class="container">
        ${utils.sortByDataDate(images).reverse().map(image => {
          return html`<div class="x py0-25">
            <div class="s2">${format(image.data.date, 'M/DD/YY')}</div>
            <div class="s2">
              ${(new Picture).render(image.source, image.data.aspect)}
            </div>
          </div>`
        })}
      </div>
      <div sm="db" class="dn">
        ${container(col1, timeline.render(images, schedule))}
      </div>
    </body>`
}
