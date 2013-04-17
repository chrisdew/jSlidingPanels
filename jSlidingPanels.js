(function( $ ) {
  var openDelay = 100;
  var closeDelay = 300;

  $.fn.jSlidingPanel = function(edge, exposedPx, initialDelay, handleElement) {
    console.log('jSlidingPanel', edge, exposedPx, initialDelay, handleElement);
    var panelOpen = true;
    var closeTimeout = false;
    var openTimeout = false;

    var size;
    if (edge === 'top' || edge === 'bottom') {
      size = this.height();
    } else if (edge === 'left' || edge === 'right') {
      size = this.width();
    } else {
      throw "edge must be 'top', 'bottom', 'left' or 'right'.";
    }
    console.log('size', size);

    var property = 'margin-' + edge;

    var that = this;
    function close() {
      console.log('close');
      if (!panelOpen) return;
      if (handleElement) handleElement.show();
      var animOb = {};
      animOb[property] = (exposedPx - size) + 'px';
      console.log('that.animate(animOb)', animOb);
      that.animate(animOb);
      panelOpen = false;
      closeTimeout = false;
    };

    function open() {
      console.log('open');
      if (panelOpen) return;
      if (handleElement) handleElement.hide();
      var animOb = {};
      animOb[property] = '0px';
      console.log('that.animate(animOb)', animOb);
      that.animate(animOb);
      panelOpen = true;
    };

    
    this.mouseleave(function() {
      console.log('mouseleave');
      if (closeTimeout) clearTimeout(closeTimeout);
      if (openTimeout) clearTimeout(openTimeout);
      closeTimeout = setTimeout(close, closeDelay);
    });

    this.mouseenter(function() {
      console.log('mouseenter');
      if (openTimeout) clearTimeout(openTimeout);
      if (closeTimeout) clearTimeout(closeTimeout);
      closeTimeout = setTimeout(open, openDelay);
    });

    if (initialDelay) {
      closeTimeout = setTimeout(close, initialDelay);
    } else {
      close();
    }

  };
})( jQuery );
