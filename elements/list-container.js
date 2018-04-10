var html = require('choo/html')
var css = require('sheetify')

var hidescroll = css`
  :host::-webkit-scrollbar {
    display: none;
}
`

module.exports = layout

function layout (col1, col2, col3) {
  var three = (typeof col3 !== "undefined")
  var container3 = three ? html`<div class="c4 pl1-5 bl1-lightgray">
    </div>` : ''

  return html`<div class="container pb1 x vh100">
    <div class="c3 pr1-5 oa br1-lightgray">
      ${col1}
    </div>
    <div class="${three ? 'c5' : 'c9'} container oa px1-5 undo-container undo-bottom ${hidescroll}">
      ${col2}
    </div>
    ${container3}
  </div>`
}
