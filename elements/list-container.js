var html = require('choo/html')
var css = require('sheetify')

var scroll = css`
  :host {
    -webkit-overflow-scrolling: touch;
  }
`

module.exports = layout

function layout (col1, col2, col3) {
  var three = (typeof col3 !== "undefined")
  var container3 = three ? html`<div class="c4 pl1-5 bl1-lightgray dn md-db">
      ${col3}
    </div>` : ''

  return html`<div class="container pb1 x vh100">
    <div class="c4 pr1-5 oa ${scroll} br1-lightgray dn sm-db md-c3">
      ${col1}
    </div>
    <div class="c12 sm-c8 sm-px1-5 ${three ? 'md-c5' : 'md-c9'} container oa ${scroll} undo-container undo-bottom hide-scroll">
      ${col2}
    </div>
    ${container3}
  </div>`
}
