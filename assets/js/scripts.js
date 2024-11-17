/* Tabs plugin */
$.fn.tabs = function(options){
  var settings = $.extend({
    navSelector: "> .menu",
    tabsSelector: ".tabs-content",
    activeClass: "active"
  }, options)
    
  var $this = $(this)
  var $navItem = $this.find(settings.navSelector + " li");
  var $navItem.first().find("a").trigger("click");

  $navItem.each(function(){
    var $navLink = $(this).find("a");
    $navLink.click(function(e){
      if(event.preventDefault){event.preventDefault()} else {event.returnValue = false}
      $(settings.tabsSelector).find($navLink.attr("href")).show().siblings().hide()
    })
  })
}

/* Load .txt files */
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

/* Calculate and display stops in a gradient */
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
