import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Pause } from "lucide-react";

export default function Tracks({ track, currentTrack, setCurrentTrack }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (isPlaying && currentTrack === track.name) {
      setIsPlaying(false);
      audioRef.current?.pause();
      setCurrentTrack("");
    } else {
      if (currentTrack !== track.name) {
        setCurrentTrack(track.name);
      }
      setIsPlaying(true);
      audioRef.current?.play();
    }
  };

  useEffect(() => {
    if (currentTrack !== track.name && isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  }, [currentTrack]);

  return (
    <motion.div
      className="md:w-[800px] flex bg-[#1db954] rounded-xl text-white gap-4 bg-gradient-to-r from-[#1db954] via-[#191414] to-[#191414]"
      animate={{ scale: 1.2 }}
      whileHover={{ scale: 1.4 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <img
        src={
          track.album?.images[0].url.includes("mosaic")
            ? ""
            : track.album?.images[0].url || ""
        }
        className="h-max-36 w-36 rounded-r-full"
      />
      <div className="flex w-full justify-between">
        <div className="p-4">
          <div className="font-extrabold text-white underline">
            {track.name}
          </div>
          <div className="flex justify-between">
            <div>{track.popularity}</div>
          </div>
          <div className="flex flex-col justify-between">
            <div>album: {track.album?.name || ""}</div>
            <div>released: {track.album?.release_date || ""}</div>
            <div>total tracks: {track.album?.total_tracks || ""}</div>
          </div>
        </div>
        <div className="place-self-end p-4">
          <audio ref={audioRef} src={track.preview_url} />
          <motion.button
            onClick={handlePlayPause}
            whileHover={{ rotate: 90 }} // Rotate 90 degrees on hover
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isPlaying ? <Play /> : <Pause />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
