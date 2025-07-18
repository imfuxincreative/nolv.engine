import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Viewer() {
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const raw = sessionStorage.getItem('zoom-image')
    if (!raw) return navigate('/')
    setData(JSON.parse(raw))
  }, [navigate])

  if (!data) return null

  const { src, rect } = data

  return (
    <div
      onClick={() => navigate(-1)}
      className="h-screen w-screen bg-black  relative overflow-hidden"
    >
      <motion.img
        src={src}
        initial={{
          position: 'absolute',
          top: rect.top ,
          left: rect.left, 
          width: rect.width,
          height: rect.height,
           scale : 1,
        }}
        animate={{
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
         scale : 2,
          height: 'auto',
        }}
        exit={{
               position: 'absolute',
          top: rect.top+80 ,
          left: rect.left+80, 
          width: rect.width,
          height: rect.height,
           scale : 1,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className=""
      />
    </div>
  )
}
