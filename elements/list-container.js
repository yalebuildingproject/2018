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
  var container3 = three ? html`<div md="db" class="c4 pl1-5 bl1-lightgray dn">
      ${col3}
    </div>` : ''

  return html`<div class="container pb1 x vh100">
    <div sm="db" md="c3" class="c4 pr1-5 oys ${scroll} br1-lightgray dn">
      ${col1}
    </div>
    <div sm="c8 px1-5" md="${three ? 'c5' : 'c9'}" class="c12 container oys  ${scroll} undo-container undo-bottom hide-scroll">
      ${col2}
    </div>
    ${container3}
  </div>`
}
