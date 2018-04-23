var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var utils = require('../lib/utils')

var layout = require('../elements/primary-layout')
var Picture = require('../components/picture')

var picture = new Picture()

class Hoverbox extends Nanocomponent {
  constructor () {
    super()
    this.people = []
    this.display = this.display.bind(this)
    this.clear = this.clear.bind(this)
  }

  createElement (images, aspect) {
    this.aspect = aspect
    this.images = images
    return html`<div class="xx x xjc xac">
        <div class="c12 p3">
          ${picture.render(utils.blankFile(this.aspect))}
        </div>
      </div>`
  }

  load () {
    this.register()
    this.prefetch()
  }

  prefetch () {
    Object.values(this.images).map(image => {
      image.buffer = html`<picture>
          ${utils.sourceTag(image, 'image/webp')}
          ${utils.sourceTag(image, 'image/jpeg')}
          <img src="${image.source}">
        </picture>`
    })
  }

  unload () {
    this.unregister()
  }

  display (e) {
    picture.render(this.images[e.target.dataset.image])
  }

  clear () {
    picture.render(utils.blankFile(this.aspect))
  }

  register () {
    this.people = document.querySelectorAll('div.person');
    this.people.forEach(person => {
      person.addEventListener('mouseenter', this.display, false)
      person.addEventListener('mouseleave', this.clear, false)
    })
  }

  unregister () {
    this.people.forEach(person => {
      person.removeEventListener('mouseenter', this.display)
      person.removeEventListener('mouseleave', this.clear)
    })
  }

  update (images, aspect) {
    this.images = images
    this.aspect = aspect
    this.clear()
    this.unregister()
    this.register()
    return false
  }
}

module.exports = Hoverbox
