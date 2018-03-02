var throttle = require('lodash/throttle')

module.exports = store

function store (state, emitter) {
  state.x = 0
  state.y = 0

  var update = throttle(function (e) {
    state.x = e.pageX / window.innerWidth - 0.5
    state.y = e.pageY / window.innerHeight - 0.5
    emitter.emit(state.events.RENDER)
  }, 100)
  emitter.on('DOMContentLoaded', function () {
    window.document.addEventListener('mousemove', update)
  })
}
