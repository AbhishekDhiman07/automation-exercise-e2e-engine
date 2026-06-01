import { Page } from '@playwright/test';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'MOCK_KEY' });

export class AIEngine {
  static async smartClick(page: Page, brokenSelector: string, semanticHint: string): Promise<void> {
    try {
      await page.click(brokenSelector, { timeout: 3000 });
    } catch (error) {
      console.warn(`\n?? [AI ENGINE]: Element '${brokenSelector}' not found. Initializing AI Self-Healing...`);
      
      const domSnapshot = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input, button, select, a')).map(el => ({
          tagName: el.tagName,
          id: el.id,
          className: el.className,
          placeholder: el.getAttribute('placeholder'),
          text: el.textContent?.trim().substring(0, 30),
          dataQa: el.getAttribute('data-qa')
        }));
      });

      console.log(`?? [AI ENGINE]: Analyzing DOM layout against intent: "${semanticHint}"`);

      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_actual_api_key')) {
        console.log(`?? [AI ENGINE MOCK]: Running in demo mode. Paste your real API key in .env to call GPT.`);
        throw error;
      }

      const prompt = `
        Your task is to fix a broken test automation selector.
        The selector '${brokenSelector}' failed. The element's intended purpose is: "${semanticHint}".
        Available items:
        ${JSON.stringify(domSnapshot, null, 2)}
        Return ONLY its valid CSS selector path. No markdown code blocks.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
      });

      const healedSelector = response.choices[0].message.content?.trim();
      if (healedSelector) {
        console.log(`? [AI ENGINE]: Success! Healed locator determined: '${healedSelector}'`);
        await page.click(healedSelector);
      } else {
        throw error;
      }
    }
  }
}
