var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var format = require('date-fns/format')
var css = require('sheetify')

var slider = css`
  :host {
     -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    background: transparent; /* Otherwise white in Chrome */
  }

  :host::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  :host:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  :host::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

`

class Timeline extends Nanocomponent {
  constructor () {
    super()
  }

  createElement (images, entries) {
    return html`<div class="x xdc h100">
      <div class="xx x xjc xac">
        <div class="c6">
          <img class="mx100" src="/content/home/28153710_2007373269532073_9151033131048894464_n.jpg">
        </div>

      </div>
      <div class="py1 bt1-lightgray x xje">
        <div>← ${format(new Date(), 'MM/DD/YYYY')} →</div>
      </div>
    </div>`
  }

  update (images, entries) {
    return false
  }
}

module.exports = Timeline
