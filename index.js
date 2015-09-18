var css = require('css-emitter')
var throttle = require('throttleit')

/**
 * Off-canvas component
 * @constructor
 * @param   {Object}              options
 * @param   {HTMLElement}         options.el
 * @param   {HTMLElement|string}  [options.openTrigger]
 * @param   {HTMLElement|string}  [options.closeTrigger]
 * @param   {string}              [options.visibleClass]
 *
 */
function OffCanvas (options) {
  options = options || {};

  if (!(this instanceof OffCanvas)) {
    return new OffCanvas(options);
  }

  this.visibleClass = options.visibleClass || 'is-visible'

  this.el = options.el;
  if (!this.el) throw new Error('offcanvas: Element not found')

  this.openTriggerEl = typeof options.openTrigger === 'string' || typeof options.openTrigger === 'undefined' ? this.el.querySelector(options.openTrigger || '.js-offcanvas-trigger-open') : options.openTrigger
  this.closeTriggerEl = typeof options.closeTrigger === 'string' || typeof options.closeTrigger === 'undefined' ? this.el.querySelector(options.closeTrigger || '.js-offcanvas-trigger-close') : options.closeTrigger

  this.onTriggerOpen = this.onTriggerOpen.bind(this)
  this.onTriggerClose = this.onTriggerClose.bind(this)
  this.onResize = throttle(this.onWindowResized.bind(this))

  var self = this
  css(this.el).bind(function () {
    if (self.isVisible) {
      window.addEventListener('resize', self.onResize)
      if (self.openTriggerEl) self.openTriggerEl.removeEventListener('click', self.onTriggerOpen)
      if (self.closeTriggerEl) self.closeTriggerEl.addEventListener('click', self.onTriggerClose)
    } else {
      window.removeEventListener('resize', self.onResize)
      if (self.openTriggerEl) self.openTriggerEl.addEventListener('click', self.onTriggerOpen)
      if (self.closeTriggerEl) self.closeTriggerEl.removeEventListener('click', self.onTriggerClose)
    }
  })

  this.isVisible = false;
  if (this.openTriggerEl) this.openTriggerEl.addEventListener('click', this.onTriggerOpen)
}

OffCanvas.prototype = {

  /**
   * Show the off-canvas content
   * @returns {OffCanvas}
   */
  show: function () {
    if (this.isVisible) return this
    this.isVisible = true
    this.el.classList.add(this.visibleClass)
    return this
  },

  /**
   * Hide the off-canvas content
   * @returns {OffCanvas}
   */
  hide: function () {
    if (!this.isVisible) return this
    this.isVisible = false
    this.el.classList.remove(this.visibleClass)
    return this
  },

  /**
   * Toggle whether the off-canvas content is visible
   * @returns {OffCanvas}
   */
  toggle: function () {
    this.isVisible ? this.hide() : this.show()
    return this;
  },

  /**
   * Handle user events
   * @param event
   */
  onTriggerOpen: function (event) {
    this.show()
  },

  /**
   * Handle user events
   * @param event
   */
  onTriggerClose: function (event) {
    this.hide()
  },

  /**
   * Handle user events
   * @param event
   */
  onWindowResized: function (event) {
    this.hide()
  }

}

module.exports = OffCanvas;