var html = require('choo/html')
var css = require('sheetify')

var arrow = css`
  :host li:before {
    content: "\\2192\\0020\\0020";
  }
`

module.exports = header

function header () {
  return html`<header class="z4 psf c12 usn t0 l0 r0 px2 py1 x xjb">
    <div class="pr4">
      <h1 class="di pr1">Yale Building Project 2018</h1>
    </div>
    <div class="x ${arrow}">
      <ul class="">
        <li class="pr1"><a href="#" class="pr0 dib tdu-hover">Home</a></li>
        <li class="pr1"><a href="#" class="pr0 dib tdu-hover">About</a></li>
        <li class="pr1"><a href="#" class="pr0 dib tdu-hover">Design</a></li>
      </ul>
      <ul class="">
        <li class="pr1"><a href="#" class="pr0 dib tdu-hover">People</a></li>
        <li class="pr1"><a href="#" class="pr0 dib tdu-hover">Proposals</a></li>
        <li class="pr1"><a href="#" class="pr0 dib tdu-hover">Sponsors</a></li>
      </ul>
    </div>
    <div style="color: gray">
      <p>Button Street</p>
      <p>New Haven, CT 06519</p>
      <p><a href="">@yalebuildingproject2018</a></p>
    </div>
  </header>`
}
