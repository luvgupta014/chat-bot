#!/usr/bin/env node
/**
 * Simple Gemini API Test
 * Usage: node test-gemini.js YOUR_API_KEY
 */

import { chatWithGemini } from './services/aiProviders.js';

const apiKey = process.argv[2];

if (!apiKey) {
  console.log(`
❌ API key required!

Usage:
  node test-gemini.js YOUR_GEMINI_API_KEY

Get your API key from:
  https://makersuite.google.com/app/apikey

Example:
  node test-gemini.js AIzaSy...abc123
`);
  process.exit(1);
}

async function test() {
  console.log(`\n🧪 Testing Gemini API...`);
  console.log(`API Key: ${apiKey.substring(0, 15)}...`);
  
  try {
    const result = await chatWithGemini(apiKey, 'What is 2+2? Reply with just the number.');
    
    if (result.success) {
      console.log(`\n✅ SUCCESS!\n`);
      console.log(`Response: ${result.text}\n`);
    } else {
      console.log(`\n❌ FAILED\n`);
      console.log(`Error: ${result.error}\n`);
      
      // Provide troubleshooting
      if (result.error.includes('404') || result.error.includes('not found')) {
        console.log(`💡 Model not found error. Try these steps:`);
        console.log(`  1. Visit: https://makersuite.google.com/app/apikey`);
        console.log(`  2. Create a NEW API key`);
        console.log(`  3. Try again with the new key\n`);
      } else if (result.error.includes('authentication') || result.error.includes('401')) {
        console.log(`💡 Authentication error. The API key may be invalid or expired:`);
        console.log(`  1. Visit: https://makersuite.google.com/app/apikey`);
        console.log(`  2. Verify the key is correct`);
        console.log(`  3. Try creating a new key\n`);
      }
    }
  } catch (error) {
    console.log(`\n❌ ERROR\n`);
    console.log(`${error.message}\n`);
  }
}

test();
