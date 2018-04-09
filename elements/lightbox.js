var html = require('choo/html')
var layout = require('../elements/primary-layout')

module.exports = lightbox

function lightbox (file) {

  var src = file.source

  var img = html`<div class="p0-25 c12">
      <img class="mx100" src="${src}">
    </div>`

  return html`
    <div class="z2 psf c12 usn t0 l0 r0 b0 px1-5 py1 bgc-white" style="background: hsla(0, 0%, 100%, 0.9)">
      ${layout('← Close', img)}
    </div>
  `
}
