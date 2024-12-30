$(document).ready(function(){
  /* I. Setting global variables */
  var $window = $(window)
  var $document = $("html")
  var $body = $("body")
  var $container = $("#pageContainer")
  var $header = $("#header")
  var $share = $(".share")
  var $tabs = $(".tabs")
  var $toaster = $("a.toaster")

  /* Run major plugins */
  $toaster.toaster({
    duration: 375,
    easing: "linear"
  })
  $share.share({
    platforms: "facebook x linkedin2 email"
  })
  $tabs.tabs()

  /* Nav togglers */
  $(".mobile-nav-toggler").click(function(e){
    var $this = $(this);
    if(event.preventDefault) {event.preventDefault()} else {event.returnValue = false}

    /* Secondary nav */
    if($this.closest(".secondary-nav").length) {$("#page").toggleClass("secondary-nav-open")}
  })
})
