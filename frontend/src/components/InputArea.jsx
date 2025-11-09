import React, { useState } from 'react'

function InputArea({ onSendMessage, disabled }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about your code..."
          disabled={disabled}
          className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-700 neon-theme:bg-[#142018] border-2 border-gray-200 dark:border-slate-600 neon-theme:border-[#39ff14] focus:border-blue-500 dark:focus:border-blue-400 neon-theme:focus:border-[#39ff14] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 dark:text-gray-200 neon-theme:text-[#8ffa70] placeholder-gray-400 dark:placeholder-gray-500 neon-theme:placeholder-[#6dd64f] transition"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 neon-theme:text-[#6dd64f] text-xs">
          {input.length > 0 && `${input.length} chars`}
        </div>
      </div>
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 neon-theme:from-[#39ff14] neon-theme:to-[#8ffa70] hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 neon-theme:hover:from-[#39ff14] neon-theme:hover:to-[#8ffa70] disabled:from-gray-300 dark:disabled:from-gray-600 neon-theme:disabled:from-[#404040] disabled:to-gray-400 dark:disabled:to-gray-700 neon-theme:disabled:to-[#404040] text-white neon-theme:text-[#101d12] rounded-xl font-semibold transition disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20 neon-theme:shadow-[#39ff14]/30 hover:shadow-xl disabled:shadow-none flex items-center gap-2"
      >
        {disabled ? (
          <>
            <div className="w-4 h-4 border-2 border-white neon-theme:border-[#101d12] border-t-transparent rounded-full animate-spin"></div>
            Thinking...
          </>
        ) : (
          <>
            Send
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}

export default InputArea
