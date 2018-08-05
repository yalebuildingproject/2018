var html = require('choo/html')

module.exports = layout

function layout (col1, col2) {
  return html`
    <div class="x xjb xw">
      <div class="c12 sm-c4 sm-pr1-5 sm-br1-lightgray md-c3">
        ${col1}
      </div>
      <div class="c12 sm-c8 sm-pl1-5 md-c9">
        ${col2}
      </div>
    </div>
  `
}
