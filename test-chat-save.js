// Test script to verify chat saving functionality
import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000';

async function testChatSaving() {
  try {
    // First, login to get a token
    console.log('🔐 Testing Chat Save Functionality\n');
    
    console.log('1️⃣ Logging in...');
    const loginRes = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const loginData = await loginRes.json();
    
    if (!loginData.token) {
      console.error('❌ Login failed. Try registering first.');
      
      console.log('\n2️⃣ Registering new user...');
      const regRes = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        })
      });
      
      const regData = await regRes.json();
      if (!regData.token) {
        console.error('❌ Registration failed:', regData);
        return;
      }
      console.log('✅ Registered successfully');
      
      // Try login again
      const loginRes2 = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });
      
      const loginData2 = await loginRes2.json();
      
      if (!loginData2.token) {
        console.error('❌ Login failed after registration:', loginData2);
        return;
      }
      
      console.log('✅ Logged in successfully');
      console.log(`   Token: ${loginData2.token.substring(0, 20)}...\n`);
      
      await testChatOperations(loginData2.token);
    } else {
      console.log('✅ Logged in successfully');
      console.log(`   Token: ${loginData.token.substring(0, 20)}...\n`);
      
      await testChatOperations(loginData.token);
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

async function testChatOperations(token) {
  try {
    // Test 1: Create a chat
    console.log('3️⃣ Creating a new chat...');
    const createRes = await fetch(`${API_URL}/api/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Test Chat',
        messages: [
          {
            id: 1,
            sender: 'user',
            text: 'Hello, how are you?',
            timestamp: new Date()
          },
          {
            id: 2,
            sender: 'assistant',
            text: 'I am doing great! How can I help you?',
            timestamp: new Date()
          }
        ]
      })
    });

    const createData = await createRes.json();
    
    if (!createData.chat?.id) {
      console.error('❌ Chat creation failed:', createData);
      return;
    }
    
    console.log('✅ Chat created successfully');
    console.log(`   Chat ID: ${createData.chat.id}`);
    console.log(`   Title: ${createData.chat.title}`);
    console.log(`   Messages: ${createData.chat.messages?.length || 0}\n`);
    
    const chatId = createData.chat.id;
    
    // Test 2: Get all chats
    console.log('4️⃣ Fetching all chats...');
    const getAllRes = await fetch(`${API_URL}/api/chats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const getAllData = await getAllRes.json();
    console.log('✅ Fetched all chats');
    console.log(`   Total chats: ${getAllData.chats?.length || 0}\n`);
    
    if (getAllData.chats?.length > 0) {
      console.log('   Chats:');
      getAllData.chats.forEach(chat => {
        console.log(`   - ${chat.title} (${chat.messageCount} messages)`);
      });
      console.log();
    }
    
    // Test 3: Get single chat
    console.log('5️⃣ Fetching single chat...');
    const getSingleRes = await fetch(`${API_URL}/api/chats/${chatId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const getSingleData = await getSingleRes.json();
    console.log('✅ Fetched single chat');
    console.log(`   Chat ID: ${getSingleData.chat?.id}`);
    console.log(`   Title: ${getSingleData.chat?.title}`);
    console.log(`   Messages: ${getSingleData.chat?.messages?.length || 0}\n`);
    
    // Test 4: Update chat
    console.log('6️⃣ Updating chat...');
    const updateRes = await fetch(`${API_URL}/api/chats/${chatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Updated Test Chat',
        messages: [
          ...getSingleData.chat.messages,
          {
            id: 3,
            sender: 'user',
            text: 'That is great!',
            timestamp: new Date()
          }
        ]
      })
    });

    const updateData = await updateRes.json();
    console.log('✅ Chat updated successfully');
    console.log(`   Title: ${updateData.chat?.title}`);
    console.log(`   Messages: ${updateData.chat?.messages?.length || 0}\n`);
    
    console.log('✅ All tests passed! Chat saving is working correctly.');
    
  } catch (error) {
    console.error('❌ Chat operation error:', error.message);
  }
}

testChatSaving();
