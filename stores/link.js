var nanohref = require('nanohref')

var safeExternalLink = /(noopener|noreferrer) (noopener|noreferrer)/
var protocolLink = /^[\w-_]+:/

module.exports = function store (state, emitter) {
  emitter.on('DOMContentLoaded', () => {

    window.addEventListener('click', function (e) {
      if ((e.button && e.button !== 0) ||
        e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return

      var anchor = (function traverse (node) {
        if (!node || node === window.document) return
        if (node.localName !== 'a' || node.href === undefined) {
          return traverse(node.parentNode)
        }
        return node
      })(e.target)

      if (!anchor) return

      if (window.location.origin !== anchor.origin ||
        anchor.hasAttribute('download') ||
        (anchor.getAttribute('target') === '_blank' &&
          safeExternalLink.test(anchor.getAttribute('rel'))) ||
        protocolLink.test(anchor.getAttribute('href'))) return

      if (anchor.getAttribute('href') == '#') return

      var href = location.href
      var currHref = window.location.href
      if (href === currHref) {
        window.scrollTo(0, 0)
        emitter.emit('render')
      }
    })

    emitter.on(state.events.NAVIGATE, () => {
      window.scrollTo(0, 0)
    })
  })
}
