var html = require('choo/html')
var css = require('sheetify')

var nav = require('./nav').horizontal

var Hamburger = require('../components/hamburger')
var hamburger = new Hamburger()

var icon = css`
  :host {
    height: 1rem;
  }
`

var logo = css`
  :host {
    height: 3rem;
  }
`

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

module.exports = header

function header (page) {
  return html`<header class="z1 psf c12 usn t0 l0 r0 px1-5 py1 x xjb ${background}">
    <div sm="s2" lg="c3" class="c12 x xjb" style="margin-top: -0.3rem;">
      <a href="/"><img class="${logo}" src="/assets/logo.svg"></a>
      <div sm="dn" class="x xjc xac">
        <a href="https://www.instagram.com/yalebuildingproject2018/" target="_blank" rel="noopener noreferrer"><img class="${icon} mr1" src="/assets/icons/instagram.svg"></a>
        <a class="hamburger" href="#"><img class="${icon}" src="/assets/icons/hamburger.svg"></a>
      </div>
    </div>
    <div sm="s2 db" lg="c3 co3" class="dn">
      ${nav(page)}
    </div>
    <div lg="db" class="c3 c-gray dn">
      <p class="mb0 tar">Button Street, New Haven</p>
      <div class="x xje">
        <img class="${icon} mr0-25" src="/assets/icons/instagram.svg">
        <p><a class="dib tdu-hover" href="https://www.instagram.com/yalebuildingproject2018/" target="_blank" rel="noopener noreferrer">yalebuildingproject2018</a></p>
      </div>
    </div>
    ${hamburger.render()}
  </header>`
}
