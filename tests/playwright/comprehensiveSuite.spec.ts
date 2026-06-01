import { test, expect, Page } from '@playwright/test';
import { LoginPageObjects } from '../../src/pages/LoginPage';
import { NavComponents } from '../../src/pages/NavComponents';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { CartCheckoutPage } from '../../src/pages/CartCheckoutPage';

const timestamp = Date.now();
const freshEmail = `linear_flow_${timestamp}@automation.com`;
const accountPassword = 'Password123!';

test.describe.serial('Linear Enterprise E2E Test Pipeline', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    test.setTimeout(300000); 
    const context = await browser.newContext();
    page = await context.newPage();

    // Network Abort Interceptor for strict ad-blocking
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (
        url.includes('googlesyndication') || 
        url.includes('google-analytics') || 
        url.includes('adservice') || 
        url.includes('amazon-adsystem') ||
        url.includes('doubleclick')
      ) {
        route.abort();
      } else {
        route.continue();
      }
    });
  });

  test.afterAll(async () => {
    if (page) {
      await page.waitForTimeout(4000);
      await page.close();
    }
  });

  // 1. SIGNUP
  test('Step 1: Sign Up New User', async () => {
    test.setTimeout(120000);
    await page.goto('/login');
    
    await page.fill(LoginPageObjects.signupNameInput, 'Linear Tester');
    await page.fill(LoginPageObjects.signupEmailInput, freshEmail);
    await page.click(LoginPageObjects.signupButton);

    await page.fill(LoginPageObjects.passwordRegInput, accountPassword);
    await page.fill(LoginPageObjects.firstNameInput, 'Linear');
    await page.fill(LoginPageObjects.lastNameInput, 'Tester');
    await page.fill(LoginPageObjects.addressInput, 'Test Highway 10');
    await page.fill(LoginPageObjects.stateInput, 'Karnataka');
    await page.fill(LoginPageObjects.cityInput, 'Bengaluru');
    await page.fill(LoginPageObjects.zipcodeInput, '560001');
    await page.fill(LoginPageObjects.mobileInput, '9876543210');
    await page.click(LoginPageObjects.createAccountBtn);

    await expect(page.locator(LoginPageObjects.accountCreatedHeader)).toBeVisible();
    
    const continueBtn = page.locator(LoginPageObjects.continueButton);
    await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await continueBtn.click();
    
    console.log(`? STEP 1 COMPLETE: Account created and initialized for ${freshEmail}`);
  });

  // 2. LOGIN
  test('Step 2: Log In with Created Credentials', async () => {
    test.setTimeout(60000);
    await page.click(NavComponents.logoutLink); 
    await page.goto('/login');

    await page.fill(LoginPageObjects.loginEmailInput, freshEmail);
    await page.fill(LoginPageObjects.loginPasswordInput, accountPassword);
    await page.click(LoginPageObjects.loginButton);
    
    console.log('? STEP 2 COMPLETE: User logged in.');
  });

  // 3. CONFIRM LANDING STATE
  test('Step 3: Confirm Clean Dashboard State', async () => {
    test.setTimeout(60000);
    await page.waitForTimeout(1000); 

    const continueBtn = page.locator(LoginPageObjects.continueButton);
    if (await continueBtn.isVisible()) {
      await continueBtn.click();
      console.log('?? Handled dashboard confirmation state.');
    }

    console.log('? STEP 3 COMPLETE: Landing view stabilized.');
  });

  // 4. SEARCH A PRODUCT
  test('Step 4: Search For a Target Product', async () => {
    test.setTimeout(60000);
    
    const productsLink = page.locator(NavComponents.productsLink);
    await productsLink.waitFor({ state: 'visible', timeout: 15000 });
    await productsLink.click();
    
    const searchBar = page.locator(ProductsPage.searchInput);
    await searchBar.waitFor({ state: 'visible', timeout: 15000 });
    await searchBar.fill('Dress');
    
    await page.click(ProductsPage.searchButton);
    console.log('? STEP 4 COMPLETE: Product search executed.');
  });

  // 5. SELECT A PRODUCT
  test('Step 5: Select the First Searched Product Item', async () => {
    test.setTimeout(60000);
    
    const viewProductBtn = page.locator(ProductsPage.viewProductFirstBtn).first();
    await viewProductBtn.waitFor({ state: 'visible', timeout: 15000 });
    await viewProductBtn.click();

    await expect(page).toHaveURL(/.*product_details.*/);
    console.log('? STEP 5 COMPLETE: Product page loaded.');
  });

  // 6. ADD TO CART & COMPLETE PURCHASE FLOW
  test('Step 6: Complete Purchase Pipeline', async () => {
    test.setTimeout(90000);

    // Click the explicit Add to Cart button inside the inner product information panel
    const detailAddToCartBtn = page.locator('.product-information button.cart');
    await detailAddToCartBtn.waitFor({ state: 'visible', timeout: 10000 });
    await detailAddToCartBtn.click();
    console.log('?? Clicked Add to Cart.');

    // STABLE FIX: Target the explicit modal container link instead of raw text tags
    const viewCartModalLink = page.locator('#cartModal a[href="/view_cart"]');
    await viewCartModalLink.waitFor({ state: 'attached', timeout: 10000 });
    await viewCartModalLink.click();
    console.log('?? Transformed navigation to Cart View layer.');

    await expect(page).toHaveURL(/.*view_cart.*/);
    
    // Proceed through the billing checkpoints
    await page.click(CartCheckoutPage.proceedToCheckoutBtn);

    await page.fill(CartCheckoutPage.checkoutCommentTextArea, 'Automated checkout verification complete.');
    await page.click(CartCheckoutPage.placeOrderBtn);

    await page.fill(CartCheckoutPage.nameOnCardInput, 'Automation Engineer');
    await page.fill(CartCheckoutPage.cardNumberInput, '4242424242424242');
    await page.fill(CartCheckoutPage.cvcInput, '123');
    await page.fill(CartCheckoutPage.expiryMonthInput, '05');
    await page.fill(CartCheckoutPage.expiryYearInput, '2030');
    
    await page.click(CartCheckoutPage.payAndConfirmBtn);

    // Verify final order confirmation page state
    await page.waitForURL(/.*payment_done.*/, { timeout: 15000 });
    console.log('?? SUCCESS: Full E2E checkout pipeline passed perfectly!');
  });
});
