import React from 'react'
import { RiBox2Fill } from "react-icons/ri"
import { FaSquareFull } from "react-icons/fa"
import { useNavigate, useLocation } from 'react-router-dom'

function Nav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'
  const isProjects = location.pathname === '/projects'

  return (
    <div className='flex flex-col gap-1 bg-[#ededed] rounded-full fixed right-3 top-1/2 -translate-y-1/2 z-[999] items-center'>
      
      {/* HOME */}
      <button
        onClick={() => navigate('/')}
        className={`h-7 w-7 flex items-center justify-center rounded-full
          ${isHome ? 'bg-black text-white' : 'bg-[#ededed]'}`}
      >
        <RiBox2Fill />
      </button>

      {/* PROJECTS */}
      <button
        onClick={() => navigate('/projects')}
        className={`h-7 w-7 flex items-center justify-center rounded-full
          ${isProjects ? 'bg-black text-white' : ''}`}
      >
        <FaSquareFull size={8} />
      </button>

    </div>
  )
}

export default Nav
