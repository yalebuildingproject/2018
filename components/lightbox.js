var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var utils = require('../lib/utils')

var Picture = require('./picture')

var picture = new Picture()

var style = css`

  :host {
    width: 90vw;
    height: 90vh;

  }

  :host img {
    filter: brightness(0.98);
    -webkit-filter: brightness(0.98);
    object-fit: contain;
  }
`

class Lightbox extends Nanocomponent {
  constructor () {
    super()
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.noscroll = this.noscroll.bind(this)
    this.key = this.key.bind(this)
    this.src = null
    this.aspect = null
    this.thumbs = []
  }

  createElement () {

    var img = this.src ? html`<picture class="${style} cursor-shrink">
          ${utils.sourceTag(this.src, this.aspect, 'image/webp')}
          ${utils.sourceTag(this.src, this.aspect, 'image/jpeg')}
          <img class="h100 w100" data-aspect="${this.aspect}" src="${this.src}">
        </picture>` : ''

    return html`
      <div class="z2 psf c12 usn t0 l0 r0 b0 px1-5 py1 bgc-white x xac xjc dn" style="background: hsla(0, 0%, 100%, 0.9)">
        ${img}
      </div>
    `
  }

  load (element) {
    this.register()
    element.addEventListener('click', this.close, false)
  }

  unload (element) {
    element.removeEventListener('click', this.close)
  }

  noscroll (e) {
    e.preventDefault();
  }

  register () {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.thumb img')) this.open(e)
    }, false)
  }

  open (e) {
    e.preventDefault();
    ['scroll', 'touchmove', 'mousewheel'].forEach(e => {
      this.element.addEventListener(e, this.noscroll, false)
    })
    document.addEventListener('keydown', this.key, true);
    document.body.classList.add('oh')
    this.src = e.target.src
    this.aspect = e.target.dataset.aspect
    this.rerender()
    this.element.classList.remove('dn')
  }

  key (e) {
    if (e.defaultPrevented) return;
    switch (event.key) {
      case "ArrowLeft":
        this.prev()
        break;
      case "ArrowRight":
        this.next()
        break;
      case "Escape":
        this.close()
        break;
      default:
        return;
    }
    e.preventDefault();
  }

  prev () {

  }

  next () {

  }

  close () {
    ['scroll', 'touchmove', 'mousewheel'].forEach(e => {
      this.element.removeEventListener(e, this.noscroll)
    })
    document.removeEventListener('keydown', this.key);
    document.body.classList.remove('oh')
    this.element.classList.add('dn');
  }

  update () {
    return false
  }
}

module.exports = Lightbox
