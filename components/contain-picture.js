var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var Picture = require('../components/picture')
var picture = new Picture()

var vertical = css`
  :host {
    height: 80%;
    width: auto
  }
`

var horizontal = css`
  :host {
    width: 80%;
    height: auto;
  }
`

var container = css`
  :host {
    width: 60vw;
    height: 75vh;
  }
`

class ContainPicture extends Nanocomponent {
  constructor () {
    super()
  }

  createElement (image) {
    this.image = image
    var aspect = this.image.data.aspect
    var width = (aspect > 1) ? '48vw' : Math.round(aspect * 60) + 'vh'
    var height = (aspect > 1) ? Math.round(1 / aspect * 48) + 'vw' : '60vh'
    return html`<div class="${container} x xac xjc">
        <div style="width: ${width}; height: ${height};">
        </div>
      </div>`
  }

  load (el) {
    this.addPicture(el)
  }

  afterupdate (el) {
    this.addPicture(el)
  }

  addPicture (el) {
    el.firstChild.appendChild(picture.render(this.image.source, this.image.data.aspect))
  }

  update (image) {
    return (this.image.source !== image.source)
  }
}

module.exports = ContainPicture
