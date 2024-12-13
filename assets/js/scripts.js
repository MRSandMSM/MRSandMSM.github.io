/* Dismiss plugin */
$.fn.dismiss = function(options) {
  var settings = $.extend({
    duration: 500,
    easing: "linear",
    target: "",
  }, options)

  var $this = $(this);
  $(this).click(function(e){
    if(event.preventDefault) {event.preventDefault()} else {event.returnValue = false}
    $(settings.target).fadeOut(settings.duration, settings.easing)
  })
}

/* Toaster plugin */
$.fn.toaster = function(options) {
  var settings = $.extend({
    duration: 500,
    easing: "linear",
    dismissSelector: ".close",
  }, options)

  var $this = $(this)
  var target = $this.attr("href")
  
  $this.click(function(e){
    if(event.preventDefault) {event.preventDefault()} else {event.returnValue = false}
    $(target).fadeToggle(settings.duration, settings.easing)
  })

  $(target).find(settings.dismissSelector).dismiss({
    duration: settings.duration,
    easing: settings.easing,
    target: target,
  })
}

/* Share plugin */
$.fn.share = function(options){
  var settings = $.extend({
    platforms: "facebook x linkedin2 google-plus tumblr email",
    iconClass: "icon icon-",
    iconWrap: "li",
    containerClass: "",
    container: "ul",
    labelText: "Share",
    labelClass: "",
    label: "span"
  }, options)
  
  var $this = $(this)
  var platforms = settings.platforms.split(" ")

  var platformName = {
    facebook: "Facebook",
    x: "X",
    linkedin2: "LinkedIn",
    "google-plus": "gPlus",
    tumblr: "Tumblr",
    email: "Email"
  }

  var shareCode = '';
  if(settings.container !== ""){
    shareCode += "<" + settings.container;
    if(settings.containerClass !== ""){shareCode += ' class="' + settings.containerClass + '"'}
    shareCode += ">";
  }
  if(settings.iconWrap !== "")
  var pageURL = '<a href="' + location.href + '" target="_blank">' + location.href + "</a>";
  $.each(platforms, function(index, platform){
    shareCode += '<a href="' + (platformName[platform] || pageURL) + '" class="';
    if(settings.iconClass !== "") {shareCode += settings.iconClass}
    shareCode += platform + '" target="_blank">' + platform + '</a>';
  })
  if(settings.container !== ""){shareCode += "</" + settings.container + ">"}
  
  $this.append(shareCode)
}

/* Tabs plugin */
$.fn.tabs = function(options){
  var settings = $.extend({
    navSelector: "> .menu",
    navActiveClass: "active",
    tabsSelector: ".tabs-content"
  }, options)
    
  var $this = $(this)
  var $navItem = $this.find(settings.navSelector + " li");
  
  var firstTab = $navItem.first().find("a").attr("href")
  $navItem.first().addClass(settings.navActiveClass)
  $(firstTab).show().siblings().hide()

  $navItem.each(function(){
    var $navLink = $(this).find("a");
    $navLink.click(function(e){
      if(event.preventDefault){event.preventDefault()} else {event.returnValue = false}
      $(this).parent().addClass(settings.navActiveClass).siblings().removeClass(settings.navActiveClass);
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
