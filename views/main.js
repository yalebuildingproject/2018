var html = require('choo/html')
var css = require('sheetify')
var Logo = require('../components/logo')

var logo = new Logo()

var header = require('../elements/header')

var pos1 = css`
  :host {
    left: 40px;
    top: 160px;
  }
`

var pos2 = css`
  :host {
    left: 200px;
    top: 90px;
  }
`

var pos3 = css`
  :host {
    left: 130px;
    top: 100px;
  }
`

var panel = css`
  :host {
    will-change: transform;
    transition: opacity 1s ease, transform .2s
  }
`

var pointer = css`
  :host {
    cursor: ew-resize !important
  }
`


var TITLE = 'bp - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var d = new Date();
  d.setDate(d.getDate() - (100 - state.range))

  var date = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
  var offset = Math.floor(state.range / 100 * 80)

  var x = Math.floor(state.x * 10)
  var y = - Math.floor(state.y * 10)
  var phase
  var index

  if (d < new Date(2017, 11, 15)) {
    phase = 'Design'
    index = 1
  } else if (d > new Date(2018, 1, 15)) {
    phase = 'Completion'
    index = 3
  } else {
    phase = 'Construction'
    index = 2
  }

  return html`
    <body class="ff-sans">
      ${header()}
      ${logo.render()}
      <div class="psf ${panel} ${pos1} x xafe pen" style="opacity: ${index == 1 ? 1 : 0};">
        <img class="pr1" width="900px" src="./assets/1.jpg">
        <div class="c2">
          <h3 style="color: gray">— Design</h3>
          <p>Team D proposal for a 1,000 square foot house of two separate dwellings.</p>
        </div>
      </div>
      <div class="psf ${panel} ${pos2} x xafe pen" style="opacity: ${index == 2 ? 1 : 0}; ">
        <img class="pr1" width="600px" src="./assets/2.jpg">
        <div class="c2">
          <h3 style="color: gray">— Construction</h3>
          <p>Construction included site work, prefabrication, and final assembly.</p>
        </div>
      </div>
      <div class="psf ${panel} ${pos3} x xafe pen" style="opacity: ${index == 3 ? 1 : 0}; ">
        <img class="pr1" width="700px" src="./assets/3.jpg">
        <div class="c2">
          <h3 style="color: gray">— Completion</h3>
          <p>The clients have moved into the completed house.</p>
        </div>
      </div>
      <footer class="z4 psf c12 usn b0 l0 r0 p1 x">
        <div class="c12 b1-black bgc-white">
          <input type="range" oninput="${range}" value="100" min="0" max="100" tabindex="-1" class="w100 h100 op0 p1 ${pointer}">
        </div>
      </footer>
      <div class="z4 psf c12 usn b0 l0 r0 p1 x pen">
        <div class="p1" style="will-change: transform; transform: translate(${offset}vw)">
          <span class="mr1">← ${date} →</span>
        </div>
      </div>
    </body>
  `

  function range(e) {
    emit('range', e.target.value)
  }
}
