import React, { useRef, useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

const CHAT_THEMES = {
  black: {
    bg: 'black',
    text: '#ffffff',
  },
    gray: {
    bg: '#ededed',
    text: 'black',
  },
  red: {
    bg: 'orangered',
    text: '#ffffff',
  },
    blue: {
    bg: '#0004DD',
    text: 'white',
  },
  pink: {
    bg: '#FDE4F2',
    text: 'black',
  },
  neon: {
    bg: '#D9FF00',
    text: 'black',
  },
}

function Chat({ message, profile, theme = 'black' }) {
  const { isDarkMode } = useTheme()

  const parentRef = useRef(null)
  const chatRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  const currentTheme =
    CHAT_THEMES[theme?.toLowerCase()] || CHAT_THEMES.black

  useEffect(() => {
    if (!parentRef.current || !chatRef.current) return

    const p = parentRef.current.getBoundingClientRect()
    const c = chatRef.current.getBoundingClientRect()

    setPos({
      top: Math.random() * (p.height - c.height),
      left: Math.random() * (p.width - c.width),
    })
  }, [])

  return (
    <div
      ref={parentRef}
      className={`relative border-r-[1px] border-b-[1px] flex flex-col duration-500 items-center justify-center
        ${isDarkMode ? 'border-[#363636]' : 'border-[#ffffff]'}
        lg:h-[250px] lg:w-[250px] max-sm:h-[200px] max-sm:w-[200px] md:h-[260px] md:w-[260px]`}
    >
      <div
        ref={chatRef}
        className="chat absolute flex gap-3 items-center transition-opacity duration-100"
        style={{
          top: pos.top,
          left: pos.left,
          
        
        }}
      >
        <img
          src={profile}
          className="h-6 w-6 rounded-full"
          alt="avatar"
        />

        <p
          style={{
            backgroundColor: currentTheme.bg,
            color: currentTheme.text,
            boxShadow: currentTheme.glow,
            borderRadius: '18px 18px 18px 4px',
          }}
          className="py-1.5 px-3 text-sm whitespace-nowrap"
        >
          {message}
        </p>
      </div>
    </div>
  )
}

export default Chat
