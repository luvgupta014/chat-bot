import React from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

function ChatWindow({ messages, messagesEndRef, loading }) {
  const formatMessage = (text) => {
    if (!text) return null
    
    // Split text by code blocks
    const parts = text.split(/```(\w+)?\n([\s\S]*?)```/g)
    
    return parts.map((part, index) => {
      if (index % 4 === 2) {
        // This is a code block
        const language = parts[index - 1] || 'javascript'
        try {
          const highlighted = hljs.highlight(part, { language }).value
          return (
            <div key={index} className="my-3">
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
                <span className="text-xs text-gray-400 font-mono">{language}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(part)}
                  className="text-xs text-gray-400 hover:text-white transition flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm">
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
              </pre>
            </div>
          )
        } catch (e) {
          return (
            <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-3 text-sm">
              <code>{part}</code>
            </pre>
          )
        }
      }
      return part && <p key={index} className="whitespace-pre-wrap leading-relaxed">{part}</p>
    })
  }

  const LoadingIndicator = () => (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 neon-theme:bg-[#39ff14] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 neon-theme:bg-[#39ff14] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 neon-theme:bg-[#39ff14] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 neon-theme:text-[#8ffa70]">AI is analyzing your code...</span>
    </div>
  )

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 neon-theme:from-[#0a150c] neon-theme:to-[#142018]">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
          <div className="mb-6">
            <span className="text-6xl">🤖</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
            <div className="bg-white dark:bg-slate-700 neon-theme:bg-[#142018] border border-gray-200 dark:border-slate-600 neon-theme:border-[#39ff14] rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer hover:scale-105 transform">
              <div className="text-2xl mb-2">🐛</div>
              <p className="text-gray-700 dark:text-gray-300 neon-theme:text-[#8ffa70] font-medium text-sm">Find bugs in your code</p>
            </div>
            <div className="bg-white dark:bg-slate-700 neon-theme:bg-[#142018] border border-gray-200 dark:border-slate-600 neon-theme:border-[#39ff14] rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer hover:scale-105 transform">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-gray-700 dark:text-gray-300 neon-theme:text-[#8ffa70] font-medium text-sm">Optimize performance</p>
            </div>
            <div className="bg-white dark:bg-slate-700 neon-theme:bg-[#142018] border border-gray-200 dark:border-slate-600 neon-theme:border-[#39ff14] rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer hover:scale-105 transform">
              <div className="text-2xl mb-2">💡</div>
              <p className="text-gray-700 dark:text-gray-300 neon-theme:text-[#8ffa70] font-medium text-sm">Get code explanations</p>
            </div>
            <div className="bg-white dark:bg-slate-700 neon-theme:bg-[#142018] border border-gray-200 dark:border-slate-600 neon-theme:border-[#39ff14] rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer hover:scale-105 transform">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-gray-700 dark:text-gray-300 neon-theme:text-[#8ffa70] font-medium text-sm">Best practices tips</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 neon-theme:from-[#39ff14] neon-theme:to-[#baffc9] rounded-full flex items-center justify-center flex-shrink-0 border border-gray-300 dark:border-slate-600 neon-theme:border-[#39ff14] shadow-sm">
                  <span className="text-sm">🤖</span>
                </div>
              )}
              <div
                className={`max-w-2xl rounded-lg px-4 py-3 shadow-sm border ${
                  message.sender === 'user'
                    ? 'bg-blue-600 dark:bg-blue-700 neon-theme:bg-[#39ff14] text-white dark:text-white neon-theme:text-[#101d12] border-blue-600 dark:border-blue-700 neon-theme:border-[#39ff14]'
                    : 'bg-white dark:bg-slate-700 neon-theme:bg-[#142018] text-gray-800 dark:text-gray-200 neon-theme:text-[#8ffa70] border-gray-200 dark:border-slate-600 neon-theme:border-[#39ff14]'
                }`}
              >
                {formatMessage(message.text)}
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 neon-theme:bg-[#142018] rounded-full flex items-center justify-center flex-shrink-0 border border-gray-300 dark:border-slate-600 neon-theme:border-[#39ff14] shadow-sm">
                  <span className="text-sm">👤</span>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 neon-theme:from-[#39ff14] neon-theme:to-[#baffc9] rounded-full flex items-center justify-center flex-shrink-0 border border-gray-300 dark:border-slate-600 neon-theme:border-[#39ff14] shadow-sm">
                <span className="text-sm">🤖</span>
              </div>
              <div className="bg-white dark:bg-slate-700 neon-theme:bg-[#142018] rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-slate-600 neon-theme:border-[#39ff14]">
                <LoadingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  )
}

export default ChatWindow
