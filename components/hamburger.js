var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var nav = require('../elements/nav')

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

var icon = css`
  :host {
    height: 1rem;
  }
`

class Hamburger extends Nanocomponent {
  constructor () {
    super()
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.noscroll = this.noscroll.bind(this)
  }

  createElement () {
    return html`
      <div class="z2 psf c12 usn t0 l0 r0 b0 px1-5 py1 ${background} dn">
        <div class="vh100">
          <div class="c12 x xjb my0-5">
            ${nav()}
            <a class="close" href="#"><img src="/assets/icons/close.svg" class="${icon}"></a>
          </div>
        </div>
      </div>
    `
  }

  load () {
    this.register()
    var close = this.element.querySelector('a.close')
    close.addEventListener('click', this.close, false)
  }

  unload (element) {
    this.unregister()
    var close = element.querySelector('a.close')
    close.removeEventListener('click', this.close)
    this.close()
  }

  noscroll (e) {
    e.preventDefault();
  }

  register () {
    var link = document.querySelector('header a.hamburger')
    link.addEventListener('click', this.open, false)
  }

  unregister () {
    var link = document.querySelector('header a.hamburger')
    link.removeEventListener('click', this.open)
  }

  open (e) {
    e.preventDefault();
    ['scroll', 'touchmove', 'mousewheel'].forEach(e => {
      this.element.addEventListener(e, this.noscroll, false)
    })
    document.body.classList.add('oh')
    this.element.classList.remove('dn')
  }

  close () {
    ['scroll', 'touchmove', 'mousewheel'].forEach(e => {
      this.element.removeEventListener(e, this.noscroll)
    })
    document.body.classList.remove('oh')
    this.element.classList.add('dn');
  }

  update () {
    console.log('updated')
    this.unregister()
    this.register()
    this.close()
    return false
  }
}

module.exports = Hamburger
