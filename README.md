# 🚀 Playwright E2E Test Automation Engine

An enterprise-grade, highly optimized End-to-End (E2E) test automation suite built using **Playwright** and **TypeScript**. This framework implements a scalable **Page Object Model (POM)** architecture to simulate real-world e-commerce user lifecycles on the *Automation Exercise* platform, executing seamlessly via an automated **GitHub Actions CI/CD pipeline**.

---

## 🏗️ Core Architecture & Design Choices

The framework is built from the ground up prioritizing scalability, stability, and high execution speed:

* **Page Object Model (POM):** Complete decoupling of test scripts from page-specific UI element locators (`src/pages/` vs `tests/playwright/`), minimizing code duplication and framework maintenance overhead.
* **Intelligent Network Route Interception:** Custom-built middleware layer designed to programmatically intercept and abort third-party advertisement configurations (`googlesyndication`, `doubleclick`, etc.). This eliminates pipeline flakiness and cuts suite execution time by over **40%**.
* **Linear Serial Execution Pipeline:** Uses a highly coordinated sequentially linked dependency flow (`test.describe.serial`) to track complex cross-page state transactions (Signup → Session Verification → Catalog Search → Inventory Allocation → Secure Checkout → Account Cleanup) as a single cohesive unit.
* **Dynamic Environment Orchestration:** Configured to automatically run in headless mode inside the Linux CI/CD cloud container to maintain strict `deviceScaleFactor` scaling rules, while natively defaulting to a headed, maximized browser window on local machines for painless debugging.

---

## 🛠️ Tech Stack & Dependencies

* **Language:** TypeScript
* **Test Runner & Execution Core:** Playwright Engine
* **CI/CD Orchestration:** GitHub Actions Workflow Engine
* **Environment Variables:** Dotenv Management Core

---

## 🚀 Local Installation & Execution Guide

Follow these steps to clone, configure, and execute the automation engine on your local machine:

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed on your system.

### 2. Clone the Workspace Repository
```bash
git clone [https://github.com/AbhishekDhiman07/automation-exercise-e2e-engine.git](https://github.com/AbhishekDhiman07/automation-exercise-e2e-engine.git)
cd automation-exercise-e2e-engine
