#!/usr/bin/env node
/**
 * Check which Gemini models are available for your API key
 * Usage: node check-available-models.js YOUR_API_KEY
 */

import fetch from 'node-fetch';

const apiKey = process.argv[2];

if (!apiKey) {
  console.log(`
❌ API key required!

Usage:
  node check-available-models.js YOUR_GEMINI_API_KEY

Get your API key from:
  https://makersuite.google.com/app/apikey
`);
  process.exit(1);
}

async function checkModels() {
  console.log(`\n🔍 Checking available models for your API key...`);
  console.log(`API Key: ${apiKey.substring(0, 15)}...`);
  
  try {
    // Try v1 endpoint
    console.log(`\n📡 Trying v1 endpoint...`);
    const v1Response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
    );
    
    if (v1Response.ok) {
      const v1Data = await v1Response.json();
      console.log(`✅ v1 endpoint works!`);
      console.log(`Available models:\n`);
      if (v1Data.models && v1Data.models.length > 0) {
        v1Data.models.forEach(model => {
          console.log(`  - ${model.name}`);
        });
      } else {
        console.log(`  (No models found)`);
      }
      return;
    } else {
      console.log(`❌ v1 endpoint failed: ${v1Response.status} ${v1Response.statusText}`);
    }
  } catch (e) {
    console.log(`❌ v1 error: ${e.message}`);
  }
  
  try {
    // Try v1beta endpoint
    console.log(`\n📡 Trying v1beta endpoint...`);
    const v1betaResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    if (v1betaResponse.ok) {
      const v1betaData = await v1betaResponse.json();
      console.log(`✅ v1beta endpoint works!`);
      console.log(`Available models:\n`);
      if (v1betaData.models && v1betaData.models.length > 0) {
        v1betaData.models.forEach(model => {
          console.log(`  - ${model.name}`);
        });
      } else {
        console.log(`  (No models found)`);
      }
      return;
    } else {
      console.log(`❌ v1beta endpoint failed: ${v1betaResponse.status} ${v1betaResponse.statusText}`);
    }
  } catch (e) {
    console.log(`❌ v1beta error: ${e.message}`);
  }
  
  console.log(`\n❌ Neither endpoint worked. Your API key may be invalid or expired.`);
  console.log(`\nTry creating a new key from: https://makersuite.google.com/app/apikey`);
}

checkModels().catch(console.error);
