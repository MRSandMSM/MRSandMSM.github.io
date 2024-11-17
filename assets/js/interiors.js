$(document).ready(function(){
  $.fn.txtLoader = function(url, options){
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
  $(".tracklist").each(function(){
    var $this = $(this);
    
    var album = $this.attr("id")
    $this.txtLoader(album, {
      namespace: '/assets/text-data/',
      loadAs: 'html'
    })
  })
  
  setTimeout(function(){
    var tracksQty = $this.find("li").length;
    var trackColors = $this.gradientStops("#052d6a", "#c91e30", tracksQty)

    $this.find("li").each(function(){
      var trackNumber = $(this).index();
      var trackColor = trackColors[trackNumber]
      $(this).css("color", trackColor)
    })
  }, 0)
})
