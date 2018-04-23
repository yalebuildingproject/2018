var html = require('choo/html')
var raw = require('choo/html/raw')

var css = require('sheetify')

var utils = require('../lib/utils')
var header = require('../elements/header')
var container = require('../elements/list-container')

var TITLE = 'Contact - Building Project 2018'

var menu = css`
  :host li:before {
    content: "\\2192\\0020\\0020";
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var contact = state.page('/content/contact').value()

  var col1 = html`<div class="x xdc xjb h100">
    <div>
      <p>Choose:</p>
      <ul class="${menu}">
        <li><a href="#" class="dib ${(state.chooseContact == 'students') ? 'tdu' : ''} tdu-hover" data-choice="students" onclick=${choose}>Student Leadership</a></li>
        <li><a href="#" class="dib ${(state.chooseContact == 'faculty') ? 'tdu' : ''} tdu-hover" data-choice="faculty" onclick=${choose}>Faculty</a></li>
      </ul>
      <p>Sort by:</p>
      <ul>
        <li><a href="#" class="dib ${(state.sortContact == 'first') ? 'tdu' : ''} tdu-hover" data-method="first" onclick=${sort}>First Name</a></li>
        <li><a href="#" class="dib ${(state.sortContact == 'last') ? 'tdu' : ''} tdu-hover" data-method="last" onclick=${sort}>Last Name</a></li>
        <li><a href="#" class="dib ${(state.sortContact == 'sort') ? 'tdu' : ''} tdu-hover" data-method="sort" onclick=${sort}>Role</a></li>
      </ul>
    </div>
    <div class="compact">
      ${raw(contact.html)}
    </div>
  </div>`


  var col2 = html`<div>
    ${contact[state.chooseContact].map(person => {
      return html`<div class="c12 x xjb">
        <div class="c4 pr1-5 fs1-6 hang-indent">${utils.fullname(person.first, person.last)}</div>
        <div class="c4 fs1-6 c-gray">${person.role}</div>
        <div class="c4 fs1-6 c-gray"><a href="mailto:${person.email}">${person.email}</a></div>
      </div>`
    })}
  </div>`

  return html`
    <body class="ff-sans px1-5">
      ${header('/contact')}
      ${container(col1, col2)}
    </body>
  `

  function choose(e) {
    emit('contact:choose', e.target.dataset.choice)
  }

  function sort(e) {
    emit('contact:sort', e.target.dataset.method)
  }
}
