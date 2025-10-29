"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  src: string;
  title?: string;
  artist?: string;
}

export function MusicPlayer({ src, title, artist }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} src={src} loop />

      {/* Music Player UI */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            // Minimized State - Just a floating music icon
            <motion.button
              key="minimized"
              className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 backdrop-blur-sm shadow-lg shadow-blue-500/50 flex items-center justify-center group hover:shadow-blue-500/70 transition-shadow"
              onClick={() => setIsMinimized(false)}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Music
                className={`w-6 h-6 text-white ${
                  isPlaying ? "animate-pulse" : ""
                }`}
              />
            </motion.button>
          ) : (
            // Expanded State - Full player
            <motion.div
              key="expanded"
              className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-blue-500/20 min-w-[280px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              layout
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={
                      isPlaying
                        ? {
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.5, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-xs font-medium text-gray-400">
                    {isPlaying ? "Now Playing" : "Paused"}
                  </span>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Minimize player"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8h10" />
                  </svg>
                </button>
              </div>

              {/* Track Info */}
              <div className="mb-4">
                <h3 className="text-white font-semibold text-sm mb-1 truncate">
                  {title}
                </h3>
                <p className="text-gray-400 text-xs truncate">{artist}</p>
              </div>

              {/* Visualizer Animation */}
              <div className="flex items-end justify-center gap-1 h-12 mb-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-linear-to-t from-blue-500 to-cyan-400 rounded-full"
                    animate={
                      isPlaying
                        ? {
                            height: [
                              "20%",
                              `${Math.random() * 80 + 20}%`,
                              "20%",
                            ],
                          }
                        : { height: "20%" }
                    }
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <motion.button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  )}
                </motion.button>

                {/* Volume Controls */}
                <div className="flex-1 flex items-center gap-2">
                  <motion.button
                    onClick={toggleMute}
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </motion.button>

                  {/* Volume Slider */}
                  <AnimatePresence>
                    {showVolumeSlider && (
                      <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        exit={{ opacity: 0, width: 0 }}
                        onMouseLeave={() => setShowVolumeSlider(false)}
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:w-3
                            [&::-webkit-slider-thumb]:h-3
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-cyan-400
                            [&::-webkit-slider-thumb]:cursor-pointer
                            [&::-webkit-slider-thumb]:shadow-lg
                            [&::-webkit-slider-thumb]:shadow-cyan-400/50
                            [&::-moz-range-thumb]:w-3
                            [&::-moz-range-thumb]:h-3
                            [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:bg-cyan-400
                            [&::-moz-range-thumb]:border-0
                            [&::-moz-range-thumb]:cursor-pointer"
                          aria-label="Volume"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Volume Percentage (when slider hidden) */}
                  {!showVolumeSlider && (
                    <motion.span
                      className="text-xs text-gray-400 font-medium min-w-8 text-right"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {Math.round((isMuted ? 0 : volume) * 100)}%
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Hint Text */}
              <motion.p
                className="text-xs text-gray-500 text-center mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Click to {isPlaying ? "pause" : "play"} background music
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
