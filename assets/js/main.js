$(document).ready(function(){
  /* I. Setting global variables */
  var $window = $(window)
  var $document = $("html")
  var $body = $("body")
  var $container = $("#pageContainer")
  var $header = $("#header")
  var $tabs = $(".tabs")
  var $toaster = $("a.toaster")

  /* Trigger major plugins */
  $tabs.tabs()
  $toaster.toaster()
})
