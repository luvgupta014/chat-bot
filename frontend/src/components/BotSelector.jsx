import React from 'react'

const bots = [
  { id: 'gemini', name: 'Gemini', icon: '✨', color: 'purple', available: true },
  { id: 'chatgpt', name: 'ChatGPT', icon: '💬', color: 'green', available: true },
  { id: 'perplexity', name: 'Perplexity', icon: '🔍', color: 'blue', available: true },
  { id: 'claude', name: 'Claude', icon: '🧠', color: 'orange', available: true },
  { id: 'llama', name: 'Llama', icon: '🚀', color: 'gray', available: false },
  { id: 'dalle', name: 'DALL-E', icon: '🎨', color: 'gray', available: false },
  { id: 'more', name: 'More', icon: '🎭', color: 'gray', available: false },
]

function BotSelector({ selectedBot, onSelectBot, userApiKeys }) {
  const getColorClasses = (color, isAvailable, isSelected, hasKey) => {
    if (!isAvailable) {
      return {
        border: 'border-gray-300',
        bg: 'bg-gray-100',
        text: 'text-gray-400',
        hover: ''
      }
    }
    
    if (isSelected) {
      return {
        border: `border-${color}-500`,
        bg: `bg-${color}-50`,
        text: `text-${color}-700`,
        hover: ''
      }
    }
    
    if (!hasKey) {
      return {
        border: 'border-red-200',
        bg: 'bg-red-50',
        text: 'text-red-600',
        hover: 'hover:border-red-300'
      }
    }
    
    return {
      border: `border-${color}-200`,
      bg: 'bg-white',
      text: 'text-gray-700',
      hover: `hover:border-${color}-400 hover:shadow-md`
    }
  }

  const hasApiKey = (botId) => {
    if (!userApiKeys) return false
    switch(botId) {
      case 'gemini': return !!userApiKeys.gemini
      case 'chatgpt': return !!userApiKeys.chatgpt
      case 'perplexity': return !!userApiKeys.perplexity
      case 'claude': return !!userApiKeys.claude
      default: return false
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 flex-shrink-0">
        <span>🤖</span>
        <span className="font-semibold text-gray-800 text-sm">Select Model:</span>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {bots.map((bot) => {
          const isSelected = selectedBot === bot.id
          const hasKey = hasApiKey(bot.id)
          const canUse = bot.available && hasKey
          

          return (
            <button
              key={bot.id}
              onClick={() => bot.available && canUse && onSelectBot(bot.id)}
              disabled={!bot.available || !hasKey}
              className={`
                relative px-3 py-2 rounded-lg border transition-all flex items-center gap-2 text-sm whitespace-nowrap
                ${isSelected ? 'ring-2 ring-offset-1' : ''}
                ${!bot.available ? 'cursor-not-allowed opacity-50' : ''}
                ${bot.available && !hasKey ? 'cursor-not-allowed' : ''}
                ${bot.available && hasKey ? 'cursor-pointer' : ''}
                ${isSelected && bot.color === 'purple' ? 'border-purple-500 bg-purple-50 ring-purple-300' : ''}
                ${isSelected && bot.color === 'green' ? 'border-green-500 bg-green-50 ring-green-300' : ''}
                ${isSelected && bot.color === 'blue' ? 'border-blue-500 bg-blue-50 ring-blue-300' : ''}
                ${isSelected && bot.color === 'orange' ? 'border-orange-500 bg-orange-50 ring-orange-300' : ''}
                ${!isSelected && bot.available && hasKey && bot.color === 'purple' ? 'border-purple-200 hover:border-purple-400 hover:shadow-md' : ''}
                ${!isSelected && bot.available && hasKey && bot.color === 'green' ? 'border-green-200 hover:border-green-400 hover:shadow-md' : ''}
                ${!isSelected && bot.available && hasKey && bot.color === 'blue' ? 'border-blue-200 hover:border-blue-400 hover:shadow-md' : ''}
                ${!isSelected && bot.available && hasKey && bot.color === 'orange' ? 'border-orange-200 hover:border-orange-400 hover:shadow-md' : ''}
                ${!isSelected && bot.available && !hasKey ? 'border-red-200 bg-red-50' : ''}
                ${!isSelected && !bot.available ? 'border-gray-300 bg-gray-100' : ''}
              `}
              title={bot.available && !hasKey ? 'Please provide your API key in Settings' : undefined}
            >
              <span className="text-lg">{bot.icon}</span>
              <span className={`font-medium ${
                isSelected && bot.color === 'purple' ? 'text-purple-700' : 
                isSelected && bot.color === 'green' ? 'text-green-700' : 
                isSelected && bot.color === 'blue' ? 'text-blue-700' : 
                isSelected && bot.color === 'orange' ? 'text-orange-700' : 
                bot.available && hasKey ? 'text-gray-700' : 
                bot.available && !hasKey ? 'text-red-600' :
                'text-gray-400'
              }`}>
                {bot.name}
              </span>
              {!bot.available && (
                <span className="text-xs text-gray-500 ml-1">Soon</span>
              )}
              {isSelected && (
                <span className="text-green-500 text-sm ml-1">✓</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BotSelector
