var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var debounce = require('lodash/debounce')
var format = require('date-fns/format')
var subDays = require('date-fns/difference_in_days')
var addDays = require('date-fns/add_days')

var utils = require('../lib/utils')

var slider = css`
  :host {
     -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    background: transparent; /* Otherwise white in Chrome */
    cursor: ew-resize;
  }

  :host::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 3rem;
    height: 3rem;
  }

  :host:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

`

class Timeline extends Nanocomponent {
  constructor () {
    super()
    this.entries = []
    this.tick = this.tick.bind(this)
    this.click = this.click.bind(this)
  }

  createElement (images, entries) {
    this.entries = utils.sortDate(entries)
    this.images = utils.sortDate(images)
    this.min = this.entries[0].date
    this.max = new Date()
    var range = subDays(this.max, this.min)

    return html`<div class="x xdc h100">
      <div class="xx x xjc xac">
        <div class="c6">
          <img class="mx100 my100">
        </div>

      </div>
      <form class="psr bt1-lightgray">
        <input class="w100 ${slider}" type="range" name="date" id="date" min="0" max="${range}" step="1">
        <output class="py1 psa r0 pen" name="result">${label(this.max)}</output>
      </form>
    </div>`
  }

  load () {
    ['input', 'change', 'keyup'].forEach(e => {
      this.element.addEventListener(e, this.tick, false)
    })
    this.register()
    window.addEventListener('resize', debounce(this.tick, 10), false)
    var input = this.element.querySelector('input')
    input.value = input.max
    this.tick()
  }

  unload () {
    ['input', 'change', 'keyup'].forEach(e => {
      if (this.element) {
        this.element.removeEventListener(e, this.tick)
      }
    })
    this.unregister()
    window.removeEventListener('resize', debounce(this.tick, 10))
  }

  register () {
    var links = document.querySelectorAll('a.active');
    links.forEach(link => {
      link.addEventListener('click', this.click, false)
    })
  }

  unregister () {
    var links = document.querySelectorAll('a.active');
    links.forEach(link => {
      link.removeEventListener('click', this.click)
    })
  }

  click (e) {
    debugger;
    var date = e.target.dataset.date
    var input = this.element.querySelector('input')
    input.value = subDays(date, this.min)
    this.tick()
  }

  tick () {
    var input = this.element.querySelector('input')
    var output = this.element.querySelector('output')
    var img = this.element.querySelector('img')
    var range = input.max - input.min
    var percent = 1 - (input.value - input.min) / range
    var elWidth = output.offsetWidth
    var totalWidth = input.offsetWidth - elWidth
    var offset = (percent * totalWidth)
    output.style.transform = `translate(${-Math.floor(offset)}px)`
    var date = addDays(this.min, input.value)
    output.innerHTML = label(date)
    var image = closest(this.images, date)
    img.src = image.source
  }

  update (images, entries) {
    this.images = images
    this.entries = entries
    this.unregister()
    this.register()
    return false
  }
}

module.exports = Timeline

function label (date) {
  return `← ${format(date, 'MM/DD/YYYY')} →`
}

function closest (images, date) {
  var out = images[0]
  for (var image of images) {
    if (image.date <= date) {
      out = image
    } else {
      return out
    }
  }
  return out
}
