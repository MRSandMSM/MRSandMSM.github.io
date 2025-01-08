$(document).ready(function(){
  /* I. Setting global variables */
  var $window = $(window)
  var $document = $("html")
  var $body = $("body")
  var $container = $("#pageContainer")
  var $header = $("#header")
  var $headerNav = $header.find(".navigation")
  var $page = $("#page")
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
      if($(".logo-alt").length === 0 && !$header.hasClass("hero")) {
        var $logoAlt = $('<a>', {
          attr: {
            href: "/"
          },
          class: "logo logo-alt fill replace",
          text: "MR S and MS M"
        })

        $("h1.logo").append($logoAlt)
      }
      
      if($("#navbarBg").length === 0) {
        var $navBgs = $('<div>', {
          class: "nav-bg fill",
          attr: {
            id: "navbarBg"
          }
        });
      
        $.ajax({
          url: '/assets/json/nav_backgrounds.json',
          type: 'GET',
          dataType: 'json',
          success: function(data){
            var $navBgs = $(".nav-bg")

            $.each(data.navigation.items, function(index, item){
              var $navBG = $('<div>', {
                class: 'bg',
                css: {
                  'background-image': 'url(' + item.image + ')'
                }
              })

              var navBGAlt = '<span class="visually-hidden">' + item.alt + '</span>'
              $navBG.html(navBGAlt)

              $navBgs.append($navBG)
            })

            $(".nav-item a").hover(function(){
              var itemIndex = $(this).parent().index()
              var $navBG = $navBgs.find(".bg")
              
              $navBG.eq(itemIndex).addClass("bg-active").siblings(".bg").removeClass("bg-active")
            })

            if($(".navigation .is-active").length) {
              $(".navigation .is-active a").trigger("mouseenter")
            } else {
              $(".navigation .menu li").first().find("a").trigger("mouseenter")
            }
          },
          error: function() {console.error("Data could not be fetched from nav_backgrounds.json. So not fetch...")}
        })
      
        $headerNav.prepend($navBgs)
      }
    } else {
      $header.not(".hero").find(".logo-alt").remove()
      $headerNav.find(".nav-bg").remove()
    }
  })

  /* Nav togglers */
  $(".mobile-nav-toggler").click(function(e){
    if(event.preventDefault) {event.preventDefault()} else {event.returnValue = false}
    var $this = $(this);

    /* Main nav */
    if($this.siblings(".navigation").length || $this.hasClass("main-nav")) {$container.toggleClass("mobile-nav-open")}

    /* Secondary nav */
    if($this.closest(".secondary-nav").length) {$page.toggleClass("secondary-nav-open")}
  })
})
