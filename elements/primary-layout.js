var html = require('choo/html')

module.exports = layout

function layout (col1, col2) {
  return html`
    <div class="x xjb xw">
      <div sm="c4 pr1-5 br1-lightgray" md="c3" class="c12">
        ${col1}
      </div>
      <div sm="c8 pl1-5" md="c9" class="c12">
        ${col2}
      </div>
    </div>
  `
}
