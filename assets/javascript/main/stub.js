$(document).bind('pageinit', function() {

  $(".callAjax").click(function(e) {
    // alert('clicked');
    var url = $(e.target).attr('data-href');
    $.ajax({
      type: "GET",
      url: url,
      cache: false,
      dataType: "text",
      success: onSuccess
    });
  });
  
  $("[data-jqm-default='true']").click();
 
  $("#resultLog").ajaxError(function(event, request, settings, exception) {
    $("#resultLog").html("Error Calling: " + settings.url + "<br />HTTP Code: " + request.status);
  });
 
  function onSuccess(data) {
    $("#resultLog").html(data);
  }
 
});