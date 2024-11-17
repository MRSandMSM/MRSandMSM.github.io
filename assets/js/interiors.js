$(document).ready(function(){
  $.fn.txtLoader = function(url, options){
    var settings = $.extend({
      namespace: '',
      loadAs: 'text'
    }, options)

    var loadURL = settings.namespace + url + '.txt'

    $.ajax({
      url: loadURL,
      dataType: settings.loadAs,
      success: function(data) {
        return $(this).html(data)
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
