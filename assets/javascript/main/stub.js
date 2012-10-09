$(document).bind('pageinit', function() {

  $("#callAjax").click(function() {
    var theName = "test";
 
    if(theName.length > 0)
    {
      $.ajax({
        type: "GET",
        url: "http://mlocal.www1.macys.com/shop/product/style-co.-top-long-sleeve-pleated-rhinestone-button-shirt?ID=748720&CategoryID=255",
        data: ({name: theName}),
        cache: false,
        dataType: "text",
        success: onSuccess
      });
    }
  });
 
  $("#resultLog").ajaxError(function(event, request, settings, exception) {
    $("#resultLog").html("Error Calling: " + settings.url + "<br />HTTP Code: " + request.status);
  });
 
  function onSuccess(data)
  {
    $("#resultLog").html("Result: " + data);
  }
 
});