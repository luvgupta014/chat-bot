#!/usr/bin/env node
/**
 * Magnus AI - Comprehensive Testing Script
 * Tests all AI providers and system components
 */

import { handleAIChat } from './services/aiProviders.js';
import dotenv from 'dotenv';

dotenv.config();

const API_KEYS = {
  gemini: process.env.GEMINI_API_KEY,
  openai: process.env.OPENAI_API_KEY,
  claude: process.env.CLAUDE_API_KEY,
  perplexity: process.env.PERPLEXITY_API_KEY
};

const providers = ['gemini', 'chatgpt', 'claude', 'perplexity'];

const testMessage = 'What is 2+2? Reply with just the number.';

async function testProvider(provider, apiKey) {
  if (!apiKey) {
    console.log(`⏭️  ${provider.toUpperCase()}: No API key configured (skipped)`);
    return null;
  }

  try {
    console.log(`\n🧪 Testing ${provider.toUpperCase()}...`);
    const startTime = Date.now();
    
    const result = await handleAIChat(provider, apiKey, testMessage, '');
    const elapsed = Date.now() - startTime;
    
    if (result.success) {
      console.log(`✅ SUCCESS (${elapsed}ms)`);
      console.log(`   Response: "${result.text.substring(0, 100)}${result.text.length > 100 ? '...' : ''}"`);
      return true;
    } else {
      console.log(`❌ FAILED (${elapsed}ms)`);
      console.log(`   Error: ${result.error}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ERROR (${error.message})`);
    return false;
  }
}

async function main() {
  console.log('========================================');
  console.log('  Magnus AI - Provider Test Suite');
  console.log('========================================');
  
  console.log('\n📋 Configured API Keys:');
  Object.entries(API_KEYS).forEach(([provider, key]) => {
    if (key) {
      console.log(`  ✓ ${provider.toUpperCase()}: ${key.substring(0, 10)}...`);
    } else {
      console.log(`  ✗ ${provider.toUpperCase()}: Not configured`);
    }
  });
  
  console.log('\n========================================');
  console.log('  Testing Providers');
  console.log('========================================');
  
  const results = {};
  
  for (const provider of providers) {
    const mapProvider = provider === 'chatgpt' ? 'openai' : provider;
    const success = await testProvider(provider, API_KEYS[mapProvider]);
    results[provider] = success;
  }
  
  console.log('\n========================================');
  console.log('  Test Summary');
  console.log('========================================');
  
  const passCount = Object.values(results).filter(r => r === true).length;
  const failCount = Object.values(results).filter(r => r === false).length;
  const skipCount = Object.values(results).filter(r => r === null).length;
  
  console.log(`  ✅ Passed: ${passCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`  ⏭️  Skipped: ${skipCount}`);
  
  console.log('\n📝 Provider Status:');
  Object.entries(results).forEach(([provider, success]) => {
    if (success === true) {
      console.log(`  ✅ ${provider.toUpperCase()}: Working`);
    } else if (success === false) {
      console.log(`  ❌ ${provider.toUpperCase()}: Not working`);
    } else {
      console.log(`  ⏭️  ${provider.toUpperCase()}: Skipped (no key)`);
    }
  });
  
  console.log('\n========================================\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
