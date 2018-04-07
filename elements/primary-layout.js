var html = require('choo/html')

module.exports = layout

function layout (col1, col2) {
  return html`
    <div class="x xjb">
      <div class="c3 pr1-5 br1-lightgray">
        ${col1}
      </div>
      <div class="c9 pl1-5">
        ${col2}
      </div>
    </div>
  `
}
