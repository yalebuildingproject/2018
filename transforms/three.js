var hyperstream = require('hyperstream')

module.exports = function() {

  var three = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/90/three.min.js"></script>
    <script src="/assets/js/OrbitControls.js"></script>
    `

  return hyperstream({
    head: {
      _appendHtml: three
    }
  })
}
