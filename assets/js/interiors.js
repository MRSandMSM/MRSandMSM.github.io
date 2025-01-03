$(document).ready(function(){
  /* II. Discography page */
  $(".release-types").tabs({
    nav: {
      type: "external",
      selector: "#filterNav .menu"
    },
    navActiveClass: "active",
    tabsSelector: ".types-inner",
    after: function(){
      $("#page").removeClass("secondary-nav-open")
    }
  })
  $(".release").each(function(){
    var $this = $(this);
    var $header = $this.find(".header");
    var $artworkImg = $this.find(".artwork-img");
    
    $artworkImg.addClass("desktop-only").clone().removeClass("desktop-only").addClass("mobile-only").appendTo($header)
    
    $this.find(".tabs").append("<audio></audio>")
  })
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
        var $this = $(this);
        $this.css("color", trackColors[trackN]);
        $this.find(".title").before('<span class="track">' + parseInt(trackN + 1) + '</span>')
        
        var $trackTitle = $this.find(".title");
        var titleArray = $trackTitle.text().toLowerCase().split(" ").join("-");
        var lyricsLink = '<a href="/lyrics/' + titleArray + '" class="lyrics">Lyrics</a>';
        $trackTitle.after(lyricsLink)

        var $trackPlay = $this.find("a.play");
        $trackPlay.click(function(e){
          if(event.preventDefault) {event.preventDefault()} else {event.returnValue = false}

          var $this = $(this);
          var audioURL = $trackPlay.attr("href");
          var $audioURLSelector = 'a.play[href="' + audioURL + '"]'
          
          $this.toggleClass("playing");
          $this.parent().siblings().find("a.play").removeClass("playing");
          $this.closest(".tracklist, .release, .release-type").siblings().find("a.play").removeClass("playing");

          // Given that we can't sync two audios that are the same on more that one tracklist,
          // in spite of ALL our trying and OUR CODE BEING PERFECT AND WE DON'T KNOW WHY
          // THE FUCK IT IS THAT IT CAN'T START WORKING, we have to mask it so you can't see
          // the other tabs while you are listening to that one song you want.
          if($this.closest(".release").has("a.playing").length) {
            $this.closest(".release").find(".tabs").addClass("disable-inactive")
          } else if(!$this.closest(".release").has("a.playing").length) {
            $this.closest(".release").find(".tabs").removeClass("disable-inactive")
          }

          var $audioTrack = $this.closest(".tabs").find("audio")
          $audioTrack.attr("src", audioURL)

          if($this.hasClass("playing")) {$audioTrack.trigger("play")} else {$audioTrack.trigger("pause")}
        });

        $(this).closest(".tabs").find("audio").on("ended", function(){
          $("a.playing").removeClass("playing")
          $(".release .tabs").removeClass("disable-inactive")
        })
      });
    })
  })

  if($("body #pageContainer").hasClass("discography")) {
    var releaseView;

    if(location.hash.indexOf("/") !== -1) {releaseView = 'full'}
    else {releaseView = 'teaser'}

    if(releaseView == 'full') {
      $("#pageContainer").removeClass("has-secondary-nav").find(".secondary-nav").remove()
      
      var identifier = location.hash.split("#/")[1];
      var identifierArray = identifier.split("-");
      var identifierWords = []

      $.each(identifierArray, function(_, word){
        identifierWords.push(word[0].toUpperCase() + word.slice(1));
      })

      var identifierName = identifierWords.join("");
      var identifierID = identifierName[0].toLowerCase() + identifierName.slice(1);
      var $release = $("#" + identifierID)

      var releaseTitle = identifierWords.join(" ") + " | MR S and MS M";
      var releaseURL = "/discography/" + identifier;
      history.replaceState(identifier, releaseTitle, releaseURL)
      $("title").html(releaseTitle)

      $release.addClass("release-active")
      
      $release.siblings().remove().parent().show().siblings().remove()
      $(".more-link").remove();
    } else if(releaseView == 'teaser') {
      $(".release .artwork .description, .release .tabs .menu, .release .header > .menu").remove()
      $("head").append("<style>.tabs .tabs-content ol li a.lyrics {display: none !important}</style>")
    }
  }

  /* V. 404 page */
  $(".not-found").each(function(){
    var $this = $(this);
    var $formControl = $this.find(".form-control");
    var $input = $formControl.find("input");
    
    $this.addClass("loaded").delay(1125).queue(function(){
      $this.find(".text404-inner").removeClass("pointer-disabled")
    })
    
    $this.find('.text404-inner a.toaster[href="#search"]').toaster({
      delay: 375,
      after: function(){
        $(this).closest(".container").fadeOut(375, "linear")
      }
    })
    
    $formControl.find(".clear").click(function(e){
      if(event.preventDefault){event.preventDefault()} else {event.returnValue = false}
      
      var $this = $(this);
      var $input = $this.siblings("input");
      var $label = $this.siblings("label");

      $input.val("")
      $label.removeClass("floating-active").addClass("floating-inactive");
      $this.hide();
    })
    
    $input.each(function(){
      var $this = $(this);
      
      $this.focus(function(){
        $this.closest(".form").addClass("focus");
        $this.siblings("label").removeClass("floating-inactive").addClass("floating-active")
      }).blur(function(){
        $this.closest(".form").removeClass("focus");
        if(!$this.val().length > 0) {
          $this.siblings("label").removeClass("floating-active").addClass("floating-inactive")
        }
      })
    })
    
    $input.on("input", function (){
      var $this = $(this);
      var $label = $this.siblings("label");
      
      if ($this.val().length > 0) {
        $label.addClass("floating-active").removeClass("floating-inactive");
        $this.siblings(".clear").fadeIn(375, "linear");
      } else {$this.siblings(".clear").fadeOut(375, "linear")}
    })
  })
  
  /*// Do the redirects
  if(location.href == "/discography" || location.href == "/discography/") {
    discographyPage = true
  } else {discographyPage = false}
  
  if(location.href.indexOf("/discography/") !== -1 && !discographyPage) {
    var releaseSlug = location.href.split("/discography/")[1]
    var releaseURL = "/discography#/" + releaseSlug;
    location.replace(releaseURL)
  }*/
})
