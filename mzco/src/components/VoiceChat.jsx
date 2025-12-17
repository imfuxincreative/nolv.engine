// VoiceChat.jsx
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const VoiceChat = ({ src = '', title = 'Voice Message' }) => {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  return (


          <audio ref={audioRef} controls preload="metadata">
            <source type="audio/mpeg" src={src} />
            Your browser does not support the audio element.
          </audio>
       
 
  );
};


export default VoiceChat;
