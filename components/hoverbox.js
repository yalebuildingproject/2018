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
  }

  createElement (images, aspect) {
    this.aspect = aspect
    this.images = images
    return html`<div class="xx x xjc xac">
        <div class="c12 p1 lg-p3">
          ${picture.render(null, this.aspect)}
        </div>
      </div>`
  }

  load () {
    this.register()
    this.prefetch()
  }

  prefetch () {
    // Object.values(this.images).map(image => {
    //   image.buffer = html`<picture>
    //       ${utils.sourceTag(image.source, image.data.aspect, 'image/webp')}
    //       ${utils.sourceTag(image.source, image.data.aspect, 'image/jpeg')}
    //       <img src="${image.source}">
    //     </picture>`
    // })
  }

  unload () {
    this.unregister()
  }

  display (e) {
    var image = this.images[e.target.dataset.image]
    picture.render(image.source, image.data.aspect)
  }

  register () {
    this.people = Array.from(document.querySelectorAll('div.person'))
    this.people.forEach(person => {
      person.addEventListener('mouseenter', this.display, false)
    })
  }

  unregister () {
    this.people.forEach(person => {
      person.removeEventListener('mouseenter', this.display)
    })
  }

  update (images, aspect) {
    this.images = images
    this.aspect = aspect
    this.clear()
    return false
  }
}

module.exports = Hoverbox
