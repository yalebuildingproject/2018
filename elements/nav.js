var html = require('choo/html')
var css = require('sheetify')

var menu = css`
  :host li:before {
    content: "\\2192\\0020\\0020";
  }
`

module.exports = nav

function nav (page) {
  return html`<div sm="xje" lg="xjs" class="x ${menu}">
    <ul>
      <li class="pr1">
        <a class="item" href="/" class="pr0 dib ${(page == '/') ? 'tdu' : 'tdu-hover'}">Home</a>
      </li>
      <li class="pr1">
        <a class="item" href="/about" class="pr0 dib ${(page == '/about') ? 'tdu' : 'tdu-hover'}">About</a>
      </li>
    </ul>
    <ul>
      <li class="pr1">
        <a class="item" href="/design" class="pr0 dib ${(page == '/design') ? 'tdu' : 'tdu-hover'}">Design</a>
      </li>
      <li class="pr1">
        <a class="item" href="/people" class="pr0 dib ${(page == '/people') ? 'tdu' : 'tdu-hover'}">People</a>
      </li>
    </ul>
    <ul>
      <li class="pr1">
        <a class="item" href="/sponsors" class="pr0 dib ${(page == '/sponsors') ? 'tdu' : 'tdu-hover'}">Sponsors</a>
      </li>
      <li class="pr1">
        <a class="item" href="/contact" class="pr0 dib ${(page == '/contact') ? 'tdu' : 'tdu-hover'}">Contact</a>
      </li>
    </ul>
  </div>`
}
