import { test, expect } from '@playwright/test';
import { LoginPageObjects } from '../../src/pages/LoginPage';
import { AIEngine } from '../../src/utils/AIEngine';

const uniqueTimestamp = Date.now();
const testEmail = `candidate_qa_${uniqueTimestamp}@interview.com`;
const testPassword = 'SecurePassword123!';

test.describe.serial('End-to-End Enterprise Account Lifecycle Layer', () => {

  test('Step 1: Register a new account user context dynamically', async ({ page }) => {
    await page.goto('/login');
    await page.fill(LoginPageObjects.signupNameInput, 'Automation Candidate');
    await page.fill(LoginPageObjects.signupEmailInput, testEmail);
    await page.click(LoginPageObjects.signupButton);

    await page.fill(LoginPageObjects.passwordRegInput, testPassword);
    await page.fill(LoginPageObjects.firstNameInput, 'Alex');
    await page.fill(LoginPageObjects.lastNameInput, 'Tester');
    await page.fill(LoginPageObjects.addressInput, '100 Innovation Way');
    await page.fill(LoginPageObjects.stateInput, 'Karnataka');
    await page.fill(LoginPageObjects.cityInput, 'Bengaluru');
    await page.fill(LoginPageObjects.zipcodeInput, '560001');
    await page.fill(LoginPageObjects.mobileInput, '9876543210');
    await page.click(LoginPageObjects.createAccountBtn);
    await expect(page.locator(LoginPageObjects.accountCreatedHeader)).toBeVisible();
  });

  test('Step 2: Log in with the newly created user credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill(LoginPageObjects.loginEmailInput, testEmail);
    await page.fill(LoginPageObjects.loginPasswordInput, testPassword);

    await AIEngine.smartClick(page, LoginPageObjects.loginButton, LoginPageObjects.hints.loginButton);
    await expect(page.locator(LoginPageObjects.logoutButton)).toBeVisible();
  });

  test('Step 3: Catalog Interaction, Cart State Management & Checkout Validation', async ({ page }) => {
    // Prerequisite: Re-authenticate quickly if context resets, or continue active flow
    await page.goto('/login');
    await page.fill(LoginPageObjects.loginEmailInput, testEmail);
    await page.fill(LoginPageObjects.loginPasswordInput, testPassword);
    await page.click(LoginPageObjects.loginButton);

    // A. Navigate to Product Catalog
    await page.click(LoginPageObjects.productsNavButton);
    await expect(page).toHaveURL(/.*products/);

    // B. Search for an item
    await page.fill(LoginPageObjects.searchProductInput, 'Dress');
    await page.click(LoginPageObjects.submitSearchButton);

    // C. Interact with the product overlay and add to cart
    // Using first element matching our overlay selector array
    const firstProduct = page.locator(LoginPageObjects.firstProductOverlay).first();
    await firstProduct.click();

    // D. Dismiss the modal dialog interceptor statefully
    await page.click(LoginPageObjects.continueShoppingBtn);

    // E. Verify Cart Persistence Engine
    await page.click(LoginPageObjects.cartNavButton);
    const productRowsCount = await page.locator(LoginPageObjects.cartRows).count();
    expect(productRowsCount).toBeGreaterThan(0); // Validates item was added to session state
    console.log(`?? State persistence verified! Total distinct items in cart: ${productRowsCount}`);

    // F. Progress into Checkout Billing Gateways
    await page.click(LoginPageObjects.proceedToCheckoutBtn);
    await page.fill(LoginPageObjects.orderCommentTextArea, 'Interview Project Automation Order Notes - Deliver ASAP.');
    await page.click(LoginPageObjects.placeOrderBtn);

    // G. Verify we reached the security-sensitive payment portal
    await expect(page).toHaveURL(/.*payment/);
    console.log('?? Checkout calculations processed. Framework arrived safely at Payment Gateway Layer.');
  });
});
