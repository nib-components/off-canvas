# @nib-components/off-canvas

Show and hide off-canvas content.

## Installation

Browserify:

    npm install --save @nib-components/off-canvas

Component

    component install nib-components/off-canvas

#Usage

HTML:
    
    <div class="offcanvas js-offcanvas">
    
      <div class="offcanvas__content">
        The off-canvas content hidden off the page
      </div>
    
      <div class="offcanvas__canvas js-offcanvas-trigger-close">
        <button class="js-offcanvas-trigger-open">Trigger</button>
        The off-canvas content visible on the page
      </div>
    
    </div>

CSS:

    html, body {
      height: 100%;
    }
  
    .offcanvas {
      position: relative;
      height: 100%;
    }
  
    .offcanvas--visible {
      overflow: hidden;
    }
  
    .offcanvas__content {
      width: 280px;
      height: 100%;
      position: absolute;
      overflow: scroll;
    }
  
    .offcanvas__content::-webkit-scrollbar {
      display: none;
    }
  
    .offcanvas__canvas {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform .5s ease-in-out;
      box-shadow: -2px -6px 6px hsla(0, 0%, 0%, 0.4);
    }
  
    .offcanvas--visible .offcanvas__canvas {
      transform: translate(280px);
    }
  
JS:

     var offcanvas = require('@nib-components/off-canvas');
     offcanvas({el: document.querySelector('.js-offcanvas'), visibleClass: 'offcanvas--visible'});

## API

### new OffCanvas(options)

Create a new off-canvas component.

Options:

- `el`            - The off-canvas container
- `openTrigger`   - An element that triggers the showing of the off-canvas content on click 
- `closeTrigger`  - An element that triggers the hiding of the off-canvas content on click
- `visibleClass`  - The class applied to the off-canvas container while the off-canvas content is visible

### .show()

Show the off-canvas content.

### .hide()

Hide the off-canvas content.

### .toggle()

Toggle whether the off-canvas content is visible.

## Changelog

### v1.0.0

- support for browserify
- rely on classes rather than setting style values in JS
- changed method and option names
- added documentation
- added an example




