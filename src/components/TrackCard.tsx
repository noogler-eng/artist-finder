import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Pause } from "lucide-react";

export default function TrackCard({
  track,
  currentTrack,
  setCurrentTrack,
}: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
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

  const handleSliderChange = (value: number) => {
    const newTime = (value / 100) * (track.duration_ms / 1000);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setPlaybackTime(newTime); // Update playback time state
    }
  };

  useEffect(() => {
    if (currentTrack !== track.name && isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    const updatePlaybackTime = () => {
      if (audio) {
        setPlaybackTime(audio.currentTime);
      }
    };

    audio?.addEventListener("timeupdate", updatePlaybackTime);

    return () => {
      audio?.removeEventListener("timeupdate", updatePlaybackTime);
      audio?.pause();
    };
  }, [track]);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-1 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            {track.album?.images ? (
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src={
                  track.album?.images[0].url.includes("mosaic")
                    ? ""
                    : track.album?.images[0].url || ""
                }
                width="100%"
              />
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">
                  Daily Top Mix
                </h3>
                <p className="text-small text-foreground/80">10 Tracks</p>
                <p className="text-small text-foreground/80">
                  {track.popularity} popular
                </p>
                <h1 className="text-large font-medium mt-2">{track.name}</h1>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                value={(playbackTime / (track.duration_ms + 70000)) * 1000000|| 0}
                size="sm"
                // @ts-ignore
                onChange={handleSliderChange}
              />
              <div className="flex justify-between">
                <p className="text-small">
                  {(
                    (playbackTime / ((track.duration_ms / 1000) * 60)) * 100 ||
                    0
                  ).toPrecision(2)}
                </p>
                <p className="text-small text-foreground/50">
                  {(track.duration_ms / (1000 * 1000)).toPrecision(2)}
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <audio
                ref={audioRef}
                src={track.preview_url}
                onEnded={() => {
                  setPlaybackTime(0);
                  setIsPlaying(false);
                }}
              />
              <motion.button
                onClick={handlePlayPause}
                whileHover={{ rotate: 90 }} // Rotate 90 degrees on hover
                transition={{ type: "spring", stiffness: 200 }}
              >
                {isPlaying ? <Pause /> : <Play />}
              </motion.button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              ></Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
