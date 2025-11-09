import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace this with your actual API key to test
const API_KEY = process.argv[2] || 'YOUR_API_KEY_HERE';

const genAI = new GoogleGenerativeAI(API_KEY);

// Test different model names - including with and without "models/" prefix
const modelNames = [
  'models/gemini-pro',
  'models/gemini-pro-vision',
  'models/gemini-1.5-pro',
  'models/gemini-1.5-flash',
  'models/text-bison-001',
  'models/chat-bison-001',
];

async function testModels() {
  console.log('Testing available models with SDK version 0.3.1...\n');
  console.log('='.repeat(70));
  
  for (const modelName of modelNames) {
    try {
      console.log(`\nTesting model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      // Try to generate a simple response
      const result = await model.generateContent('Hello');
      console.log(`✅ SUCCESS: ${modelName} works!`);
      console.log(`   Model: ${modelName}`);
      console.log(`   Response: ${result.response.text().substring(0, 60)}...`);
      
    } catch (error) {
      const errorMsg = error.message.split('\n')[0];
      console.log(`❌ FAILED: ${modelName}`);
      console.log(`   Error: ${errorMsg}`);
      if (error.message.includes('403') || error.message.includes('permission')) {
        console.log(`   ⚠️  This might be an API restrictions issue`);
      }
    }
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('\nIf all models fail:');
  console.log('1. Check that Generative Language API is enabled in Google Cloud Console');
  console.log('2. Visit: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
  console.log('3. Enable the API for project: projects/32119812767');
  console.log('4. Then run this test again');
}

testModels();
