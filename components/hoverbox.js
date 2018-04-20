var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var layout = require('../elements/primary-layout')

class Hoverbox extends Nanocomponent {
  constructor () {
    super()
    this.people = []
    this.headshot = this.headshot.bind(this)
    this.clear = this.clear.bind(this)
  }

  createElement () {

    return html`<div class="xx x xjc xac">
        <div class="c12 p3">
          <img class="mx100 my100" src="">
        </div>
      </div>`
  }

  load () {
    this.register()
  }

  unload () {
    this.unregister()
  }

  headshot (e) {
    var img = this.element.querySelector('img')
    if (img.src !== e.target.dataset.source) img.src = e.target.dataset.source
  }

  clear () {
    var img = this.element.querySelector('img')
    img.src = ''
  }

  register () {
    this.people = document.querySelectorAll('div.person');
    this.people.forEach(person => {
      person.addEventListener('mouseenter', this.headshot, false)
      person.addEventListener('mouseleave', this.clear, false)
    })
  }

  unregister () {
    this.people.forEach(person => {
      person.removeEventListener('mouseenter', this.headshot)
      person.removeEventListener('mouseleave', this.clear)
    })
  }

  update () {
    this.clear()
    this.unregister()
    this.register()
    return false
  }
}

module.exports = Hoverbox
