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
    dismissException: ".clear"
  }, options)

  var $this = $(this)
  var target = $this.attr("href")
  
  $this.click(function(e){
    if(event.preventDefault) {event.preventDefault()} else {event.returnValue = false}
    $(target).fadeToggle(settings.duration, settings.easing)
  })

  $(target).find(settings.dismissSelector).not(settings.dismissException).dismiss({
    duration: settings.duration,
    easing: settings.easing,
    target: target,
  })
}

/* Share plugin */
$.fn.share = function(options){
  var settings = $.extend({
    url: location.href,
    platforms: "facebook x linkedin2 google-plus tumblr email",
    complementaryText: {
      use: true,
      class: "visually-hidden",
      element: "span"
    },
    iconClass: "icon icon-",
    wrap: {
      class: "share-item",
      lastChild: "last",
      element: "li"
    },
    container: {
      class: "menu",
      element: "ul"
    },
    label: {
      text: "Share",
      class: "share-label",
      element: "span"
    },
    after: function(){
      if(settings.wrap !== "") {if(settings.wrap.element !== "") {$(this).find(settings.wrap.element).last().addClass(settings.wrap.lastChild)}}
    }
  }, options)
  
  var platforms = settings.platforms.split(" ")
  var platformURL = {
    facebook: ["Facebook", "https://www.facebook.com/sharer/sharer.php?u=" + settings.url],
    x: ["X", "https://x.com/intent/post?text=" + $("title").html() + "%0A" + settings.url],
    linkedin2: ["LinkedIn", "https://www.linkedin.com/shareArticle?mini=true&url=" + settings.url],
    "google-plus": ["Google+", "https://plus.google.com/share?url=" + settings.url],
    tumblr: ["Tumblr", "https://www.tumblr.com/widgets/share/tool?canonicalUrl=" + settings.url],
    email: ["Email", "mailto:?subject=" + $("title").html() + "&body=Oi [recipient name],%0ACheck out " + $("title").html() + ":" + settings.url + "%0A%0AOi!%0A[your name]"]
  }

  var shareCode = '';
  
  if(settings.label !== "") {
    var labelCode = '';
    if(settings.label.element !== "") {
      labelCode += "<" + settings.label.element;
      if(settings.label.class !== "") {labelCode += ' class="' + settings.label.class + '"'}
      labelCode += ">"
    }
    if(settings.label.text !== "") {labelCode += settings.label.text}
    if(settings.label.element !== "") {labelCode += "</" + settings.label.element + ">"}
    
    shareCode += labelCode;
  }
  if(settings.container !== "") {
    if(settings.container.element !== "") {
      shareCode += "<" + settings.container.element;
      if(settings.container.class !== "") {shareCode += ' class="' + settings.container.class + '"'}
      shareCode += ">"
    }
  }
  $.each(platforms, function(index, platform){
    if(settings.wrap !== ""){
      if(settings.wrap.element !== "") {
        shareCode += "<" + settings.wrap.element;
        if(settings.wrap.class !== "") {shareCode += ' class="' + settings.wrap.class + '"'}
        shareCode += ">"
      }
    }
    if(platformURL[platform]) {
      var platformName = platformURL[platform][0]
      var platformLink = platformURL[platform][1]

      shareCode += '<a href="' + platformLink + '" class="';
      if(settings.iconClass !== "") {shareCode += settings.iconClass}
      shareCode += platform + '" target="_blank">';
      if(settings.complementaryText !== "") {
        if(settings.complementaryText.use == true) {
          if(settings.complementaryText.element !== "") {
            shareCode += "<" + settings.complementaryText.element;
            if(settings.complementaryText.class !== "") {shareCode += ' class="' + settings.complementaryText.class + '"'}
            shareCode += ">";
          }
          shareCode += platformName
          if(settings.complementaryText.element !== "") {shareCode += "</" + settings.complementaryText.element + ">"}
        }
      }
      shareCode += "</a>";
    }
    if(settings.wrap !== "") {if(settings.wrap.element !== "") {shareCode += "</" + settings.wrap.element + ">"}}
  })
  if(settings.container !== "") {if(settings.container.element !== "") {shareCode += "</" + settings.container.element + ">"}}
  
  $(this).append(shareCode)
  
  if (typeof settings.after === "function") {
    settings.after.call(this); // Explicitly bind `this` to the plugin's element
  }
}

/* Tabs plugin */
$.fn.tabs = function(options){
  var settings = $.extend({
    nav: {
      type: "internal",
      selector: "> .menu"
    },
    navActiveClass: "active",
    tabsSelector: ".tabs-content",
    after: function(){}
  }, options)
    
  var $this = $(this)
  if(settings.nav.type == "internal") {
    var $navItem = $this.find(settings.nav.selector + " li");
  } else if(settings.nav.type == "external") {
    var $navItem = $(settings.nav.selector + " li")
  } else {
    console.error("Nav type must be internal or external")
  }
  
  var firstTab = $navItem.first().find("a").attr("href")
  $navItem.first().addClass(settings.navActiveClass)
  $(firstTab).show().siblings().hide()

  $navItem.each(function(){
    var $navLink = $(this).find("a");
    $navLink.click(function(e){
      if(event.preventDefault){event.preventDefault()} else {event.returnValue = false}
      $(this).parent().addClass(settings.navActiveClass).siblings().removeClass(settings.navActiveClass);
      $(settings.tabsSelector).find($navLink.attr("href")).show().siblings().hide()
      if (typeof settings.after === "function") {
        settings.after.call(this); // Explicitly bind `this` to the plugin's element
      }
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
