insert_after("div", id: "mw_content_product", fake-data-role: "page", class: "mw_product") {
    
  #insert("div", data-role: "header") 
    
  #insert("div", fake-data-role: "content") {
    move_here("/html/body//noscript/img") {
      wrap("div", class: "mw_img_wrapper")
    }
    insert("div", class: "mw_product_details") {
      move_here("/html/body//div[@id='productDescription']")
      move_here("/html/body//div[@id='memberProductDetails']")
      $(".//*[contains(@class, 'productID')]") {
        log("@@@@@" + fetch("./text()"))
        text() {
          replace(/^\s/, "")
        }
      }
    }
    remove(".//*[contains(@class, 'hidden')]")
    #}
    
  #insert("div", data-role: "footer") 
    
}
remove("/*[not(@id='mw_content_product')]")
#remove("./*[not(@id='mw_content_product')]")
# $("./body") {
#   add_class("mw_product")
#   
#   remove("/html/head")
#   
#   insert("div", id: "mw_content_product", data-role: "page") {
#     
#     insert("div", data-role: "header") 
#     
#     insert("div", data-role: "content") {
#       move_here("/html/body//div[@id='productDescription']")
#       move_here("/html/body//noscript/img")
#       move_here("/html/body//div[@id='memberProductDetails']")
#       remove(".//*[contains(@class, 'hidden')]")
#     }
#     
#     insert("div", data-role: "footer") 
#     
#   }
#   log("@@@@@@@@" + fetch("."))
#   remove("./*[not(@id='mw_content_product')]")
# }


# log("Importing script: /scripts/pages/product-new.ts")
# 
# 
#   $("html") {
#     $(".//div[@id='recentlyViewedContainer']") {
#       remove()
#     }
#   
#     $(".//div[@id='memberProdQty']/select") {
#       attribute("style","visibility:visible; position: relative; z-index: 100021;")
#     } 
#     $("//meta[@name='viewport']") {
#       attribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes;")
#     }
#     ###################### remove scripts ######################################
#     $(".//script[contains(@src, 'estara')]") {
#       log("--> Removing estara scripts")
#       remove()
#     }
#     $(".//script[contains(@src, 'mapquest')]") {
#       remove()
#     }
#     $(".//script[contains(@src, 'monetate')]") {
#       remove()
#     }
#     $(".//script[contains(text(), 'monetate')]") {
#       remove()
#     }
#     $(".//script[contains(@src, 'global.tiles.base_script')]") {
#       remove()
#     }
#     $(".//script[contains(@src, 'catalog.pdp')]") {
#       remove()
#     }
#     $(".//script[contains(text(), 'zoomViewer')]") {
#       remove()
#     }
#     $(".//script[contains(text(), 'MACYS.coremetrics.intelligentOffer')]") {
#       remove()
#     }
#     $(".//script[contains(text(), 'MACYS.pdp.printLayout')]") {
#       remove()
#     }
#     $(".//script[contains(@src, 'bazaarvoice')]") {
#       $bv_src = fetch("./@src")
#       attribute("src", "")
#       attribute("data-src", $bv_src)
#       attribute("id", "mw_bv_script")
#     }
#     $(".//script[contains(text(), 'BazaarVoiceToken')]") {
#       remove()
#     }
#     ################### end remove scripts ######################################
#     
#     ################## inject refactored js ####################################
#     $(".//div[contains(concat(' ', @class, ' '), ' moovweb_footer ')]") {
#       #insert_after("script", src: "http://d1topzp4nao5hp.cloudfront.net/macys/11.6.581/javascript/pdp_reduced.js") {
#       log("--> Inserting pdp reduced scripts")
#       insert_after("script", src: asset("javascript/pdp_reduced.js")) {
#         insert_after("script", "<script type='text/javascript'>MACYS.pdp.zoomViewer=null;</script>")
#       }
#     }
#     
#     ####################### move scripts to bottom of page ######################
#     $(".//script") {
#       move_to("/html/body", "bottom")
#     }
#     
#     $(".//script[not(@src)]") {
#       move_to("/html/body", "bottom")
#     }
#     ################## end move scripts to bottom of page ######################
#     
#     
#     
#     $("head") {
#       insert("meta", id: "mw_link_rewriter_config", matcher: $rewrite_link_matcher, replacement: $rewrite_link_replacement)
#       # insert("script", type: "text/javascript", src: asset('javascript/androidfix.js'))
# 
#       #$script_body = "var cjsscript = document.createElement('script');var cjssib = document.getElementsByTagName('head')[0];cjssib.appendChild(cjsscript);"
#       #$script_body_cont = concat($script_body, "cjsscript.src='", asset('javascript/control.js'), "'")
#       #insert("script", $script_body_cont);
#       #insert("script", src: asset('javascript/pdp-reduced/test.js'))
#     }
#     $("body") {
#       attribute("id", "mw_product_new")
#       # changing this input is easier than rewriting many js functions to use mobile site
#       $("input[@id='MACYS_baseHostName']") {
#         attribute("value") {
#           value() {
#             rewrite("link")
#           }
#         }
#       }
#       # extract js variable
#       $("script[not(@src or @language) and contains(text(), 'clickableSwatch')][1]") {
#         # if clickable_swatch is true, then there are actual product images corresponding to the swatches
#         var("clickable_swatch", fetch("text()")) {
#           replace(/.*MACYS\.pdp\.imageZoomer\.clickableSwatch = "/m, "")
#           replace(/".*/m, "")
#         }
#       }
#       $("div[@id='doc3']/div[@id='bd']") {
#         
#         # Remove PDP webpage "Back button" for apps
#         match($cookie) {
#           with (/ishop_app/) {
#             $(".//div[@id='pdpBreadcrumb']") {
#               remove()
#             }
#           }
#         }
#         
#         # EXPLICIT: div[@id='pdpRoot']/div[@class='pdpMain']
#          $("div[@id='pdpRoot']/div[@class='pdpMain']") {
#           $("//div[@id='pdpBreadcrumb']") {
#             attribute("onclick", "history.go(-1);")
#             text("back")
#             inner_wrap("div")
#             insert_top("span", class: "opt-sprite-arrow_left")
#           }
#           # occasional banner
#           $("//div[@id='pdpEasyReturns']") {
#             remove()
#           }
#           $("//div[@id='pdpDetails']") {
#             # when the product is 'currently unavailable'
#             $("div[@class='productImageSection']/img") {
#               attribute("src") {
#                 value() {
#                   replace(/\?.*/, "")
#                   append("?wid=290&qlt=90,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg&bgc=255,255,255")
#                 }
#               }
#             }
#             #making the internal image tag of the brandlogo anchor into a background image in order to be able to chop off its sides
#             #the actual logo always apepars on the left and shrinking it down by scalling the image would render some unreadable
#             $("./div[@id='brandLogo']") {
#               #sometimes its just an image hanging out by itself, in that case wrap it to make it consistent
#               $("./img") {
#                 wrap("a")
#               }
#               $("./a") {
#                 $("./img") {
#                   var("pdpimgsrcforbg",fetch("@src"))
#                   remove()
#                 }
#                 log($pdpimgsrcforbg)
#                 attribute("style") {
#                   value() {
#                     set(concat("background-image: url(",$pdpimgsrcforbg,")"))
#                   }
#                 }
#               }
#             }
#             $("div[@id='imageZoomer']") {
#               attributes(data-ur-set: "carousel", data-ur-id: "pdp")
#               insert_top("a", class: "mvGalleryNextBtn", data-ur-carousel-component: "button", data-ur-carousel-button-type: "next", data-ur-state: "enabled") {
#                 insert_bottom("span", class: "opt-sprite-big_right_arrow")
#               }
#               insert_top("a", class: "mvGalleryPrevBtn", data-ur-carousel-component: "button", data-ur-carousel-button-type: "prev", data-ur-state: "disabled") {
#                 insert_bottom("span", class: "opt-sprite-big_left_arrow")
#               }
#               $("noscript") {
#                 name("div")
#                 attributes(id: "mw_img_container", data-ur-carousel-component: "scroll_container")
#                 var("shared_url", fetch("img/@src")) {
#                   replace(/_.*/, "_")
#                 }
#                 # EXPLICIT: ul[@id='altImages']/li/img
#                 move_here("ul/li/img")
#                 $("img") {
#                   attributes(class: "mw_main_img", data-ur-carousel-component: "item")
#                   attribute("src") {
#                     value() {
#                       replace(/wid=\d+/, "wid=290")
#                     }
#                   }
#                 }
#                 $("img[last()]") {
#                   add_class("mw_main_last")
#                 }
#                 match($clickable_swatch) {
#                   with(/true/) {
#                     copy_here("../../div[@id='productDescription']/div[@id='productBox']/div[@id='pdpAttributes']/div[@class='colors']/ul/li/input") {
#                       name("img")
#                       attribute("value") {
#                         name("src")
#                         value() {
#                           replace(/.*\//, "")
#                           prepend($shared_url)
#                           append("?wid=290&qlt=90,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg&bgc=255,255,255")
#                         }
#                       }
#                       attribute("value", fetch("@id")) {
#                         value() {
#                           replace(/_imgurl/, "")
#                         }
#                       }
#                       attributes(id: "", class: "mw_swatch_img")
#                     }
#                     $("img[@class='mw_swatch_img'][1]") {
#                       attribute("data-ur-carousel-component", "item")
#                     }
#                   }
#                   else() {
#                     log(concat("--> ", "clickable swatch is false! no clickable swatch!"))
#                   }
#                 }
#                 wrap("div", data-ur-carousel-component: "view_container", data-ur-touch: "disabled", data-ur-autoscroll: "disabled", data-ur-infinite: "disabled")
#                 $("ul") {
#                   remove()
#                 }
#               }
#               $("self::*[div/div/img[last() = 1]]/a") {
#                 remove()
#               }
#               $("self::*[div/div/img[1][contains(@class, 'mw_main_last')]]/a[@class='mvGalleryNextBtn']") {
#                 remove()
#               }
#             }
#             $("div[@id='productDescription']") {
#               $("div[@id='productBox']/div[@id='orderByPhone']/..") {
#                 add_class("mvOrderByPhoneContainer")
#                 
#               }
#               # for currently unavailable products
#               $("div[not(@id) or @id='notavailablePdpreviews']") {
#                 move_to("../../div[@class='productImageSection']", "before")
#               }
#               # move title/id to top
#               $("div[@class='onlyAtMacysProdInfo' or @id='newProduct']") {
#                 $("div[@class='productID']") {
#                   text() {
#                     replace(/^\u00a0/, "")
#                   }
#                 }
#                 move_to("../../div[@id='imageZoomer']", "before")
#               }
#               # copy price to top of page
#               $("div[@id='priceInfo']") {
#                 copy_to("/html/body/div/div/div/div/div/div[@id='imageZoomer']", "before") {
#                   attribute("id", "priceInfo2")
#                   $(".//span[@id='pricingPolicyPopup']"){
#                     remove()
#                   }
#                   $("div[span[@class='priceSale']]/span[1]") {
#                     remove()
#                   }
#                   $("div/input | div/span[@class='priceSaleEndText' or @class='pricingPolicy']") {
#                     remove()
#                   }
#                   $("div[@class='standardProdPricingGroup']") {
#                     $("span[last()]") {
#                       name("div")
#                     }
#                     $("span") {
#                       remove()
#                     }
#                   }
#                 }
#                 # EXPLICIT: div[@class='standardProdPricingGroup']/input[@id='policyURL']
#                 $("div/input[@id='policyURL']") {
#                   attribute("value") {
#                     value() {
#                       rewrite("link")
#                     }
#                   }
#                 }
#               }
#               $("div[@id='pdpreviews']") {
#                 $("div[@id='BVQASummaryContainer'] | div[@id='BVRRSummaryContainer']") {
#                   remove()
#                 }
# 
#                 copy_here("../../div[@id='bottomArea']/div[@id='pdpTabs']/ul/li[@class='tabReviews tabsHeader']/a/em/span[@class='rating']")
#                 
#                 # fb, twitter links
#                 move_here("../div[@id='productBox']/div[@id='socialLinks']")
#                 $("div[@id='socialLinks']") {
#                   $("div[@id='BVRRSecondarySummaryContainer']") {
#                     remove()
#                   }
#                   $("//meta[@property='og:url']") {
#                     $fbUrl = fetch("./@content")
#                   }
#                   $("//input[@id='productId']") {
#                     $productId = fetch("./@value")
#                   }
#                   inner(){
#                     append("<div id=\"fb-root\"></div><script type=\"text/javascript\">(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = \"//connect.facebook.net/en_US/all.js#xfbml=1\";fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>")
#                     append("<a class=\"shareLink opt-sprite-link-facebook\" href=\"http://www.facebook.com/sharer/sharer.php?u=__URL__&t=__TITLE__\" target=\"_blank\"></a><a class=\"shareLink opt-sprite-link-twitter\" href=\"http://twitter.com/share?url=__URL__&text=__TITLE__\" target=\"_blank\"></a>")
#                     append("<div class=\"fb-like\" data-href=\"")
#                     append($fbUrl)
#                     append("\" data-send=\"false\" data-layout=\"button_count\" data-width=\"90\" data-show-faces=\"true\" data-font=\"arial\" data-ref=\"PDP_")
#                     append($productId)
#                     append("\"></div>")
#                   }
#                 }
#                 move_to("../../div[@id='imageZoomer']", "before")
#               }
#               
#               #$("//div[@id='productBox']/div[@id='socialLinks']/div[@id='BVRRSecondarySummaryContainer']") {
#               #  remove()
#               #}
# 
#               # for master page
#               $("div[@id='viewCollectionItemsButton']") {
#                 remove()
#               }
#               $("div[@id='expand']/span[@id='toggleImgs']") {
#                   remove()
#               }
#               $("./div[@id='productBox']") {
#                 
#                 
#                 move_here("div[@id='pdpAttributes']", "top") {
#                   $("div[starts-with(@class, 'pdpShipDays')]") {
#                     move_here("../../div[@id='pdpButtons']/div[@id='pdpQty']", "before")
#                     move_here("../../../div[@id='productBadges']", "before")
#                   }
#                 }
#                 move_here("../div[@id='productBadges']", "before")
#                 $("./div[@id='pdpButtons']") {
#                   # EXPLICIT: .../div[@class='registryContinueBtn']
#                   $("div[@id='errorMsgPanel']/div[contains(@class, 'registryErrorMsgPanelFt')]/div") {
#                     add_class("mvRedBtn")
#                   }
#                   # EXPLICIT : .../div[@class='registryDivButton']
#                   $("div[@id='addToRegistryModal']/div[@class='divCart_wrapper']/div[@class='divCart_bottom']/div") {
#                     $("input[@id='continueShopping']") {
#                       add_class("mvDarkBtn")
#                     }
#                     $("input[@id='viewRegistry']") {
#                       add_class("mvRedBtn")
#                     }
#                   }
#                   insert("div", class: "mw_bag_buttons") {
#                     copy_here("../../../div[@id='priceInfo']/div[@class='standardProdPricingGroup']") {
#                       $("input") {
#                         remove()
#                       }
#                     }
#                     move_here("../img[@class='addToBagButton']") {
#                       #attribute("src", asset('images/buttons/addToBag.png'))
#                       attribute("src", "")
#                       name("div")
#                       add_class("opt-sprite-addToBag")
#                     }
#                     move_here("../img[@id='updateButton']") {
#                       #attribute("src", asset('images/buttons/updateBag.png'))
#                       attribute("src", "")
#                       name("div")
#                       add_class("opt-sprite-updateBag")
#                     }
#                     move_here("../img[@id='addAnotherButton']") {
#                       #attribute("src", asset('images/buttons/addAnotherToShoppingBag.png'))
#                       attribute("src", "")
#                       name("div")
#                       add_class("opt-sprite-addAnotherToShoppingBag")
#                     }
#                     move_here("../img[starts-with(@id, 'ADDTOREGISTRY')]") {
#                       #attribute("src", asset('images/buttons/addToRegistry.png'))
#                       attribute("src", "")
#                       name("div")
#                       add_class("opt-sprite-addToRegistry")
#                     }
#                     move_here("../img[starts-with(@id, 'finditinstore')]") {
#                       #attribute("src", asset('images/buttons/findInStore.png'))
#                       attribute("src", "")
#                       name("div")
#                       add_class("opt-sprite-findInStore")
#                     }
#                     # make buttons look clickable
#                     $("img") {
#                       attribute("onclick", "void(0)")
#                     }
#                     move_here("../div[@class='onlineExclusiveText']")
#                     move_here("div[@class='standardProdPricingGroup']//span[@class='priceSaleEndText']")
#                     move_here("div[@class='standardProdPricingGroup']//span[@id='pricingPolicyPopup']") {
#                       attribute("id", "mw_pricingPolicyPopup")
#                     }
#                   }
#                 }
#                 # used on 'order by phone' pdp
#                 $("./ul[@id='orderByPhoneButtons']") {
#                   add_class("mw_bag_buttons")
# 
#                   move_here("../div[@id='orderByPhone']")
#                   copy_here("../../div[@id='priceInfo']/div[@class='standardProdPricingGroup']", "top") {
#                     $("input") {
#                       remove()
#                     }
#                     $("span[@id='pricingPolicyPopup']") {
#                       attribute("id", "mw_pricingPolicyPopup")
#                       move_to("../..")
#                     }
#                   }
#                   # EXPLICIT: li[1]/img[@id='orderByPhoneImage']
#                   $("li[1]/img") {
#                     #attributes(id: "", src: asset('images/buttons/clickToCall.png'))
#                     attribute("src", "")
#                     name("div")
#                     add_class("opt-sprite-clickToCall")
#                     wrap("a", href: "tel:800-289-6229")
#                   }
#                   # EXPLICIT: li[@class='findinstore']/img[starts-with(@id, 'finditinstore')]
#                   $("li[@class='findinstore']/img") {
#                     #attribute("src", asset('images/buttons/findInStore.png'))
#                     attribute("src", "")
#                     add_class("opt-sprite-findInStore")
#                     name("div")
#                   }
#                 }
#                
#                 # EXPLICIT: div[@id='bottomArea']/div[@id='pdpTabs']/div/div[@id='collectionItems']/div[@class='pricingPolicyInfo']
#                 move_here("../../div[@id='bottomArea']/div[@id='pdpTabs']/div/div/div[@class='pricingPolicyInfo']") {
#                   # EXPLICIT: span[@id='pricingPolicyPopup']/input[@id='pricingPolicyURL']
#                   $("span/input") {
#                     attribute("value") {
#                       value() {
#                         rewrite("link")
#                       }
#                     }
#                   }
#                 }
#               
#                 move_here("../div[@id='emailAFriendPanel']")
#               }
#               # color swatches
#               $("div[@id='productBox']/div[@id='pdpAttributes'] | div[@id='masterColorSelection']") {
#                 log("Importing script: /scripts/pages/_product-selections.ts")
#                 @import _product-selections.ts
#               }
#             }
#             # for in-stock items
#             log("--> Importing pages/_product-acc.ts")
#             @import _product-acc.ts
#             # EXPLICIT: .../div[starts-with(@class, 'registryClaimButton')]/div/input[@id='createRegistryButton' or @id='accessRegistryButton']
#             #$("div[@id='bottomArea']/div[@id='registryClaim']/form/div[@class='registryClaimBody']/div[@class='registryClaimButtons']/div/div/input") {
#             #  add_class("mvRedBtn")
#             #}
#             $("div[@id='bottomArea']") {
#               $(".//img[contains(@src,'easy_returns')]/ancestor::div[contains(@class,'pdpPool')]") {
#                 remove()
#               }
#               $("./div[@id='pdpMasterAddToRegistryPanel']/div[@id='m_atr_buttons']") {
#                 $("img") {
#                   name("div")
#                   add_class("mvGrayBtn")
#                 }
#                 $("div[@id='m_atr_add_more']") {
#                   text("Add More")
#                 }
#                 $("div[@id='m_atr_view_my_registry']") {
#                   text("View Registry")
#                 }
#               }
#             }
#            $(".//div[@id='socialLinks']/div[@id='emailAndPrint']") {
#               # log("============================> EMAIL AND PRINT")
#               move_to("//div[@id='emailAFriendPanel']", "before")
#               # wrap("div", id: 'socialLinks')
#               # change all id's in here to 'emailImage' because their js looks for this particular id
#               attribute("id", "emailImage")
#               # make button look clickable
#               attribute("onclick", "console.log('')")
#               $("img[@id='emailImage']") {
#                 # attribute("src", asset('images/css/email.jpg'))
#                 name("span")
#                 add_class("opt-sprite-email")
#               }
#               insert("span", "Email To A Friend", id: "emailImage")
#               $("img[@id='printButton' or @id='shareSpacerRight']") {
#                 remove()
#               }
#             }
#             #remove email friend link
#             $(".//div[@id='emailImage']"){
#               remove()
#             }
#           }
#           # Move shipping surcharge text from Product Details accordion to Shipping & Returns acc
#           $("//div[@id='memberProductDetails']//ul[@id='bullets']/li[contains(text(),'shipping surcharge fee')]") {
#             move_to("//div[@id='pdpshippingNreturn']/ul[@class='prodInfoList']/li[1]", "after")
#           }
#           
#           # for out-of-stock items
#           log("--> Importing pages/_product-acc.ts")
#           @import _product-acc.ts
#         }
#         # EXPLICIT: div[@id='findItInStore']/div[@id='storeav-oy']/...
#         $("div[@id='findItInStore']/div/div/div[@id='overlay-bd']") {
#           $("div[@class='ovr-hdr cfx']") {
#             move_here("div[1]")
#           }
#           # EXPLICIT: div[@class='ovr-bd-out']/form[@id='locatorForm']
#           $("div[@class='ovr-bd-out']/form") {
#             $("div[@class='ovr-bd-in']/div[@id='saData']/div[@id='srch-frm']") {
#               move_here("div[@class='ovr-infrmb']")
#             }
#             $("div[@id='cont-frm2']") {
#               move_here("div[starts-with(@class, 'submit-btn')]", "top") {
#                 add_class("mvRedBtn")
#               }
#             }
#           }
#         }
#       }
#       $("div[@id='pdpMasterAddToBagPanel']/div[@id='m_atb_buttons']") {
#         $("img") {
#           name("div")
#           add_class("mvGrayBtn")
#         }
#         $("div[@id='m_atb_add_more']") {
#           text("Add More")
#         }
#         $("div[@id='m_atb_checkout']") {
#           text("Checkout")
#         }
#       }
#       $("div[@id='pdpAddToBagPanel']") {
#         # EXPLICIT: .../div[@class='rightCol']/div[@class='ftButtons']
#         $("div[@class='bd']/div[@id='atb_content']/div[@id='atb_footer']/div[@class='rightCol']/div") {
#           $("img[@id='btnContinueShopping']") {
#             #attribute("src", asset('images/buttons/continueShopping.png'))
#             attribute("src", "")
#             name("div")
#             add_class("opt-sprite-continueShopping")
#           }
#           $("img[@id='btnCheckout']") {
#             #attribute("src", asset('images/buttons/checkout.png'))
#             attribute("src", "")
#             name("div")
#             add_class("opt-sprite-checkout")
#           }
#         }
#       }
# 
#      inject_top("<script type='text/javascript'>document.cookie='GCs=CartItem1_92_03_87_UserName1_92_4_02_;'</script>")
#       
#       # Fixes any window.location script that redirects user to desktop
#       # If this is too broad, please change scope to: "//script[contains(.,'MACYS.pdp.showReviewsTab')]"
#       $("//script[contains(.,'window.location')]") {
#         text() {
#           rewrite("link")
#         }
#       }
# 
#       # Write a Review Rearrangement
#       $("//div[@id='BVLBContainer']") {
#         $(".//div[contains(@class,'BVRRReviewDisplayStyle5BodyUser')]") {
#           move_to("//div[@id='BVLBContainer']//div[contains(@class,'BVRRReviewRatingsContainer')]", "after")
#         }
#       }
#       
#       # Gift cards
#       $("//div[@id='giftCardForm']") {
#         $(".//span[@id='amountLabel']") {
#           move_to("./..", "top")
#         }
#         $(".//span[contains(text(),'Your Message:')]") {
#           attribute("id", "messageLabel")
#         }
#         $(".//div[contains(text(),'Must be between $10 and $1,000.')]") {
#           attribute("id", "to_div_label")
#         }
#         $(".//div[contains(text(),'Must be between $10 and $1,000.')] | .//div[contains(text(),'e.g. jane@company.com')] | .//div[contains(text(),'60 characters max per line')]") {
#           attribute("class", "div_label")
#         }
#         $(".//input[@id='toMessage'] | .//input[@id='message']") {
#           inject_after("<br>")
#         }
#         $(".//span[@class='optional']") {
#           move_to("./..//input[@id='message']", "before")
#         }
#         $("//body") {
#           add_class("mw_gift_card")
#         }
#         $("//div[@id='pdpTabs']//ul[@id='bullets']/li") {
#           # Remove duplicate sample link
#           $("./a[contains(text(),'sample E-Gift Card email')]") {
#             $("./..") {
#               remove()
#             }
#           }
#           # Terms link only works with onclick
#           $("./a[contains(text(),'TERMS AND CONDITIONS')]") {
#             name("span")
#             attribute("href") {            
#               name("onclick")
#             }
#           }
#         }        
#       }
#     }
#     
#     $("//span[@id='emailLabel']") {
#       $("./br") {
#         remove()
#       }
#       $("../.") {
#         attribute("id", "emailLabelContainer")
#       }
#     }
#   }
#   $(".//div[@id='mw_img_container']") {
#     $("./img") {
#       attribute("data-mw-lateload", "true")
#       attribute("src") {
#         name("data-src")
#       }
#       attribute("src", asset("images/loading_text.png"))
#     }
#   }
#   #Content::Formatting::WrapElement
#   #[["selector", ".coachfooter, .yuimenubaritem > a"], ["class_name", "mvCoachNav"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
#   var("found", "false")
#   match($found, "false") {
#     $("(//*[contains(concat(' ', @class, ' '), ' coachfooter ')])[1]") {
#       var("found", "true")
#       insert_before("div") {
#         attribute("the_wrapper", "true")
#         attribute("class", "mvCoachNav")
#         move_here("//*[contains(concat(' ', @class, ' '), ' coachfooter ')][not (@the_wrapper)]", "bottom")
#         move_here("//*[contains(concat(' ', @class, ' '), ' yuimenubaritem ')]/a[not (@the_wrapper)]", "bottom")
#         attribute("the_wrapper") {
#           remove()
#         }
#       }
#     }
#   }
#   match($found, "false") {
#     $("(//*[contains(concat(' ', @class, ' '), ' yuimenubaritem ')]/a)[1]") {
#       var("found", "true")
#       insert_before("div") {
#         attribute("the_wrapper", "true")
#         attribute("class", "mvCoachNav")
#         move_here("//*[contains(concat(' ', @class, ' '), ' coachfooter ')][not (@the_wrapper)]", "bottom")
#         move_here("//*[contains(concat(' ', @class, ' '), ' yuimenubaritem ')]/a[not (@the_wrapper)]", "bottom")
#         attribute("the_wrapper") {
#           remove()
#         }
#       }
#     }
#   }
#   
#     #
#     #Content::Formatting::MoveBefore
#     #[["move_me", ".mvCoachNav"], ["before_me", "#globalContentContainer"], ["map_moves", ""]]
#     $("(//*[@id = 'pdpRoot'])[1]") {
#       move_here("(//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')])[1]", "before")
#     }
#     
#     
#     #
#     #Content::Formatting::RemoveElements
#     #[["selector", ".TopBannerPool, .coachtitlebar, .clearboth"]]
#     $("//*[contains(concat(' ', @class, ' '), ' TopBannerPool ')]") {
#       remove()
#     }
#     $("//*[contains(concat(' ', @class, ' '), ' coachtitlebar ')]") {
#       remove()
#     }
#     $("//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
#       remove()
#     }
#     
#     
#     #
#     #Content::Formatting::WrapIndividualElements
#     #[["selector", ".mvCoachNav > a"], ["tag_name", "div"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["multiple", "true"]]
#     $("//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')]/a") {
#       wrap("div") {
#         attribute("class", "mvDarkGrayBar")
#       }
#     }
#     
#     
#     #
#     #Content::Formatting::RemoveAttribute
#     #[["attribute", "align"], ["selector", ".coachfooter"]]
#     $("//*[contains(concat(' ', @class, ' '), ' coachfooter ')]") {
#       attribute("align") {
#         remove()
#       }
#     }
#     
#     
#   # end BasicGroup
#   
#   #Title nav accordian for sub pages
#   #Group::BasicGroup
#   #[]
#   # No need to wrap the contents at all
#     #
#     #Content::Formatting::WrapElement
#     #[["selector", ".mvCoachNav > .mvDarkGrayBar"], ["class_name", "mvCoachNavContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
#     var("found", "false")
#     match($found, "false") {
#       $("(//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')]/*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')])[1]") {
#         var("found", "true")
#         insert_before("div") {
#           attribute("the_wrapper", "true")
#           attribute("class", "mvCoachNavContent")
#           move_here("//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')]/*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')][not (@the_wrapper)]", "bottom")
#           attribute("the_wrapper") {
#             remove()
#           }
#         }
#       }
#     }
#     
#     
#     #
#     #Content::Formatting::Dynamic::Accordian3
#     #[["link_selector", ".coachfooter"], ["content_selector", ".mvCoachNavContent"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
#     var("counter", "")
#     var("content_id_string", "[")
#     $("//*[contains(concat(' ', @class, ' '), ' mvCoachNavContent ')]") {
#         attribute("class") {
#           value() {
#             append(" mw_accordian_hide")
#           }
#         }
#       var("counter") {
#         append("a")
#       }
#       var("id", fetch("./@id"))
#       match($id, /^$/) {
#         attribute("id") {
#           value() {
#             set("acc_con")
#             append($counter)
#             append("22202")
#           }
#         }
#       }
#       var("id", fetch("./@id"))
#       var("content_id_string") {
#         append("'")
#         append($id)
#         append("',")
#       }
#     }
#     var("content_id_string") {
#       replace(/,$/, "]")
#     }
#     var("counter", "")
#     $("//*[contains(concat(' ', @class, ' '), ' coachfooter ')]") {
#       var("counter") {
#         append("a")
#       }
#       var("id", fetch("./@id"))
#       match($id, /^$/) {
#         attribute("id") {
#           value() {
#             set("acc_link")
#             append($counter)
#             append("22202")
#           }
#         }
#       }
#       var("id", fetch("./@id"))
#       attribute("onclick") {
#         value() {
#           set("moovweb_toggle_accordian3('")
#           append($id)
#           append("', ")
#           append($content_id_string)
#           append(", 'mw_accordian_hide')")
#         }
#       }
#     }
#     
#     
#     #
#     #Content::Formatting::SetInnerHTML
#     #[["selector", ".coachfooter"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
#     $("//*[contains(concat(' ', @class, ' '), ' coachfooter ')]") {
#       inner() {
#         append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
#       }
#     }
#     
#     $(".//div[contains(@class,'mvCoachNavContent')]//img") {
#       $title = fetch("./@title")
#       $("./..") {
#         text($title)
#       }
#     }
#     
#     # Ticket 506 - hide suggestions when 'see our suggestions' is not clicked
#     # Removing Accordion from Suggestions
#     $coach_pdp = "false"
#     $(".//div[contains(@class, 'coachfooter')]") {
#       $coach_pdp = "true"
#     }
#     match($coach_pdp) {
#       with(/false/) {
#         $("//*[@id='newItemList'][span[contains(text(),'Suggestions')]]") {
#           $("./span[@class]") {
#             remove()
#           }
#           move_to("./..", "before") {
#             remove()
#           }
#           attribute("id", "ourSuggestionsHeader")
#         }
#       }
#       else() {
#         $("//*[@id='newItemList']/span[contains(text(),'Suggestions')]") {
#           text("Choose Your Items")
#         }
#       }
#     }
#     
#     # Ticket 518 - Changes js file that seem to be breaking scrolling on PDP pages 
#     # $("//script[contains(@src,'catalog.pdp.script')][last()]") {
#       # Do not erase - replace contents of this scope with this when macys can add DNS entry for "assets" subdomain
#       # attribute("src") {
#       #   value() {
#       #     rewrite("link")
#       #   }
#       # }
#       # insert_after("script", type:"text/javascript", src:asset("catalog.pdp.script-201112290106-min-8.js", "js"))
#       # remove()
#     # }
#     
#     # Ticket 519 - Moves suggestion header above the accordian so that this is clickable
#     $(".//div[@id='ourSuggestions']") {
#       move_to("//div[@id='bottomArea']", "top")
#       $(".//div[@class='gapSpace']") {
#         remove()
#       }
#     }
#     
#     $("/html/body") {
#       $(".//div[@id='brandLogo']") {
#         remove()
#       }
#     }
#     # Jeff Image Sprite Optimizations
#     $(".//div[@id='atr_errImg']") {
#       add_class("opt-sprite-icon_error")
#       $("./img") {
#         remove()
#       }
#     }
#     $(".//div[@id='findItInStore']") {
#       $(".//a[contains(concat(' ', @class, ' '), ' close ')]") {
#         add_class("opt-sprite-close")
#         $("./img") {
#           remove()
#         } 
#       }
#     }
#     $(".//span[@id='brandPanelHeaderCloseBtn' or @id='registryPanelHeaderCloseBtn']") {
#       add_class("opt-sprite-close")
#       $("./img") {
#         remove()
#       } 
#     }
#     $(".//div[@id='bc-trk']") {
#       $(".//img") {
#         # ticket #802, #809, #814
#         #remove()
#       }
#     }
#     # this breaks the crossed out color/size combos
#     # ticket #1009
#     # $(".//img[contains(@class, 'colorSwatch')]") {
#     #   attribute("src", "")
#     #   attribute("alt", "")
#     #   attribute("title", "")
#     # }
#     $(".//div[@id='wishlistMessagePopUpClose' or @id='panelClosePopIn' or @id='m_atb_close']") {
#       $("./img") {
#         remove()
#       }
#       add_class("opt-sprite-close_btn")
#     }
#     $(".//div[@id='overlay-bd']") {
#       $(".//img[contains(@src, 'mymacys_csa')]") {
#         $("..") {
#           add_class("opt-sprite-csa")
#         }
#         remove()
#       }
#     }
#     remove("//div[@id='pageOverlayForEmailFriendOverlay']")
# 
