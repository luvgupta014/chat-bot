import React, { useState, useRef } from 'react'

function FileUpload({ onFileUpload, disabled }) {
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onFileUpload(files)
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      onFileUpload(files)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
        dragging
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 neon-theme:bg-[#142a18] scale-105'
          : 'border-gray-300 dark:border-slate-600 neon-theme:border-[#39ff14] bg-white dark:bg-slate-700 neon-theme:bg-[#1a2f1d] hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.go,.rs,.rb,.php,.html,.css,.json,.yaml,.yml,.xml,.md,.txt"
      />
      
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-700 neon-theme:from-[#39ff14] neon-theme:to-[#baffc9] rounded-2xl flex items-center justify-center shadow-md">
          <svg className="w-8 h-8 text-blue-700 dark:text-white neon-theme:text-[#39ff14]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'inherit'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <div>
          <p className="text-base font-semibold text-gray-800 dark:text-white neon-theme:text-[#39ff14] mb-1">
            {dragging ? 'Drop files here' : 'Upload Code Files'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 neon-theme:text-[#baffc9]">
            Drag & drop or click to browse
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 neon-theme:text-[#8ffa70] mt-2">
            Supports: JS, Python, Java, C++, Go, and more
          </p>
        </div>
      </div>
    </div>
  )
}

export default FileUpload
