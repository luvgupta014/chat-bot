import React from 'react';

const ProcessingIndicator = ({ stage, details }) => {
  const stages = {
    uploading: {
      icon: (
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      text: 'Uploading files...',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      dotColor: 'bg-blue-500'
    },
    analyzing: {
      icon: (
        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      text: 'Analyzing uploaded files...',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      dotColor: 'bg-purple-500'
    },
    scanning: {
      icon: (
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      text: 'Scanning file contents...',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      dotColor: 'bg-cyan-500'
    },
    reading: {
      icon: (
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      text: 'Reading file structure...',
      color: 'text-teal-500',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      dotColor: 'bg-teal-500'
    },
    searching: {
      icon: (
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      text: 'Searching codebase...',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      dotColor: 'bg-yellow-500'
    },
    understanding: {
      icon: (
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      text: 'Understanding context...',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      dotColor: 'bg-amber-500'
    },
    thinking: {
      icon: (
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      text: 'AI is thinking...',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      dotColor: 'bg-green-500'
    },
    processing: {
      icon: (
        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      text: 'Processing request...',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      dotColor: 'bg-indigo-500'
    },
    generating: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      text: 'Generating response...',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      dotColor: 'bg-pink-500'
    },
    streaming: {
      icon: (
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      text: 'Streaming response...',
      color: 'text-violet-500',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      dotColor: 'bg-violet-500'
    }
  };

  const currentStage = stages[stage] || stages.thinking;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg animate-fadeIn transition-all duration-300 ${currentStage.bgColor}`}>
      <div className={`flex-shrink-0 ${currentStage.color}`}>
        {currentStage.icon}
      </div>
      <div className="flex-1">
        <div className={`font-medium ${currentStage.color} text-sm`}>
          {currentStage.text}
        </div>
        {details && (
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            {details}
          </div>
        )}
        {/* Animated progress bar */}
        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
          <div 
            className={`h-full ${currentStage.dotColor} rounded-full animate-progress`}
            style={{
              animation: 'progress 2s ease-in-out infinite'
            }}
          ></div>
        </div>
        {/* Progress dots animation */}
        <div className="flex gap-1 mt-2">
          <span className={`w-2 h-2 ${currentStage.dotColor} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></span>
          <span className={`w-2 h-2 ${currentStage.dotColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></span>
          <span className={`w-2 h-2 ${currentStage.dotColor} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;
