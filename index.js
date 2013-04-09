// var offcanvas = require('off-canvas');
//
// var menu = offcanvas({
//   container: document.body,
//   content: document.querySelector('.js-mobile-menu')
//   trigger: '.js-toggle-off-canvas',
//   className: 'is-open'
// });
// 
// menu.open();
// menu.close();
// 

var emitter = require('css-emitter');

function OffCanvas(options) {
  options = options || {};
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
  emitter(this.body).bind(function(){
    if(this.isOpen) return;
    this.body.style.height = null;
    this.body.style.overflow = '';
  }.bind(this));
}

OffCanvas.prototype.open = function() {
  if(!this.isEnabled || this.isOpen) return false;
  this.el.classList.add(this.className);
  setTimeout(function(){
    // window.addEventListener('resize', this.close);
    this.body.addEventListener('click', this.close);
  }.bind(this), 0);
  this.body.style.overflow = 'hidden';
  this.body.style.height = window.innerHeight + 'px';
  this.isOpen = true;
};

OffCanvas.prototype.close = function() {
  if(!this.isEnabled || !this.isOpen) return false;
  this.el.classList.remove(this.className);
  window.removeEventListener('resize', this.close);
  this.body.removeEventListener('click', this.close);
  this.isOpen = false;
};

OffCanvas.prototype.toggle = function() {
  return ((this.isOpen) ? this.close() : this.open());
};

OffCanvas.prototype.disable = function() {
  if(!this.isEnabled) return;
  this.trigger.removeEventListener('click');
};

OffCanvas.prototype.enable = function() {
  if(!this.trigger) return false;
  this.trigger.addEventListener('click', function(event){
    event.preventDefault();
    this.toggle();
  }.bind(this));
  this.isEnabled = true;
};

OffCanvas.create = function(options) {
  var o =  new OffCanvas(options);
  o.enable();
  return o;
};

module.exports = OffCanvas;