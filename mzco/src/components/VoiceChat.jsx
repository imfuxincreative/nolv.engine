import React, { useRef, useState } from "react";

const VoiceChat = ({ src }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const formatTime = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center gap-2 w-[50vw] max-w-[420px] h-12 px-2 bg-gray-100 rounded-full">
      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm"
      >
        {playing ? "❚❚" : "▶"}
      </button>

      {/* Timeline + Time */}
      <div className="flex flex-col flex-1 gap-1">
        <h5>Blinding lights</h5>
        {/* <input
          type="range"
          min="0"
          max={duration || 0}
          value={current}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
            setCurrent(e.target.value);
          }}
          className="w-full h-1 appearance-none rounded-full bg-gray-300 cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-2.5
          [&::-webkit-slider-thumb]:h-2.5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-black"
        /> */}

        <p className="text-xs text-gray-600">
          {formatTime(current)} / {formatTime(duration)}
        </p>
      </div>

      {/* Audio (hidden) */}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={() => setCurrent(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
};

export default VoiceChat;
