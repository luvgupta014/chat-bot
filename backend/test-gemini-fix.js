import { handleAIChat } from './services/aiProviders.js';
import dotenv from 'dotenv';

dotenv.config();

const testGemini = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ No GEMINI_API_KEY in environment variables');
    process.exit(1);
  }
  
  console.log('🧪 Testing Gemini API with fix...');
  console.log(`API Key: ${apiKey.substring(0, 10)}...`);
  
  const result = await handleAIChat('gemini', apiKey, 'Hello, what is 2+2?', '');
  
  if (result.success) {
    console.log('✅ Success!');
    console.log('Response:', result.text);
  } else {
    console.error('❌ Error:', result.error);
  }
};

testGemini().catch(console.error);
