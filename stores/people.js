module.exports = store

function store (state, emitter) {
  state.sortBy = 'last'

  emitter.on('DOMContentLoaded', function () {
    emitter.on('people:sort', function (method) {
      if (method == state.sortBy) return
      state.sortBy = method
      var people = state.site.pages.people.people
      people.sort(compareBy(method))
      emitter.emit('render')
    })
  })
}

function compareBy(key) {
  return (a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  }
}
