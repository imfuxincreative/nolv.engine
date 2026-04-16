import React from 'react'
import { RiBox2Fill } from "react-icons/ri"
import { FaSquareFull } from "react-icons/fa"
import { useNavigate, useLocation } from 'react-router-dom'
import { useLayoutMode } from '../context/LayoutContext.jsx'

function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { is2DMode, setIs2DMode } = useLayoutMode()

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

  const isHome = location.pathname === '/' && !is2DMode
  const isProjects = location.pathname === '/infiniteChat' || (location.pathname === '/' && is2DMode)

  return (
    <div className='flex flex-col gap-1 bg-[#ededed] rounded-full fixed right-3 top-1/2 -translate-y-1/2 z-[999] items-center'>
      
      {/* HOME */}
      <button
        onClick={() => {
          if (location.pathname !== '/') navigate('/')
          setIs2DMode(false)
        }}
        className={`h-7 w-7 flex items-center justify-center rounded-full
          ${isHome ? 'bg-black text-white' : 'bg-[#ededed]'}`}
      >
        <RiBox2Fill />
      </button>

      {/* PROJECTS */}
      <button
        onClick={() => {
          if (location.pathname !== '/') navigate('/')
          setIs2DMode(true)
        }}
        className={`h-7 w-7 flex items-center justify-center rounded-full
          ${isProjects ? 'bg-black text-white' : ''}`}
      >
        <FaSquareFull size={8} />
      </button>

    </div>
  )
}

export default Nav
