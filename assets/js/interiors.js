$(document).ready(function(){
  $.fn.txtLoader = function(url, options){
    var settings = $.extend({
      namespace: '',
      loadAs: 'html'
    })

    var loadURL = settings.namespace + url + '.txt'

    $.ajax({
      url: loadURL,
      dataType: settings.loadAs,
      success: function(data) {
        this.html(data)
        alert('Was successful')
      }
    })
  }
  /* II. Discography page */
  $(".tracklist").each(function(){
    var album = $(this).attr("id")
    $(this).txtLoader(album, {
      namespace: '/assets/text-data/'
    })
  })
})
