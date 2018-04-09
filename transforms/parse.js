var commonmark = require('commonmark')
var typeset = require('typeset')
var smarkt = require('smarkt')

var reader = new commonmark.Parser()
var writer = new commonmark.HtmlRenderer()

module.exports = parse

function parse(str) {
  var content = smarkt.parse(str)
  if (content.text) {
    var html = markdown(content.text)
    content.html = typeset(html)
  }
  return content
}

function markdown(str) {
  var parsed = reader.parse(str)
  return writer.render(parsed)
}
