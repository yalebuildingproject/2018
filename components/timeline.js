var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var Picture = require('../components/contain-picture')

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

  :host::-moz-range-track {
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
    border: none;
    background: none;
    width: 3rem;
    height: 3rem;
  }

  :host::-moz-range-thumb {
    border: 1px solid #ffff;
    height: 3rem;
    width: 3rem;
    background: #fff;
  }

  :host:-moz-focusring {
    outline: 1px solid white;
    outline-offset: -1px;
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
    this.forward = this.forward.bind(this)
    this.backward = this.backward.bind(this)
  }

  createElement (images, schedule) {
    this.schedule = schedule
    this.images = utils.sortByDataDate(images)
    this.min = this.schedule[0].date
    this.max = new Date()
    var range = subDays(this.max, this.min)
    this.i = closest(this.images, this.max)
    var image = this.images[this.i]

    return html`<div class="x xdc h100">
      <div class="xx">
        <div class="x xjc xac h100 psr">
          ${picture.render(image)}
          <div class="psa t0 l0 r0 b0 x xjb z1">
            <div class="s2 cursor-left" onclick=${this.backward}></div>
            <div class="s2 cursor-right" onclick=${this.forward}></div>
          </div>
        </div>
      </div>
      <form class="psr bt1-lightgray">
        <input class="w100 ${slider}" type="range" name="date" id="date" min="0" max="${range}" step="1" value="${range}">
        <output class="py1 psa r0 pen" name="result">${label(this.max)}</output>
      </form>
    </div>`
  }

  load () {
    ['input', 'change', 'keyup'].forEach(e => {
      this.element.addEventListener(e, this.changeDate, false)
    })
    this.register()
    window.addEventListener('resize', this.changeDate, false)
    this.changeDate()
  }

  unload (element) {
    ['input', 'change', 'keyup'].forEach(e => {
      element.removeEventListener(e, this.changeDate)
    })
    window.removeEventListener('resize', this.changeDate)
  }

  register () {
    document.addEventListener('click', (e) => {
      if (e.target.matches('a.active')) this.click(e)
    }, false)
  }

  click (e) {
    var date = e.target.dataset.date
    var input = this.element.querySelector('input')
    input.value = subDays(date, this.min)
    this.changeDate()
  }

  forward () {
    if ((this.i + 1) >= this.images.length) return
    var date = this.images[(this.i + 1)].data.date
    var input = this.element.querySelector('input')
    input.value = subDays(date, this.min)
    this.changeDate()
  }

  backward () {
    if ((this.i - 1) < 0) return
    var date = this.images[(this.i - 1)].data.date
    var input = this.element.querySelector('input')
    input.value = subDays(date, this.min)
    this.changeDate()
  }

  changeDate () {
    debounce(() => {
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
      this.i = closest(this.images, date)
      var image = this.images[this.i]
      picture.render(image)
    }, 10)()
  }

  update (images, schedule) {
    this.images = utils.sortByDataDate(images)
    this.schedule = schedule
    return false
  }
}

module.exports = Timeline

function label (date) {
  return `← ${format(date, 'MM/DD/YYYY')} →`
}

function closest (images, date) {
  var i = 0
  for (var j = 0; j < images.length; j++) {
    if (images[j].data.date <= date) {
      i = j
    } else {
      return i
    }
  }
  return i
}
