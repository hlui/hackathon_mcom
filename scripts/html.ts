# HTML Transformations go here

$("/html") {
  rewrite_links()
  absolutize_srcs()

  # Needed to begin mobilizing
  remove_all_styles()
  remove_html_comments()
  insert_mobile_meta_tags()

  # Late load all the images on the site
  # lateload()
  

  add_assets()
  
  $("./head") {
    insert_top("link", rel: "stylesheet", type: "text/css", href: "http://code.jquery.com/mobile/1.2.0/jquery.mobile.structure-1.2.0.css")
    insert_top("script", src: "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.js")
    insert_top("script", src: "http://code.jquery.com/jquery-1.8.2.js")
  }

  @import sections/header.ts
  @import sections/footer.ts

  @import mappings.ts
}

