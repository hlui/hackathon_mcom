# Variables for creating "More Information" Link
$more_information_link = ""
$product_id = fetch("./@id")
$product_id {
  replace(/[a-zA-Z]*/, "")
}

# Handle collapsible items on master pages
attribute("data-ur-set", "toggler")
$("self::*[not(div[@class='productImage'])]") {
  insert_top("div", class: "productImage")
}
$("div[@class='productImage']") {
  attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
  insert_top("span", class: "mvItemAccordianBtn") {
    insert("span", "+", class: "mvPlus")
    insert("span", "&minus;", class: "mvMinus")
  }
  # EXPLICIT: a[@class='memberUrlUpdate']
  $("a") {
    # prevent clicking, href is added by their js
    attributes(class: "mw_memberUrlUpdate", href: "")
  }
  match($path) {
    with(/shop\/registry/) {
      move_here("./../div[contains(@class,'memberUPCDetails')]/div[@class='memberShortDesc']") {
        # EXPLICIT: a[@class='memberUrlUpdate']
        $("./h2") {
          wrap("span", class: "mw_memberUrlUpdate2")
          $more_information_link = fetch("./text()")
          $more_information_link {
            replace(/\s/,"-")
            replace(/,/,"")
            prepend("/shop/registry/wedding/product/") # need to make sure this is always the case; if not, fetch from path
            append("?ID=")
            append($product_id)
          }
          log($more_information_link)
        }
        $("a") {
          var("pdp_url", fetch("@href"))
          name("span")
          attributes(class: "mw_memberUrlUpdate2", href: "")
        }
      }
    } else() { 
       move_here("./../div[contains(@class,'memberUPCDetails')]/div[@class='memberShortDesc']") {
        # EXPLICIT: a[@class='memberUrlUpdate']
        $("./h2") {
          wrap("span", class: "mw_memberUrlUpdate2")
          $more_information_link = fetch("./text()")
          $more_information_link {
            replace(/\s/,"-")
            replace(/,/,"")
            prepend("/shop/product/") # need to make sure this is always the case; if not, fetch from path
            append("?ID=")
            append($product_id)
          }
          log($more_information_link)
        }
        $("a") {
          var("pdp_url", fetch("@href"))
          name("span")
          attributes(class: "mw_memberUrlUpdate2", href: "")
        }
      }
    }
  }
  move_here("../div[@class='productPriceSection']")
  wrap_together("div[@class='memberShortDesc' or @class='productPriceSection']", "div", class: "mw_acc_item_wrapper")
}
$("div[starts-with(@class, 'memberUPCDetails')]") {
  insert_top("a", class:"mw_moreinfo", href:$more_information_link) {
    text("More Information")
  }
  log("--> Importing pages/_product-selections.ts")
  @import _product-selections.ts
  $("div[starts-with(@class, 'pdpShipDays')]") {
    move_here("../../div[@class='memberProdButtons']/div[@id='memberProdQty']", "before")
  }

  $("./div[@id='memberProdQty']") {
    $("./select") {
      attribute("style", "z-index: 100029;")
    }
  }
}
$("./div[contains(@class,'memberProdButtons')]") {
  # EXPLICIT: div[@class='memberOrderByPhone']/img[@id='orderByPhoneImage']
  $("div[@class='memberOrderByPhone']/img") {
    attributes(id: "", src: asset("images/buttons/clickToCall.png"))
    wrap("a", href: "tel:800-289-6229")
  }
  $("img[@class='addToBagButton']") {
    #attribute("src", asset("images/buttons/addToBag.png"))
    attribute("src", "")
    name("span")
    add_class("opt-sprite-addToBag")
  }
  $("img[@class='addtoregistryClass']") {
    #attribute("src", asset("images/buttons/addToRegistry.png"))
    attribute("src", "")
    name("span")
    add_class("opt-sprite-addToRegistry")
  }
  $("img[starts-with(@id, 'finditinstore')]") {
    #attribute("src", asset("images/buttons/findInStore.png"))
    attribute("src", "")
    name("span")
    add_class("opt-sprite-findInStore")
  }
  # make buttons look clickable
  $("img") {
    attribute("onclick", "void(0)")
  }
  wrap_together("span", "div", class: "mw_bag_buttons")
  $("div[@class='mw_bag_buttons']") {
    move_here("../div[@class='memberOrderByPhone']", "top")
    move_here("../div[@class='onlineExclusiveText']")
    move_here("../../div[@class='productImage']/div[@class='mw_acc_item_wrapper']/div[@class='productPriceSection']/div[@class='memberPriceSaleEndText']")
  }
}
wrap_together("div[starts-with(@class, 'memberUPCDetails') or contains(@class,'memberProdButtons')]", "div", data-ur-toggler-component: "content", data-ur-state: "disabled") {
  match($pdp_url, /.+/) {
    insert_top("a", "More Information", class: "mw_more_info", href: $pdp_url)
  }
}
