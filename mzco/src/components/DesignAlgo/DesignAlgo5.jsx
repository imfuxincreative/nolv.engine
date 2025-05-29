import React from 'react'
import ImageOpener from '../../components/ImageOpener'

function DesignAlgo5({ image, name, tech, video, index }) {
  return (
    <div className="w-screen flex justify-center items-center flex-col">
      <div className="flex gap-2">
        <ImageOpener src={image[0]} />
        <ImageOpener src={image[1]} />
      </div>

      {/* Optional metadata */}
      {/* 
      <div className="flex w-screen mt-2 px-2 justify-between opacity-50">
        <h6>{name}</h6><h6>{tech}</h6>
      </div> 
      */}
    </div>
  )
}

export default DesignAlgo5
