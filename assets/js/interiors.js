$(document).ready(function(){
  /* Tabs plugin */
  $.fn.tabs = function(options){
    var settings = $.extend({
      navSelector: "> .menu",
      tabsSelector: ".tabs-content",
      activeClass: "active"
    }, options)
    
    var $this = $(this)
    var $navItem = $this.find(settings.navSelector + " li");
    var $navLink = $navItem.find("a");
    
    $navItem.first().find("a").trigger("click")
    $navLink.click(function(e){
      if(event.preventDefault){event.preventDefault()} else {event.returnValue = false}
      $(settings.tabsSelector).find($navLink.attr("href")).addClass(settings.activeClass).siblings().removeClass(settings.activeClass)
    })
  }
  
  $.fn.txtLoader = function(url, options, callback){
    var settings = $.extend({
      namespace: '',
      loadAs: 'text'
    }, options)

    var loadURL = settings.namespace + url + '.txt'
    var $this = $(this);

    $.ajax({
      url: loadURL,
      dataType: settings.loadAs,
      success: function(data) {
        $this.html(data)
        if (callback && typeof callback === 'function') {
          callback($this);
        }
      }
    })
  }
  $.fn.gradientStops = function(startColor, endColor, n) {
    // Simplified function to convert hex color to RGB
    function hexToRgb(hex) {
      hex = hex.replace('#', ''); // Remove the '#' if present
      
      if (hex.length === 3) {
      // Handle shorthand hex (e.g. #fff)
        hex = hex.split('').map(function(c) { return c + c }).join('');
      }
      
      var r = parseInt(hex.slice(0, 2), 16);
      var g = parseInt(hex.slice(2, 4), 16);
      var b = parseInt(hex.slice(4, 6), 16);
      return { r: r, g: g, b: b };
    }
    
    // Function to convert RGB to hex
    function rgbToHex(r, g, b) {return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}
    
    // Ensure n is at least 2 (one start, one end)
    n = Math.max(n, 2);
    
    // Convert start and end colors to RGB
    var startRgb = hexToRgb(startColor);
    var endRgb = hexToRgb(endColor);
    
    // Calculate step size for each color component (R, G, B)
    var stepR = (endRgb.r - startRgb.r) / (n - 1);
    var stepG = (endRgb.g - startRgb.g) / (n - 1);
    var stepB = (endRgb.b - startRgb.b) / (n - 1);

    // Create array of color stops
    var colorStops = [];
    for (var i = 0; i < n; i++) {
      var r = Math.round(startRgb.r + stepR * i);
      var g = Math.round(startRgb.g + stepG * i);
      var b = Math.round(startRgb.b + stepB * i);
      colorStops.push(rgbToHex(r, g, b));
    }

    // Return the array of gradient stops
    return colorStops;
  };
  
  /* II. Discography page */
  $(".tabs").tabs()
  $(".tracklist").each(function(){
    var $this = $(this);
    
    var album = $this.attr("id")
    $this.txtLoader(album, {
      namespace: '/assets/text-data/',
      loadAs: 'html'
    }, function($loadedTracklist) {
      var tracksQty = $loadedTracklist.find("li").length;
      var trackColors = $loadedTracklist.gradientStops("#052d6a", "#c91e30", tracksQty);

      $loadedTracklist.find("li").each(function(trackN){
        $(this).css("color", trackColors[trackN]);
        $(this).find(".title").before('<span class="track">' + parseInt(trackN + 1) + '</span>')
      });
    })
  })
})
