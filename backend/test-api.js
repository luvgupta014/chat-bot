import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.argv[2];

if (!API_KEY) {
  console.log('Usage: node test-api.js YOUR_API_KEY');
  process.exit(1);
}

console.log('Testing Gemini API with provided key...\n');

const genAI = new GoogleGenerativeAI(API_KEY);

// List of models to try
const models = [
  'gemini-pro',
  'gemini-pro-vision',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-1.5-pro-latest',
  'gemini-1.5-flash-latest',
];

async function testModel(modelName) {
  try {
    console.log(`\n🧪 Testing: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    // Try a simple request
    const result = await model.generateContent('Say "Hello from Gemini"');
    const text = result.response.text();
    
    console.log(`✅ SUCCESS: ${modelName}`);
    console.log(`   Response: ${text.substring(0, 100)}...`);
    return true;
  } catch (error) {
    console.log(`❌ FAILED: ${modelName}`);
    console.log(`   Error: ${error.message.substring(0, 100)}`);
    return false;
  }
}

async function main() {
  console.log(`API Key: ${API_KEY.substring(0, 10)}...${API_KEY.substring(-5)}\n`);
  console.log('=' .repeat(60));
  
  let found = false;
  for (const model of models) {
    const success = await testModel(model);
    if (success) {
      found = true;
      console.log(`\n✅ USE THIS MODEL: ${model}`);
      break;
    }
  }
  
  if (!found) {
    console.log('\n❌ No models worked!');
    console.log('\nPossible causes:');
    console.log('1. API key is invalid or expired');
    console.log('2. The Generative Language API is not enabled');
    console.log('3. There\'s a network issue');
    console.log('\nTry:');
    console.log('1. Create a new API key from https://makersuite.google.com/app/apikey');
    console.log('2. Make sure you\'re signed in with the right Google account');
    console.log('3. Check your internet connection');
  }
  
  console.log('\n' + '='.repeat(60));
}

main().catch(console.error);
