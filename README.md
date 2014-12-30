#Off-Canvas

Controls the opening and closing of a off-canvas style menu.

Styles for this component can be found at nib-styles/off-canvas-menu

A simpler but less feature-rich component can be found at nib-components/slider

#API

     var offcanvas = require('off-canvas');

     var menu = offcanvas({
       container: document.body,
       content: document.querySelector('.js-mobile-menu')
       trigger: '.js-toggle-off-canvas',
       className: 'is-open'
     });

     menu.open();
     menu.close();
    
