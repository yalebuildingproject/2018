// // adapted from https://github.com/timwis/choo-leaflet-demo/blob/master/src/map.js
var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var leaflet = require('leaflet')
var onIdle = require('on-idle')

var mapStyle = css`
  :host {
    height: 300px;

    -webkit-filter: saturate(160%); /* Safari 6.0 - 9.0 */
    filter: saturate(160%);
  }
`

module.exports = Leaflet

function Leaflet () {
  if (!(this instanceof Leaflet)) return new Leaflet()
  Nanocomponent.call(this)

  this.map = null // capture leaflet
  this.coords = [0, 0] // null island
}

Leaflet.prototype = Object.create(Nanocomponent.prototype)

Leaflet.prototype.createElement = function (coords) {
  this.coords = coords
  return html`
    <div class="${mapStyle}">
      <div id="map"></div>
    </div>
  `
}

Leaflet.prototype.update = function (coords) {
  if (coords[0] !== this.coords[0] || coords[1] !== this.coords[1]) {
    var self = this
    onIdle(function () {
      self.coords = coords
      self.map.setView(coords, 18)
    })
  }
  return false
}

Leaflet.prototype.beforerender = function (el) {
  var coords = this.coords

  var map = leaflet.map(el).setView(coords, 18)
  leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiczN0aHRob21wc29uIiwiYSI6ImNqZzVwZGdoODMyM3cycXJxaG1hcWx3dDcifQ.af1hjAZ_ZgStZft8-oUTPw', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    minZoom: 10,
    maxZoom: 20
  }).addTo(map)

  this.map = map
}

Leaflet.prototype.load = function () {
  this.map.invalidateSize()
}

Leaflet.prototype.unload = function () {
  this.map.remove()
  this.map = null
  this.coords = [0, 0]
}
