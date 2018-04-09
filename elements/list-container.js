var html = require('choo/html')
var css = require('sheetify')

var hidescroll = css`
  :host::-webkit-scrollbar {
    display: none;
}
`

module.exports = layout

function layout (col1, col2) {
  return html`<div class="container x vh100">
    <div class="c3 pr1-5 br1-lightgray">
      ${col1}
    </div>
    <div class="c5 container oa px1-5 undo-container ${hidescroll}">
      ${col2}
    </div>
    <div class="c4 pl1-5 bl1-lightgray">
    </div>
  </div>`
}
