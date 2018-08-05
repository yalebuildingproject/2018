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

var pavilionLink = css`
  :host:before {
    content: "\\2192\\0020\\0020";
  }
`

var TITLE = 'Home - Building Project 2018'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var schedule = state.page('/content/home').v('schedule')
  var images = state.page('/content/home').images().toArray()

  var col1 = html`<div class="x xdc xjb h100">
    <div>
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
    </div>
    <div>
      <h1>
        <a class="${pavilionLink}" href="/pavilion">Festival of Arts & Ideas <span style="color: #87bb40">P</span><span style="color: #f04923">a</span><span style="color: #005aff">v</span>i<span style="color: #f04923">l</span><span style="color: #005aff">i</span><span style="color: #ffd800">o</span><span style="color: #87bb40">n</span></a>
      </h1>
    </div>
  </div>`

  return html`
    <body class="ff-sans px1-5">
      ${header('/')}
      <div class="container sm-dn">
        ${utils.sortByDataDate(images).reverse().map(image => {
          return html`<div class="x py0-25">
            <div class="s2">${format(image.data.date, 'M/DD/YY')}</div>
            <div class="s2">
              ${(new Picture()).render(image.source, image.data.aspect)}
            </div>
          </div>`
        })}
      </div>
      <div class="dn sm-db">
        ${container(col1, timeline.render(images, schedule))}
      </div>
    </body>`
}
