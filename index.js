var css = require('sheetify')
var choo = require('choo')

css('ress')
css('./assets/base.css')
css('./assets/fonts/lunchtype22.css')
css('./assets/css.js')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(require('./stores/range'))
app.use(require('./stores/mouse'))
app.use(require('./stores/refresh'))

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app
