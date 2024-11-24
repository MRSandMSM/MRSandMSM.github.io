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
          var $audioURLSelector = '[href="' + audioURL + '"]'

          alert($("a").is($audioURLSelector).length))
          
          $this.toggleClass("playing");
          // $this.parent().siblings().find("a.play").is('[href="' + audioURL + '"]').toggleClass("playing")
          $this.parent().siblings().find("a.play").removeClass("playing");
          $this.closest(".tracklist, .release, .release-type").siblings().find("a.play").removeClass("playing");

          var $audioTrack = $this.closest(".tabs").find("audio")
          $audioTrack.attr("src", audioURL)

          if($this.hasClass("playing")) {$audioTrack.trigger("play")} else {$audioTrack.trigger("pause")}
        });

        $(this).closest(".tabs").find("audio").on("ended", function(){
          $("a.playing").removeClass("playing")
        })
      });
    })
  })
})
