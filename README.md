# 🧠 AI CodeHub

**Your AI-Powered Code Assistant**

An interactive chat-based code assistant powered by Google Gemini AI. Upload your code, ask questions, and get instant AI-powered insights, reviews, and fixes!

## ✨ Features

- **💬 Chat Interface** - Natural conversation with AI about your code
- **📁 File Upload** - Upload multiple code files for comprehensive analysis
- **⚡ Real-time Responses** - Live streaming responses with visual feedback
- **🎨 Syntax Highlighting** - Beautiful code formatting for 50+ languages
- **🐛 Bug Detection** - AI-powered bug finding and fixes
- **💡 Code Review** - Get expert-level code reviews instantly
- **🔒 Secure** - Your API key stays local, zero data retention

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- A Google Gemini API key ([Get one free](https://makersuite.google.com/app/apikey))

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

### Running the App

1. **Start Backend Server**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

2. **Start Frontend** (in a new terminal)
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

3. **Open in Browser**
- Navigate to `http://localhost:5173`
- Enter your Gemini API key
- Start coding! 🎉

## 🎮 How to Use

1. **Enter API Key** - Input your Google Gemini API key on the welcome screen
2. **Upload Files** - Drag and drop or click to upload code files
3. **Ask Questions** - Type your questions or requests about the code
4. **Get AI Help** - Receive instant AI-powered assistance!

## 🛠️ Tech Stack

### Frontend
- React 18.2
- Vite 5.0
- Tailwind CSS 3.3
- Highlight.js 11.8
- Axios 1.6

### Backend
- Node.js
- Express 4.18
- Google Generative AI SDK 0.3
- Multer 1.4
- CORS

## 📚 API Endpoints

- `POST /api/chat` - Send messages to AI
- `POST /api/upload` - Upload code files
- `POST /test-api-key` - Test API key validity
- `GET /health` - Health check

## 🎨 UI Theme

Inspired by modern gaming platforms with:
- Bold, colorful gradients
- Playful animations
- Strong typography
- Engaging visual feedback

## 🔑 Getting Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key (starts with `AIzaSy...`)
4. Paste it in the app
5. Start coding!

## 🔒 Security

- API keys stored only in browser local storage
- No server-side API key storage
- Files uploaded temporarily, deleted after processing
- Zero data retention policy

## 📝 Supported File Types

Upload any text-based code file:
- JavaScript/TypeScript (.js, .ts, .jsx, .tsx)
- Python (.py)
- Java (.java)
- C/C++ (.c, .cpp, .h)
- HTML/CSS (.html, .css)
- And 50+ more!

## 🎯 Use Cases

- **Code Review** - Get instant feedback on your code
- **Bug Fixing** - Find and fix bugs with AI help
- **Optimization** - Improve code performance
- **Learning** - Understand complex code snippets
- **Refactoring** - Get suggestions for better code structure

## 📄 License

MIT License - Free to use and modify!

## 👨‍💻 Creator

**Created with ❤️ by Luv Gupta**

---

*Powered by Google Gemini AI*
