"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";

const AdminPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const playAnimationRef = useRef(null);

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressRef.current.value = currentTime;
    progressRef.current.style.setProperty(
      "--range-progress",
      `${(progressRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressRef, setTimeProgress]);

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const handleProgressChange = () => {
    const newTime = progressRef.current.value;
    audioRef.current.currentTime = newTime;
    setTimeProgress(newTime);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const LoadData = () => {
    const duration = audioRef.current.duration;
    setDuration(duration);
    progressRef.current.max = duration;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    };
    
    const handleSpacebarPress = (e) => {
      if (e.code === "Space") {
        togglePlayPause();
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", handleSpacebarPress);

      return () => {
        window.removeEventListener("keydown", handleSpacebarPress);
      };
    }, [togglePlayPause]);

  useEffect(() => {
    if (isPlaying) {
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, repeat]);

  return (
    <main>
      <div className="flex gap-3 items-center">
        <div className="track">
          <audio
            src={src}
            controls
            ref={audioRef}
            className="hidden"
            onLoadedMetadata={LoadData}
          />
        </div>
        <div className="controls" onClick={togglePlayPause}>
          <button>{isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}</button>
        </div>
        <div className="progress-bar flex gap-2 items-center">
          <span className="time current">{formatTime(timeProgress)}</span>
          <input
            type="range"
            className="focus:outline-none"
            defaultValue={0}
            ref={progressRef}
            onChange={handleProgressChange}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>
    </main>
  );
};

export default AdminPlayer;
