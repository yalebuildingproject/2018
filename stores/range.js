module.exports = store

function store (state, emitter) {
  state.range = 100

  emitter.on('DOMContentLoaded', function () {
    emitter.on('range', function (range) {
      state.range = range
      emitter.emit(state.events.RENDER)
    })
  })
}
