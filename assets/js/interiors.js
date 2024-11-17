$(document).ready(function(){
  /* II. Discography page */
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
        $(this).css("color", trackColors[trackN]);
        $(this).find(".title").before('<span class="track">' + parseInt(trackN + 1) + '</span>')
      });
    })
  })
})
