$(document).ready(function(){
  /* II. Discography page */
  $(".release").each(function(){
      $(this).find(".tabs").append("<audio></audio>")
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
    if(releaseView == 'full') {
      var identifier = location.hash.split("#")[1];
      
    } else {
      // Do nothing yet.
    }

    if(location.hash.indexOf("-") !== -1) {
      releaseView = 'full';
    }
    console.log(releaseView)
  }
})
