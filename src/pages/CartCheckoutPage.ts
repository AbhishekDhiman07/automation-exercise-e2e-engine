export class CartCheckoutPage {
  // Cart Interactions
  public static cartRows = 'tr[id^="product-"]';
  public static removeProductBtn = '.cart_quantity_delete';
  public static proceedToCheckoutBtn = '.check_out';

  // Checkout Review Details
  public static deliveryAddressName = '#address_delivery .address_firstname';
  public static deliveryAddressLine1 = '#address_delivery .address_address1';
  public static checkoutCommentTextArea = 'textarea[name="message"]';
  public static placeOrderBtn = 'a[href="/payment"]';

  // Payment Gateway Input Form
  public static nameOnCardInput = 'input[data-qa="name-on-card"]';
  public static cardNumberInput = 'input[data-qa="card-number"]';
  public static cvcInput = 'input[data-qa="cvc"]';
  public static expiryMonthInput = 'input[data-qa="expiry-month"]';
  public static expiryYearInput = 'input[data-qa="expiry-year"]';
  public static payAndConfirmBtn = 'button[data-qa="pay-button"]';

  // Order Confirmed & Post Actions
  public static orderSuccessHeader = 'h2[data-qa="order-placed"]';
  public static downloadInvoiceBtn = '.download-invoice';
}
