export class ProductsPage {
  public static allProductsHeader = 'h2.title.text-center';
  public static searchInput = 'input[id="search_product"]';
  public static searchButton = 'button[id="submit_search"]';
  
  // Dynamic Product Grid Selections
  public static productItemsList = '.features_items .col-sm-4';
  public static viewProductFirstBtn = 'a[href^="/product_details/"]';
  public static productPriceText = '.product-information span span';
  
  // Category & Brand Sidebar Panels
  public static categoryWomenAccordion = 'a[href="#Women"]';
  public static categoryDressLink = 'a[href="/category_products/1"]';
  public static brandPoloLink = 'a[href="/brand_products/Polo"]';

  // Reviews
  public static reviewNameInput = 'input[id="name"]';
  public static reviewEmailInput = 'input[id="email"]';
  public static reviewTextArea = 'textarea[id="review"]';
  public static submitReviewButton = 'button[id="button-review"]';
  public static reviewSuccessAlert = '.alert-success span';

  // Recommended Slider Panel
  public static recommendedItemsHeader = '.recommended_items .title';
  public static recommendedAddToCartBtn = '.recommended_items .carousel-inner .active .add-to-cart';
}
