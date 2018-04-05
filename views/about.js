var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')

var TITLE = 'bp - about'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="ff-sans">
      ${header()}
      <div class="container c12 x px2">
        <div class="c6">
          <h1>About</h1>
        </div>
        <div class="c3">
          <p class="my1">
            This year’s site is located at 43 Button Street in New Haven’s Hill neighborhood.
          </p>
          <p class="my1">
            Since 1967, first-year students at the Yale School of Architecture have worked collaboratively to design and build a structure as part of their graduate education. Unique among architecture schools, the Jim Vlock Building Project is a vital component of Yale's curriculum.</p>
        </div>
      </div>
      <div class="c12 x px2 mt1">
        <div class="co3 c3 p025">
          <img class="mx100" src="./assets/old.jpg">
        </div>
        <div class=" c3 p025">
          <img class="mx100" src="./assets/new.jpg">
        </div>
      </div>
      <div class="c12 x px2 mt1">
        <div class=" co3 c3">
          <p class="my1">
            For the second consecutive year, the Yale School of Architecture is partnering with Columbus House, a non-profit organization working to end homelessness in the New Haven area. Columbus House offers emergency shelter and a range of housing services to community members experiencing or at risk of homelessness, with the ultimate goal of providing service-enriched or independent housing to those in need.</p>
          <p class="my1">
            Students are tasked with creating a cost-efficient design for a 1,000 square foot two-unit home, while exploring methods and assemblies unique to traditional stick-frame and cross-laminated timber construction. Students work in teams to design and develop proposals for the dwelling, taking each proposal through the technical documentation phase. A final design is selected at the end of the spring semester, and students begin construction in early May.</p>
        </div>
      </div>
    </body>
  `
}
