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
  }

  createElement (images, entries) {
    this.entries = entries
    images = utils.sortDate(images)
    this.min = images[0].date
    this.max = new Date()
    var range = subDays(this.max, this.min)

    return html`<div class="x xdc h100">
      <div class="xx x xjc xac">
        <div class="c6">
          <img class="mx100" src="/content/home/28153710_2007373269532073_9151033131048894464_n.jpg">
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
    window.addEventListener('resize', debounce(this.tick, 10), false)
  }

  unload () {
    ['input', 'change', 'keyup'].forEach(e => {
      this.element.removeEventListener(e, this.tick)
    })
    window.removeEventListener('resize', debounce(this.tick, 10))
  }

  tick () {
    var input = this.element.querySelector('input')
    var output = this.element.querySelector('output')
    var range = input.max - input.min
    var percent = 1 - (input.value - input.min) / range
    var elWidth = output.offsetWidth
    var totalWidth = input.offsetWidth - elWidth
    var offset = (percent * totalWidth)
    output.style.transform = `translate(${-Math.floor(offset)}px)`
    output.innerHTML = label(addDays(this.min, input.value))
  }

  update (images, entries) {
    this.images = images
    this.entries = entries
    return false
  }
}

module.exports = Timeline

function label (date) {
  return `← ${format(date, 'MM/DD/YYYY')} →`
}
