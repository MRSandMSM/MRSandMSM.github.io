$(document).ready(function(){
  /* II. Discography page */
  $(".release").each(function(){
      $(this).find(".tabs-content").append("<audio controls></audio>")
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
          $this.toggleClass("playing");
          $this.add($this.parent(), $this.closest(".release, .release-type")).siblings().find("a.play").removeClass("playing");

          $audioTrack = $this.closest(".tabs-content").find("audio")
          $audioTrack.attr("src", $trackPlay.attr("href"))

          if($this.hasClass("playing")) {$audioTrack.trigger("play")} else {$audioTrack.trigger("pause")}
        });
      });
    })
  })
})
