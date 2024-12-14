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
  $share.share()
  $tabs.tabs()
})
