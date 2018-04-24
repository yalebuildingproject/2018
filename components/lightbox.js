var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var Picture = require('./picture')

var picture = new Picture()

class Lightbox extends Nanocomponent {
  constructor () {
    super()
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.noscroll = this.noscroll.bind(this)
    this.key = this.key.bind(this)
    this.thumbs = []
  }

  createElement () {
    var close = html`<a class="close" href="#" >← Close</a>`

    var img = html`<div class="full p0-25 c12 cursor-shrink">
        ${picture.render('/assets/blank.jpg', 1.5)}
      </div>`

    return html`
      <div class="z2 psf c12 usn t0 l0 r0 b0 px1-5 py1 bgc-white dn" style="background: hsla(0, 0%, 100%, 0.9)">
        <div class="x xjb xw vh100">
          <div md="c3 pr1-5 br1-lightgray mb2" class="c12">
            ${close}
          </div>
          <div md="c9 pl1-5" class="c12 mb2">
            ${img}
          </div>
        </div>
      </div>
    `
  }

  load () {
    this.register()
    var close = this.element.querySelector('a.close')
    close.addEventListener('click', this.close, false)
    var img = this.element.querySelector('.full')
    img.addEventListener('click', this.close, false)
  }

  unload (element) {
    this.unregister()
    var close = element.querySelector('a.close')
    close.removeEventListener('click', this.close)
    var img = element.querySelector('img')
    img.removeEventListener('click', this.close)
  }

  noscroll (e) {
    e.preventDefault();
  }

  register () {
    this.thumbs = Array.from(document.querySelectorAll('.thumb img'));
    this.thumbs.forEach(image => {
      image.classList.add('cursor-expand')
      image.addEventListener('click', this.open, false)
    })
  }

  unregister () {
    this.thumbs.forEach(image => {
      image.classList.remove('cursor-expand')
      image.removeEventListener('click', this.open)
    })
  }

  open (e) {
    ['scroll', 'touchmove', 'mousewheel'].forEach(e => {
      this.element.addEventListener(e, this.noscroll, false)
    })
    document.addEventListener('keydown', this.key, true);
    document.body.classList.add('oh')
    var src = e.target.src
    var aspect = e.target.dataset.aspect
    picture.render(src, aspect)
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
    this.unregister()
    this.register()
    return false
  }
}

module.exports = Lightbox
