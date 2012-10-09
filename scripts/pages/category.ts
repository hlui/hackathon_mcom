$("./body") {
  add_class("mw_category")
  
  insert("div", id: "mw_content", data-role: "page") {
    insert("div", data-role: "header") 
    
    insert("div", data-role: "content") {
      move_here("/html/body//div[@class='productThumbnail']") {
        remove(".//*[contains(@class, 'hidden')]")
        remove(".//*[contains(@class, 'morecolors')]")
        insert_after("div", class: "mw_product_ajax") {
          # productThumbnailLink
          insert("div", "Give me the details", id: "callAjax")
          insert("div", "PDP: ", id: "resultLog")
        }
        $(".//a") {
          attributes(data-ajax: "false")
        }
      }
    }
    
    insert("div", data-role: "footer") 
    
  }
  remove("./*[not(@id='mw_content')]")
}