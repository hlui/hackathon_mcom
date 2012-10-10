$(document).bind('pageinit', function() {

  $(".callAjax").click(function(e) {
    // alert('clicked');
    var url = $(e.target).attr('data-href');
    if (url==undefined) {
      url = $(e.target).closest("a").attr('data-href');
    }
    //alert(url);
    console.log("--->");
    console.log($(e.target));
    console.log("***END***");
    $.ajax({
      type: "GET",
      url: url,
      cache: false,
      dataType: "html",
      success: onSuccess
    });
  });
  
  $("[data-jqm-default='true']").click();
 
  $("#resultLog").ajaxError(function(event, request, settings, exception) {
    $("#resultLog").html("Error Calling: " + settings.url + "<br />HTTP Code: " + request.status);
  });
 
  function onSuccess(data) {
    //console.log(data);
    $("#resultLog").html(data);
  }
 
});

$( document ).bind('mobileinit', function(){
  $.mobile.loader.prototype.options.text = "loading";
  $.mobile.loader.prototype.options.textVisible = false;
  $.mobile.loader.prototype.options.theme = "a";
  $.mobile.loader.prototype.options.html = "";
});