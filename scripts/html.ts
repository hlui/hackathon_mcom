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
  jqm_initialize()

  @import sections/header.ts
  @import sections/footer.ts

  @import mappings.ts
}

