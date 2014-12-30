#Off-Canvas

Controls the opening and closing of a off-canvas style navigation menu.

Styles for this component can be found at nib-styles/off-canvas-menu

A simpler but less feature-rich component can be found at nib-components/slider

#API

     var offcanvas = require('off-canvas');

     var menu = offcanvas({
       container: document.body,
       content: document.querySelector('.js-mobile-menu') // the content that sits on top of the menu until opened
       trigger: '.js-toggle-off-canvas', // element that is clicked to toggle menu
       className: 'is-open' // this class is added to the js-toggle-off-canvas element when opened
     });

     menu.open(); 
     menu.close();
