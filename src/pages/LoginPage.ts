export class LoginPageObjects {
  // --- Auth & Dynamic State Elements ---
  public static loginEmailInput = 'input[data-qa="login-email"]';
  public static loginPasswordInput = 'input[data-qa="login-password"]';
  public static loginButton = 'button[data-qa="login-button"]';
  public static logoutButton = 'a[href="/logout"]';
  
  // Post-Action Landing Confirmation Redirects
  public static continueButton = 'a[data-qa="continue-button"]';
  public static accountDeletedHeader = 'h2[data-qa="account-deleted"]';
  
  // --- Signup Elements ---
  public static signupNameInput = 'input[data-qa="signup-name"]';
  public static signupEmailInput = 'input[data-qa="signup-email"]';
  public static signupButton = 'button[data-qa="signup-button"]';
  public static passwordRegInput = 'input[data-qa="password"]';
  public static firstNameInput = 'input[data-qa="first_name"]';
  public static lastNameInput = 'input[data-qa="last_name"]';
  public static addressInput = 'input[data-qa="address"]';
  public static stateInput = 'input[data-qa="state"]';
  public static cityInput = 'input[data-qa="city"]';
  public static zipcodeInput = 'input[data-qa="zipcode"]';
  public static mobileInput = 'input[data-qa="mobile_number"]';
  public static createAccountBtn = 'button[data-qa="create-account"]';
  public static accountCreatedHeader = 'h2[data-qa="account-created"]';

  // --- Popups / Google Ad Frames Interceptors ---
  public static adDismissButton = '#dismiss-button';
  public static adIframeGoogle = 'iframe[id="aswift_1"]';
}
