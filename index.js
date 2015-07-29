var on = require('dom-event')
var parent = require('findup-element')
var window = require('global/window')
var location = window.location

module.exports = function (el, callback) {
  if (!el || !callback) throw new Error('Both el and callback arguments required')

  on(el, 'click', function (e) {
    var link = (e.target.tagName === 'A') ? e.target : parent(e.target, 'a')
    if (link.origin !== location.origin) return
    if (e.which !== 1 || e.metaKey || e.ctrlKey) return
    if (link.getAttribute('target') === '_blank') return
    if (link.getAttribute('data-ignore') !== null) return
    if (link.href.indexOf('#') === 0) return
    if (link.href.indexOf('javascript:') === 0) return
    if (link.href.indexOf('mailto:') === 0) return
    if (link.href.indexOf('tel:') === 0) return
    e.preventDefault()
    callback(link.pathname + link.search + link.hash, link, e)
  })
}
