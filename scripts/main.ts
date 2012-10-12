# The main file executed by Tritium. The start of all other files.

match($x_hjax, /.+/) {
  $hjax = "true"    
  hjax_html("UTF-8") {
    $content_type = "hjax"
    match($path) {
      with(/\/shop\/product/) {
        log("--> Importing pages/product.ts in main.ts")
        @import pages/product.ts
      }
    }
  }
}

match($content_type) {
  with(/html/) {
    replace(/fb:/, "fbn_") # Rewrite the xmlns facebook nodes before the html parser clobbers them
    
    # Force UTF-8 encoding. If you'd like to auto-detect the encoding,
    # simply remove the "UTF-8" argument.  e.g. html(){ ... }
    html("UTF-8") {
            @import device_detection.ts  
      
      @import html.ts
    }

    replace(/fbn_/, "fb:") # Rewrite the xmlns facebook nodes to restore them
  }
  # with(/javascript/) {
  #   @import ajax.ts
  # }
  with(/hjax/) {
  
  }
  else() {
    log(concat("Passing through ", $content_type, " unmodified"))
  }
}
