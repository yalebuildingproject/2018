module.exports = store

function store (state, emitter) {
  state.sortContact = 'sort'
  state.chooseContact = 'students'
  var people = state.page('/content/contact').v(state.chooseContact)
  people.sort(compareBy(state.sortContact))

  emitter.on('DOMContentLoaded', function () {
    emitter.on('contact:sort', function (method) {
      if (method == state.sortContact) return
      state.sortContact = method
      var people = state.page('/content/contact').v(state.chooseContact)
      people.sort(compareBy(method))
      emitter.emit('render')
    })
    emitter.on('contact:choose', function (choice) {
      if (choice == state.chooseContact) return
      state.chooseContact = choice
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
