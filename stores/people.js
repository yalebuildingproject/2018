module.exports = store

function store (state, emitter) {
  state.sortPeople = 'last'
  var people = state.page('/content/people').v('people')
  people.sort(compareBy(state.sortPeople))

  emitter.on('DOMContentLoaded', function () {
    emitter.on('people:sort', function (method) {
      if (method == state.sortPeople) return
      state.sortPeople = method
      var people = state.page('/content/people').v('people')
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
