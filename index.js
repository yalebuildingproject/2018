var css = require('sheetify')
var choo = require('choo')
var hypha = require('hypha')

var utils = require('./lib/utils')

var opts = {}

if (process.env.NODE_ENV !== 'production') {
  opts.parse = require('./transforms/parse')
}

var site = hypha.readSiteSync('./content', opts)

css('ress')
css('./assets/css/css.js')
css('./assets/css/base.css')
css('./assets/fonts/lunchtype22.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use((state, emitter) => {
  state.site = utils.sitemap(site['/content'], site)
})
app.use(require('./stores/range'))
app.use(require('./stores/mouse'))
app.use(require('./stores/refresh'))

app.route('/', require('./views/home'))
app.route('/about', require('./views/about'))
app.route('/people', require('./views/people'))
app.route('/design', require('./views/design'))
app.route('/sponsors', require('./views/sponsors'))
app.route('/contact', require('./views/contact'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app
