var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var format = require('date-fns/format')

var Picture = require('../components/picture')
var picture = new Picture()

var header = require('../elements/header')
var layout = require('../elements/primary-layout')

var TITLE = 'Pavilion - Building Project 2018'

var collapse = css`
  @media (max-width: 768px) {
    :host {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var text = state.page('/content/pavilion').value()
  var image = state.page('/content/pavilion').images().toArray()[0]
  var schedule = state.page('/content/pavilion').v('schedule')

  var col1 = html`<div>
    ${raw(text.html)}
    <p>Schedule:</p>
    <table>
      ${schedule.map(entry => {
        return html`<tr>
          <td class="dib mr1">${format(entry.date, 'M/DD')}</td>
          <td class="dib mr1">${entry.time}</td>
          <td>
            <p class="dib">${entry.title}</p>
            <p>${entry.description}</p>
          </td>
        </tr>`
      })}
    </table>
  </div>`

  var col2 = html`<div>
    <div class="pb2 lg-px4">
      <div class="x ${collapse}" style="padding-right: 20rem;">
        <div class="p0-25 w100">
          <div class="b1-lightgray">
            <img class="mx100 w100" src="/assets/poster.gif">
          </div>
        </div>
      </div>
    </div>
    <div class="lg-px4">
      <div style="padding-left: 5rem; padding-right: 2rem;">
        <div class="p0-25">
          ${picture.render(image.source, image.data.aspect)}
        </div>
      </div>
    </div>
  </div>`

  return html`
    <body class="ff-sans px1-5 pb1">
      ${header('')}
      <div class="container">
        <div class="mb1 bb1-lightgray sm-dn">
          <h1>
            Festival of Arts & Ideas <span style="color: #87bb40">P</span><span style="color: #f04923">a</span><span style="color: #005aff">v</span>i<span style="color: #f04923">l</span><span style="color: #005aff">i</span><span style="color: #ffd800">o</span><span style="color: #87bb40">n</span>
          </h1>
        </div>
        ${layout(col1, col2)}
      </div>
    </body>`
}
