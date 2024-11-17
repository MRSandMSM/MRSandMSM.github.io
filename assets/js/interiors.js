$(document).ready(function(){
  $.fn.txtLoader = function(url, options){
    var settings = $.extend({
      namespace: '',
      loadAs: 'text'
    }, options)

    var loadURL = settings.namespace + url + '.txt'
    var $this = $(this);

    $.ajax({
      url: loadURL,
      dataType: settings.loadAs,
      success: function(data) {
        $this.html(data)
      }
    })
  }
  /* II. Discography page */
  $(".tracklist").each(function(){
    var album = $(this).attr("id")
    $(this).txtLoader(album, {
      namespace: '/assets/text-data/',
      loadAs: 'html'
    })
  })
})
