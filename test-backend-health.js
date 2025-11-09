// Simple test to check if backend is responding
const BASE_URL = 'http://localhost:5000';

async function testBackend() {
  try {
    console.log('Testing backend health...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    console.log('✅ Health check:', healthData);

    // Try to create a test user and get a token
    console.log('\n📝 Creating test account...');
    const signupRes = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `test-${Date.now()}@example.com`,
        password: 'TestPassword123!',
        name: 'Test User'
      })
    });

    if (!signupRes.ok) {
      console.error('❌ Signup failed:', signupRes.status);
      return;
    }

    const signupData = await signupRes.json();
    console.log('✅ Signup successful');
    const token = signupData.token;
    console.log('Token:', token.substring(0, 20) + '...');

    // Test the /api/chats endpoint
    console.log('\n📖 Testing /api/chats endpoint...');
    const chatsRes = await fetch(`${BASE_URL}/api/chats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log('Status:', chatsRes.status);
    if (!chatsRes.ok) {
      console.error('❌ /api/chats failed:', chatsRes.status);
      const error = await chatsRes.json();
      console.error('Error:', error);
      return;
    }

    const chatsData = await chatsRes.json();
    console.log('✅ /api/chats working! Chats:', chatsData.chats.length);

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testBackend();
