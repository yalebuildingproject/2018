var raf = require('raf')
var throttle = require('lodash/throttle')


module.exports = store

function store (state, emitter) {
  // var render = throttle(function (e) {
  //   emitter.emit(state.events.RENDER)
  // }, 1000)

  // emitter.on('DOMContentLoaded', function () {
  //   raf(function tick() {
  //     render()
  //     raf(tick)
  //   })
  // })
}
