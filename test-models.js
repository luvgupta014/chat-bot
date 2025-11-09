import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAM03UZNvmejlSCIwjU1HH9UyEGkjSty0Q'; // Your API key

const modelsToTest = [
  'gemini-pro',
  'models/gemini-pro',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'models/gemini-1.5-pro',
  'models/gemini-1.5-flash'
];

async function testModels() {
  console.log('🧪 Testing which models work for content generation...\n');
  const genAI = new GoogleGenerativeAI(API_KEY);

  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent('Hello, are you working?');
      const text = result.response.text();
      
      console.log(`✅ SUCCESS: ${modelName}`);
      console.log(`   Response: "${text.substring(0, 80)}..."\n`);
    } catch (e) {
      console.log(`❌ FAILED: ${modelName}`);
      console.log(`   Error: ${e.message.substring(0, 100)}...\n`);
    }
  }
}

testModels();
