var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var Picture = require('../components/picture')

var picture = new Picture()

var debounce = require('lodash/debounce')
var format = require('date-fns/format')
var subDays = require('date-fns/difference_in_days')
var addDays = require('date-fns/add_days')

var utils = require('../lib/utils')

var slider = css`
  :host {
     -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    background: transparent; /* Otherwise white in Chrome */
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  :host:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
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
    this.schedule = []
    this.changeDate = this.changeDate.bind(this)
    this.click = this.click.bind(this)
  }

  createElement (images, schedule) {
    this.schedule = schedule
    this.images = utils.sortByDataDate(images)
    this.min = this.schedule[0].date
    this.max = new Date()
    var range = subDays(this.max, this.min)
    var image = closest(this.images, this.max)

    return html`<div class="x xdc h100">
      <div class="xx x xjc xac">
        <div id="container" class="c8">
          ${picture.render(image.source, image.data.aspect)}
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
      this.element.addEventListener(e, this.changeDate, false)
    })
    this.register()
    window.addEventListener('resize', debounce(this.changeDate, 10), false)
    var input = this.element.querySelector('input')
    input.value = input.max
    this.changeDate()
    this.prefetch()
  }

  prefetch () {
    Object.values(this.images).map(image => {
      image.buffer = html`<picture>
          ${utils.sourceTag(image.source, image.data.aspect, 'image/webp')}
          ${utils.sourceTag(image.source, image.data.aspect, 'image/jpeg')}
          <img src="${image.source}">
        </picture>`
    })
  }

  unload (element) {
    ['input', 'change', 'keyup'].forEach(e => {
      element.removeEventListener(e, this.changeDate)
    })
    this.unregister()
    window.removeEventListener('resize', debounce(this.changeDate, 10))
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
    var date = e.target.dataset.date
    var input = this.element.querySelector('input')
    input.value = subDays(date, this.min)
    this.changeDate()
  }

  changeDate () {
    var input = this.element.querySelector('input')
    var output = this.element.querySelector('output')
    var range = input.max - input.min
    var percent = 1 - (input.value - input.min) / range
    var elWidth = output.offsetWidth
    var totalWidth = input.offsetWidth - elWidth
    var offset = (percent * totalWidth)
    output.style.transform = `translate(${-Math.floor(offset)}px)`
    output.style['-webkit-transform'] = `translate(${-Math.floor(offset)}px)`
    output.style['-ms-transform'] = `translate(${-Math.floor(offset)}px)`
    var date = addDays(this.min, input.value)
    output.innerHTML = label(date)
    var image = closest(this.images, date)
    picture.render(image.source, image.data.aspect)
    var container = this.element.querySelector('#container')
    if (image.data && image.data.aspect < 1) {
      container.classList.remove('c8')
      container.classList.add('c4')
    } else {
      container.classList.remove('c4')
      container.classList.add('c8')
    }
  }

  update (images, schedule) {
    this.images = utils.sortByDataDate(images)
    this.schedule = schedule
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
    if (image.data.date <= date) {
      out = image
    } else {
      return out
    }
  }
  return out
}
