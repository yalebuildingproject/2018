var html = require('choo/html')
var css = require('sheetify')

var menu = css`
  :host li:before {
    content: "\\2192\\0020\\0020";
  }
`

module.exports = header

function header (page) {
  return html`<header class="z4 psf c12 usn t0 l0 r0 px2 py1 x xjb">
    <div class="x xjb c6">
      <h1 class="di">Yale Building Project 2018</h1>
    </div>
    <div class="x xjb c6">
      <div class="x ${menu}">
        <ul>
          <li class="pr1"><a href="/" class="pr0 dib tdu-hover">Home</a></li>
          <li class="pr1"><a href="/about" class="pr0 dib tdu-hover">About</a></li>
        </ul>
        <ul>
          <li class="pr1"><a href="/design" class="pr0 dib tdu-hover">Design</a></li>
          <li class="pr1"><a href="/people" class="pr0 dib tdu-hover">People</a></li>
        </ul>
        <ul>
          <li class="pr1"><a href="/sponsors" class="pr0 dib tdu-hover">Sponsors</a></li>
          <li class="pr1"><a href="/contact" class="pr0 dib tdu-hover">Contact</a></li>
        </ul>
      </div>
      <div style="color: gray">
        <p>43 Button Street</p>
        <p>New Haven, CT 06519</p>
      </div>
    </div>
  </header>`
}
