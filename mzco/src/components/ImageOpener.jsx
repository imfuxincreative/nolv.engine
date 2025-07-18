import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ImageOpener({index, src, to = '/gallary' }) {
  const navigate = useNavigate()
  const imgRef = useRef()
console.log(index)
  const handleClick = () => {
    const rect = imgRef.current.getBoundingClientRect()

    const data = {
     index , 
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
    }
    sessionStorage.setItem('zoom-image', JSON.stringify(data))
    navigate(to)
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt="Zoomable"
      onClick={handleClick}
      className="w-72 rounded-xl cursor-zoom-in"
    />
  )
}
