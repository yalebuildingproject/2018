var html = require('choo/html')
var css = require('sheetify')

var background = css`
  :host {
    background: linear-gradient(
      to top,
      hsla(0, 0%, 100%, 0) 0%,
      hsla(0, 0%, 100%, 0.262) 19%,
      hsla(0, 0%, 100%, 0.459) 34%,
      hsla(0, 0%, 100%, 0.618) 47%,
      hsla(0, 0%, 100%, 0.722) 56.5%,
      hsla(0, 0%, 100%, 0.806) 65%,
      hsla(0, 0%, 100%, 0.874) 73%,
      hsla(0, 0%, 100%, 0.925) 80.2%,
      hsla(0, 0%, 100%, 0.958) 86.1%,
      hsla(0, 0%, 100%, 0.979) 91%,
      hsla(0, 0%, 100%, 0.992) 95.2%,
      hsla(0, 0%, 100%, 0.998) 98.2%,
      hsla(0, 0%, 100%, 1) 100%
    );
  }
`

var menu = css`
  :host li:before {
    content: "\\2192\\0020\\0020";
  }
`

module.exports = header

function header (page) {

  return html`<header class="z4 psf c12 usn t0 l0 r0 px1-5 py1 x xjb ${background}">
    <div class="c3">
      <span class="di">Jim Vlock Building Project 2018</span>
    </div>
    <div class="c6 co3">
      <div class="x xjb">
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
        <div class="c-gray">
          Team A, B, C, D, E, F, G, H, I
        </div>
        </div>
    </div>
  </header>`
}
