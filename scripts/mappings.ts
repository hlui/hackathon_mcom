/*
  Mappings

  Mappings are matchers that we use to determine if we should execute a
  bit of Tritium during an execution. Aka, run something when we are
  are on a certain page.

  Example starting code:
*/

match($status) {

  with(/302/) {
    log("--> STATUS: 302") # redirect: just let it go through
  }

  with(/200/) {
    log("--> STATUS: 200")

    match($path) {
      with(/^\/$|^\/\?/) {
        log("--> Importing pages/home.ts in mappings.ts")
        @import pages/home.ts
      }
      with(/womens-clothing\/womens-tops/) {
        # http://mlocal.www1.macys.com/shop/womens-clothing/womens-tops?id=255&edge=hybrid&cm_sp=us_gna-_-shop-tops
        log("--> Importing pages/category.ts in mappings.ts")
        @import pages/category.ts
      }
      with(/\/shop\/product/) {
        log("--> Importing pages/product.ts in mappings.ts")
        @import pages/product.ts
      }
      else() {
        log("--> No page match in mappings.ts")
      }
    }
  }

  else() {
    # not 200 or 302 response status
    log("--> STATUS: " + $status + " assuming its an error code pages/error.ts")
    @import pages/error.ts
  }

}
