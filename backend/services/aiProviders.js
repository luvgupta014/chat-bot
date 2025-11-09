import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';

// Gemini Handler - using REST API directly to bypass SDK endpoint issues
export async function chatWithGemini(apiKey, message, context = '') {
  try {
    console.log(`\n🔐 Initializing Gemini with API key: ${apiKey.substring(0, 10)}...`);
    
    // Use REST API directly with v1 endpoint to avoid SDK v1beta issue
    const modelNames = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-2.0-flash',
      'gemini-pro',
      'gemini-pro-vision'
    ];
    
    let lastError = null;
    console.log(`  Trying ${modelNames.length} different models via REST API...`);
    
    for (const modelName of modelNames) {
      try {
        console.log(`    Attempting: ${modelName}...`);
        
        const fullPrompt = context ? `${context}\n\n${message}` : message;
        
        // Use REST API directly - try v1 endpoint first
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: fullPrompt
                }]
              }]
            })
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const responseText = data.candidates[0].content.parts[0].text;
            console.log(`✅ SUCCESS with model: ${modelName} (v1 endpoint)`);
            return { success: true, text: responseText };
          }
        } else if (response.status === 404) {
          console.log(`      ❌ ${modelName} not found on v1 endpoint, trying v1beta...`);
          
          // Try v1beta endpoint as fallback
          const betaResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: fullPrompt
                  }]
                }]
              })
            }
          );
          
          if (betaResponse.ok) {
            const betaData = await betaResponse.json();
            if (betaData.candidates && betaData.candidates[0] && betaData.candidates[0].content) {
              const responseText = betaData.candidates[0].content.parts[0].text;
              console.log(`✅ SUCCESS with model: ${modelName} (v1beta endpoint)`);
              return { success: true, text: responseText };
            }
          } else {
            const errorData = await betaResponse.text();
            console.log(`      ❌ ${modelName} also failed on v1beta: ${betaResponse.status}`);
          }
        } else {
          const errorData = await response.text();
          console.log(`      ❌ ${modelName} error: ${response.status}`);
        }
      } catch (e) {
        lastError = e;
        console.log(`      ❌ ${modelName}: ${e.message?.substring(0, 50)}`);
      }
    }
    
    // If all models failed, provide detailed error
    const errorMsg = lastError?.message || 'All models failed';
    console.error(`\n❌ All ${modelNames.length} model attempts failed!`);
    console.error(`Last error: ${errorMsg}`);
    
    throw new Error(`No compatible Gemini model found. Tried ${modelNames.length} models. Last error: ${errorMsg.substring(0, 200)}`);
  } catch (error) {
    console.error('Gemini error:', error.message);
    return { success: false, error: error.message };
  }
}

// ChatGPT (OpenAI) Handler
export async function chatWithChatGPT(apiKey, message, context = '', conversationHistory = []) {
  try {
    const openai = new OpenAI({ apiKey });
    
    const messages = [
      { role: 'system', content: context || 'You are a helpful AI assistant.' }
    ];
    
    // Add conversation history
    conversationHistory.forEach(msg => {
      if (msg.sender === 'user') {
        messages.push({ role: 'user', content: msg.text });
      } else if (msg.sender === 'assistant') {
        messages.push({ role: 'assistant', content: msg.text });
      }
    });
    
    // Add current message
    messages.push({ role: 'user', content: message });
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000
    });
    
    const responseText = completion.choices[0].message.content;
    return { success: true, text: responseText };
  } catch (error) {
    console.error('ChatGPT error:', error.message);
    return { success: false, error: error.message };
  }
}

// Claude (Anthropic) Handler
export async function chatWithClaude(apiKey, message, context = '', conversationHistory = []) {
  try {
    const anthropic = new Anthropic({ apiKey });
    
    const messages = [];
    
    // Add conversation history
    conversationHistory.forEach(msg => {
      if (msg.sender === 'user') {
        messages.push({ role: 'user', content: msg.text });
      } else if (msg.sender === 'assistant') {
        messages.push({ role: 'assistant', content: msg.text });
      }
    });
    
    // Add current message
    messages.push({ role: 'user', content: message });
    
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 2000,
      system: context || 'You are a helpful AI assistant.',
      messages: messages
    });
    
    const responseText = response.content[0].text;
    return { success: true, text: responseText };
  } catch (error) {
    console.error('Claude error:', error.message);
    return { success: false, error: error.message };
  }
}

// Perplexity Handler
export async function chatWithPerplexity(apiKey, message, context = '', conversationHistory = []) {
  try {
    const messages = [
      { role: 'system', content: context || 'You are a helpful AI assistant.' }
    ];
    
    // Add conversation history
    conversationHistory.forEach(msg => {
      if (msg.sender === 'user') {
        messages.push({ role: 'user', content: msg.text });
      } else if (msg.sender === 'assistant') {
        messages.push({ role: 'assistant', content: msg.text });
      }
    });
    
    // Add current message
    messages.push({ role: 'user', content: message });
    
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'llama-3.1-sonar-small-128k-online',
        messages: messages,
        max_tokens: 2000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const responseText = response.data.choices[0].message.content;
    return { success: true, text: responseText };
  } catch (error) {
    console.error('Perplexity error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.error?.message || error.message };
  }
}

// Main chat handler that routes to the appropriate AI
export async function handleAIChat(provider, apiKey, message, context = '', conversationHistory = []) {
  switch (provider) {
    case 'gemini':
      return await chatWithGemini(apiKey, message, context);
    case 'chatgpt':
      return await chatWithChatGPT(apiKey, message, context, conversationHistory);
    case 'claude':
      return await chatWithClaude(apiKey, message, context, conversationHistory);
    case 'perplexity':
      return await chatWithPerplexity(apiKey, message, context, conversationHistory);
    default:
      return { success: false, error: `Unknown AI provider: ${provider}` };
  }
}
