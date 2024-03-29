$("./body") {
  add_class("mw_category")
  
  insert("div", id: "mw_content", fake-data-role: "page") {
    
    
    insert("div", fake-data-role: "header") 
    
    insert("div", fake-data-role: "content", class: "mw_data_role_content") {
      
      move_here("/html/body//div[@class='productThumbnail']") {
        remove(".//*[contains(@class, 'hidden')]")
        remove(".//*[contains(@class, 'morecolors')]")
        $(".//a") {
          $href = fetch("./@href")
          #attributes(data-ajax: "false")
          #add_class("callAjax")
          attribute("href") {
            name("data-href")
          }
          name("span")
        }
        name("a")
        attributes(data-ajax: "false", data-href: $href)
        add_class("callAjax")
        wrap("div", data-ur-carousel-component: "item")
      }
      
      $("./div[@data-ur-carousel-component='item' and position()=1]/a[contains(@class, 'productThumbnail')]") {
        attributes(data-jqm-default: "true")
      }
      
      # make the thumbnails into a carousel
      insert("div", data-ur-set: "carousel", data-ur-carousel-component: "view_container", data-ur-infinite: "disabled") {
        insert("div", data-ur-carousel-component: "scroll_container") {
          move_here("./ancestor::div[contains(@class, 'mw_data_role_content')]//*[@data-ur-carousel-component='item']")
        }
      }
    }
    
    insert("div", fake-data-role: "footer") 
    
    insert("div", class: "mw_product_ajax") {
      # PDP ajaxed in
      insert("div", id: "resultLog")
    }
  }
  remove("./*[not(@id='mw_content')]")
}