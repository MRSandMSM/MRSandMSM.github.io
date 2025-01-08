$(document).ready(function(){
  /* I. Setting global variables */
  var $window = $(window)
  var $document = $("html")
  var $body = $("body")
  var $container = $("#pageContainer")
  var $header = $("#header")
  var $headerNav = $header.find(".navigation")
  var $share = $(".share")
  var $tabs = $(".tabs")
  var $toaster = $("a.toaster").not('a.toaster[href="#search"]')

  /* Run major plugins */
  $toaster.toaster({
    duration: 375,
    easing: "linear"
  })
  $share.share({
    platforms: "facebook x linkedin2 email"
  })
  $tabs.tabs()

  /* Generate backgrounds for each nav item if viewport is narrower or equal to 767px) */
  $window.on("load resize", function(){
    var $winWidth = $(this).innerWidth() + $.scrollbarWidth()

    if($winWidth <= 767) {
      var navBg = '<div class="nav-bg fill" id="navbarBg"></div>';
      $headerNav.prepend(navBg)
    } else {
      $headerNav.find(".nav-bg").remove()
    }
  })

  /* Nav togglers */
  $(".mobile-nav-toggler").click(function(e){
    var $this = $(this);
    if(event.preventDefault) {event.preventDefault()} else {event.returnValue = false}

    /* Secondary nav */
    if($this.closest(".secondary-nav").length) {$("#page").toggleClass("secondary-nav-open")}
  })
})
