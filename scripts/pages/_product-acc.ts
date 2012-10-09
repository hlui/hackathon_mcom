# Handle "sub-group" accordions on master pages

$("div[@id='bottomArea']") {
  $("div[@id='pdpTabs']") {
    # remove 'Q & A' section
    $("div/div[@id='pdpqa']") {
      remove()
    }
    $("ul") {
      # remove 'Q & A' tab
      $("li[starts-with(@class, 'tabProductQA')]") {
        remove()
      }
      # EXPLICIT: li[contains(@class, 'tabsHeader')]
      $("li") {
        attribute("data-ur-set", "toggler")
        $("a") {
          attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
          insert("span", "+", class: "mvPlus")
          insert("span", "&minus;", class: "mvMinus")
        }
        $("a[@href='#pdpreviews']") {
          attribute("href", "#pdpreviewsTabContent")
          attribute("id", "mw_bv_trigger")
        }
        
        ####################################################################################################
        # Ticket#1061: Collect all the "giftOffers" divs together in one div 
        #               (for some reason these end up split up on different levels)
        $("/html/body//div[contains(@class, 'giftOffers') or contains(@class, 'dashedlines')]") {
          move_to("/html/body//div[@id='specialOffers']")
        }
        
        ####################################################################################################
        move_here("./ancestor::div[@id='pdpTabs']//div[contains(@class,'yui-content')]/div[1]") {
          attributes(data-ur-toggler-component: "content", data-ur-state: "disabled")
        }
        # EXPLICIT: .../ul[@id='bullets']/li
        $("div[@id='memberProductDetails']/div[@id='prdDesc']/ul/li") {
          # remove video links
          $("self::*[a[contains(@href, 'podcast')]]") {
            remove()
          }
          # luggage finder link
          $("a[starts-with(@href, '/m/store/luggage')]") {
            attribute("href") {
              value() {
                replace(/%20$/, "")
                append("?mwDesktopPage=true&perfectProxy=true")
              }
            }
          }
        }
        # master pages
        $("div[@id='collectionItems']") {
          attribute("data-ur-state", "enabled")

          # Removes image overlay occuring on 11H pdp pages
          $("/html/body") {
            insert_bottom("script", type: "text/javascript", src: asset('javascript/11H_remove_pdp_imgoverlay.js'))
          }

          #This is for the pages with group latches (such as beddings)
          #http://mlocal.qacreative1macys.fds.com/shop/product/charter-club-collection-damask-solid-500-thread-count-extra-deep-sheet-sets?ID=343375&CategoryID=9915#fn=sp%3D1%26spc%3D112%26ruleId%3D52%26slotId%3D3
          $("./div[@id='pdpAttributes']/div[@id='pdpAttributes']") {
            $(".//div[@id='memberProductList']") {
              move_to("./..", "top")
            }
            $(".//div[@id='ourSuggestions']") {
              move_to("./..", "top")
            }
          }
          $("./div[@id='pdpAttributes']") {
            $("div[@class='memberProducts'] | div[@id='pdpAttributes'][not(div[@id='memberGroupLatches'])]/div | ./div[@id='memberProductList']/div[contains(@class,'memberProducts')]") {
              log("--> Importing script _product-item-acc.ts")
              @import _product-item-acc.ts
            }


            # for master pages with groups
            $("div[@id='pdpAttributes'][div[@id='memberGroupLatches']]") {
              # EXPLICIT: div[@id='masterGroupLatches']/ul[@class='latches']/li[starts-with(@class, 'horizontal latch')]
              $("div[@id='memberGroupLatches']") {
                $("div[@class='latchName']") {
                  remove()
                }
                # EXPLICIT: ul[@class='latches']
                $("ul") {
                  # EXPLICIT: li[contains(@class, 'latch')]
                  $("li") {
                    attribute("data-ur-set", "toggler")
                    var("member_id", fetch("@id"))
                    $("div[1]") {
                      add_class("mvDarkGrayBar")
                      attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
                      insert("span", "+", class: "mvPlus")
                      insert("span", "&minus;", class: "mvMinus")
                    }
                    insert("div", data-ur-toggler-component: "content", data-ur-state: "disabled")
                  }
                  $("li[1]/div[@data-ur-toggler-component='content']") {
                    move_here("//div[starts-with(@class, 'memberProducts')]") {
                      log("--> Importing pages/_product-acc.ts")
                      @import _product-item-acc.ts
                    }
                    inner_wrap("div", id: "mw_master_wrapper")
                  }
                }
              }
            }
          }
        }
      }
      # move product details section down into accordion
      $("li[starts-with(@class, 'tabCollectionItems')]") {
        move_here("//div[@id='productDetails']", "after") {
          name("li")
          attribute("data-ur-set", "toggler")
          add_class("tabsHeader")
          # EXPLICIT: ul[@id='bullets']/li/a[contains(@href, 'podcast')]
          $("ul/li[a[contains(@href, 'podcast')]]") {
            # remove video links
            remove()
          }
          inner_wrap("div", data-ur-toggler-component: "content", data-ur-state: "disabled")
          move_here("div/div[@id='productDetailsHeader']", "top") {
            name("a")
            attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
            insert("span", "+", class: "mvPlus")
            insert("span", "&minus;", class: "mvMinus")
          }
        }
      }
    }
  }
  # EXPLICIT: .../div[@class='registryContinueBtn']
  $("div[@id='errorMsgPanel']/div[contains(@class, 'registryErrorMsgPanelFt')]/div") {
    add_class("mvRedBtn")
  }
  
  # The following tickets should not apply to pdp pages with "numerical selections"
  $ignore = "false"
  $("//select[@id='selSettings']") {
    $ignore = "true"
  }
  match($ignore) {
    with(/false/) {
      # PDP Collection Items - fix for ticket 460
      # Fixes pages with single pdpAttributes and hidden suggestions
      # URL: http://mlocal.qacreative1macys.fds.com/shop/product/lauren-by-ralph-lauren-bath-towels-greenwich-collection?ID=475027&CategoryID=16853#collectionItems
      $(".//div[@id='ourSuggestions'][contains(@class,'hidden')]") {
        $("./..//div[@class='mw_sub_acc']/h1") {
          attribute("id", "newItemList")
          wrap_text_children("span")
          $("./span[contains(text(),'Our Suggestions')]") {
            text("Choose Your Items")
          }
        }
      }
      # Fixes pages with double pdpAttributes, different mappings (url paths), and hidden suggestions
      # URL: http://mlocal.qacreative1macys.fds.com/shop/product/free-container-with-purchase-of-2-or-more-items-from-the-coach-poppy-fragrance-collection?ID=622867&PseudoCat=se-xx-xx-xx.esn_results#collectionItems
      $(".//div[@id='pdpAttributes']/div[@id='pdpAttributes'][not(./div[@id='ourSuggestions'])]//h1[@id='ourSuggestionsHeader'][contains(@class,'hidden')]") {
        $("./..") {
          insert_bottom("div", data-ur-toggler-component:"content", data-ur-state:"disabled") {
            move_here("./../div[contains(@class,'memberProducts')]", "bottom") {
              attribute("data-ur-set", "toggler")
              attribute("data-ur-state", "enabled")
              $("./div[@class='productImage']") {
                attribute("data-ur-toggler-component", "button")
                attribute("data-ur-state", "disabled")
                insert_top("span", class:"mvItemAccordianBtn") {
                  insert_bottom("span") {
                    text("+")
                    attribute("class", "mvPlus")
                  }
                  insert_bottom("span", class: "mvMinus", "&minus;")
                }
              }
              log("-=-=-=-=-=-=-=-=-=-") 
              insert_bottom("div", data-ur-toggler-component:"content", data-ur-state:"disabled") {
                move_here("./../div[@class='productPriceSection'] | ./../div[@class='memberProdButtons']")
                $("//div[contains(@class,'memberProdButtons')]") {
                  log("in1")
                  attribute("data-debug", "in1")
                  insert_bottom("div", class:"mw_bag_buttons", data-debug: "in2") {
                    log("in2")
                    move_here("./../img", "bottom")
                  }
                  $("./div[@class='mw_bag_buttons']/img[@class='addToBagButton']") {
                    #attribute("src", asset('images/buttons/addToBag.png'))
                    log("in3")
                    attribute("src", "")
                    attribute("data-debug", "in3")
                    name("div")
                    add_class("opt-sprite-addToBag")
                  }
                }
                move_here("../div[@class='memberUPCDetails']") {
                  log("--> Importing pages/_product-selections.ts")
                  @import _product-selections.ts
                }
                move_here("../div[contains(@class, 'memberProdButtons')]")
              }
            }
          }
          $(".//div[@class='mw_bag_buttons' and not(node())]") {
            add_class("mw_empty")
            remove()
          }

        }
        attribute("id", "newProductHeader")
        move_to("./../div[@class='productImage']", "top") {
          attribute("id", "newItemList")
        }
        # Remove Content Header and Display Items
        # http://mlocal.qacreative1macys.fds.com/shop/product/free-container-with-purchase-of-2-or-more-items-from-the-coach-poppy-fragrance-collection?ID=622867&PseudoCat=se-xx-xx-xx.esn_results
        $("./../../div[@data-ur-toggler-component='content']/div[contains(@class,'memberProducts')]") {
          move_to("//div[@id='memberProductList']", "before")
        }
        $("//div[@id='memberProductList']") {
          remove()
        }
      }
    }
  }
  # Ticket 480 - Remove Quick View on Master PDP
  $(".//img[@id='quickViewLauncher']") {
    remove()
  }
  # Removing accordian from suggestions
  $("//*[@id='ourSuggestionsHeader']") {
    $("./span") {
      remove()
    }
    move_to("./..", "before")
    attribute("data-ur-toggler-component") {
      remove()
    }
    attribute("data-ur-state") {
      remove()
    }
  }
  # Removing accordian from suggestions (same as above except a different page)
  $(".//span[contains(text(),'Suggestions')]/..") {
    attribute("data-ur-toggler-component") {
      remove()
    }
    attribute("data-ur-state") {
      remove()
    }
    attribute("class") {
      value() {
        replace("mvDarkGrayBar", "")
      }
    }
  }
  # for master pages with subheaders
  # EXPLICIT: h1[@class='productHeader']
  $(".//div[@id='memberProductList']/h1[contains(@class,'productHeader')]") {
    attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
    add_class("mvDarkGrayBar")
    insert("span", "+", class: "mvPlus")
    insert("span", "&minus;", class: "mvMinus")
    wrap("div", class: "mw_sub_acc", data-ur-set: "toggler") {
      insert("div", data-ur-toggler-component: "content", data-ur-state: "disabled")
    }
  }
  $("//div[contains(@class,'memberProducts')]") {
    move_to("preceding-sibling::div[@class='mw_sub_acc'][1]/div")
  }
}

# Checks weather the info links exist on master PDP, if not, create them
# Edit: moving color swatches and adding color swatch buttons that match these pages
$moreinfo_exists = "false"
$(".//a[contains(@class,'mw_moreinfo')]") {
  $moreinfo_exists = "true"
}

match($moreinfo_exists) {
  with(/false/) {
    $more_information_link = ""
    $product_id = ""
    
    $(".//div[@class='memberUPCDetails']") {
      # Get Product ID
      $("./img[contains(@class,'memberThumbnailImg')]") {
        $product_id = fetch("./@id")
        $product_id {
          replace(/[a-zA-Z_]*/, "")
        }
      }
      
      match($path) {
        with(/shop\/registry/) {
          # Build Link
          $("./div[@class='memberShortDesc']/h2") {
            $more_information_link = fetch("./text()")
            $more_information_link {
              replace(/\s/,"-")
              replace(/,/,"")
              prepend("/shop/registry/wedding/product/") # need to make sure this is always the case; if not, fetch from path
              append("?ID=")
              append($product_id)
            }
          }
        } else () {
          # Build Link
          $("./div[@class='memberShortDesc']/h2") {
            $more_information_link = fetch("./text()")
            $more_information_link {
              replace(/\s/,"-")
              replace(/,/,"")
              prepend("/shop/product/") # need to make sure this is always the case; if not, fetch from path
              append("?ID=")
              append($product_id)
            }
          }
        }
      }

      # Move Title
      $("./div[@class='memberShortDesc']") {
        move_to("./../../div[@class='productImage']", "bottom")
      }
      # Place Link
      $("./..//div[@class='productPriceSection']") {
      
        insert_before("a", class:"mw_moreinfo", href:$more_information_link) {
          text("More Information")
         }

        # Move Price
        move_to("./../../div[@class='productImage']", "bottom")
      }
      # Move Color Swatches
      $("./div[@class='colorSelection']") {
        move_to("./../../div[@data-ur-toggler-component='content']", "top")
      }
      # Remove "empty" images
      $("./../div[@class='productImage']/div[@class='memberUrlUpdate']/img[contains(@src,'select_color')]") {
        remove()
      }
      # Replace bag buttons with mobile versions
      $("./..//div[@class='mw_bag_buttons']") {
        $("./img[contains(@src,'addtoregistry.png')]") {
          attribute("src", asset('images/buttons/addToRegistry.png'))
        }
        $("./img[contains(@src,'findinstore.png')]") {
          attribute("src", asset('images/buttons/findInStore.png'))
        }
      }
      # Move 'pdpShipDays' under quantity
      $("./../div[@class='memberUPCDetails']/div[contains(@class,'pdpShipDays')]") {
         move_to("./../..//div[@id='memberProdQty']", "after")
      }
      $("./../div[@data-ur-toggler-component='content']") {
        log("--> Importing script: /scripts/pages/_product-selections.ts")
        @import _product-selections.ts
      }
    }
  }
}
