

var emitter = require('css-emitter');

function OffCanvas(options) {
  options = options || {};
  var resize = this._onWindowResize.bind(this);
  this.options = options;
  this.el = options.el;
  this.content = options.content || this.el.querySelector('.js-content');
  this.body = options.body || this.el.querySelector('.js-body');
  this.className = options.className || 'is-open';
  this.trigger = options.trigger || this.el.querySelector('.js-trigger');
  this.close = this.close.bind(this);
  this.open = this.open.bind(this);
  this.isOpen = false;
  this.isEnabled = false;

  // When the menu has finished closing
  emitter(this.body).bind(function(){
    if(this.isOpen) {
      this.body.addEventListener('click', this.close);
      setTimeout(function(){
        window.addEventListener('resize', resize);
      }, 10);
    }
    else {
      this.body.removeEventListener('click', this.close);
      window.removeEventListener('resize', resize);
      this.body.style.height = null;
      this.body.style.overflow = '';
    }
  }.bind(this));

}

/**
 * On resize, close the menu container
 * @return {void}
 */
OffCanvas.prototype._resize = function() {
  this.close();
};

/**
 * When the window is resized we need to update the menu
 * rendering or close the menu
 * @return {void}
 */
OffCanvas.prototype._onWindowResize = function() {
  this._resize();
};

/**
 * Push a function to fire after the current callstack
 * @param  {Function} callback
 * @return {void}
 */
OffCanvas.prototype._delay = function(callback){
  setTimeout(callback.bind(this), 0);
};

/**
 * Open the menu
 * @return {void}
 */
OffCanvas.prototype.open = function() {
  if(!this.isEnabled || this.isOpen) return false;
  this.isOpen = true;
  this.el.classList.add(this.className);
  this.body.style.overflow = 'hidden';
  this.body.style.height = window.innerHeight + 'px';
};

/**
 * Close the menu
 * @return {void}
 */
OffCanvas.prototype.close = function() {
  if(!this.isEnabled || !this.isOpen) return false;
  this.isOpen = false;
  this.el.classList.remove(this.className);
};

/**
 * Toggle the menu state
 * @return {void}
 */
OffCanvas.prototype.toggle = function() {
  return ((this.isOpen) ? this.close() : this.open());
};

/**
 * Disable the menu
 * @return {void}
 */
OffCanvas.prototype.disable = function() {
  if(!this.isEnabled) return;
  this.trigger.removeEventListener('click');
};

/**
 * Enable the menu
 * @return {void}
 */
OffCanvas.prototype.enable = function() {
  if(!this.trigger) return false;
  this.trigger.addEventListener('click', function(event){
    event.preventDefault();
    this.toggle();
  }.bind(this));
  this.isEnabled = true;
};

/**
 * Factory method to create menus
 * @param  {Object} options
 * @return {OffCanvas}
 */
OffCanvas.create = function(options) {
  var o =  new OffCanvas(options);
  o.enable();
  return o;
};

module.exports = OffCanvas;
