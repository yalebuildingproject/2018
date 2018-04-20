var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var layout = require('../elements/primary-layout')

class Lightbox extends Nanocomponent {
  constructor () {
    super()
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.noscroll = this.noscroll.bind(this)
    this.key = this.key.bind(this)
    this.images = []
  }

  createElement () {
    var close = html`<a class="close" href="#" >← Close</a>`

    var img = html`<div class="p0-25 c12">
        <img class="mx100 curzo" src="">
      </div>`

    return html`
      <div class="z2 psf c12 usn t0 l0 r0 b0 px1-5 py1 bgc-white dn" style="background: hsla(0, 0%, 100%, 0.9)">
        ${layout(close, img)}
      </div>
    `
  }

  load () {
    this.register()
    var close = this.element.querySelector('a.close')
    close.addEventListener('click', this.close, false)
    var img = this.element.querySelector('img')
    img.addEventListener('click', this.close, false)
  }

  unload () {
    this.unregister()
    if (this.element) {
       var close = this.element.querySelector('a.close')
      close.removeEventListener('click', this.close)
      var img = this.element.querySelector('img')
      img.removeEventListener('click', this.close)
    }
  }

  noscroll (e) {
    e.preventDefault();
  }

  register () {
    this.images = document.querySelectorAll('img.thumb');
    this.images.forEach(image => {
      image.classList.add('curzi')
      image.addEventListener('click', this.open, false)
    })
  }

  unregister () {
    this.images.forEach(image => {
      image.classList.remove('curzi')
      image.removeEventListener('click', this.open)
    })
  }

  open (e) {
    ['scroll', 'touchmove', 'mousewheel'].forEach(e => {
      this.element.addEventListener(e, this.noscroll, false)
    })
    document.addEventListener('keydown', this.key, true);
    document.body.classList.add('oh')
    var img = this.element.querySelector('img')
    img.src = e.target.dataset.source
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
