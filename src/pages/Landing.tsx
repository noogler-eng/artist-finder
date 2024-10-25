import { useState } from "react";
// import Tracks from "../components/Tracks";
import { UserCheck } from "lucide-react";
import { motion } from "framer-motion";

import { RainbowButton } from "@/components/ui/rainbow-button";
import TrackCard from "@/components/TrackCard";

export default function Landing() {
  const [currentTrack, setCurrentTrack] = useState("");

  const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";
  const [artist, setArtist] = useState("");
  const [artistData, setArtistData] = useState([]);
  const [tracks, setTracks] = useState([]);

  async function handelGetArtist(e: any) {
    e.preventDefault();
    const res = await fetch(`${API_ADDRESS}/artist/${artist}`);
    const resInJson = await res.json();
    setArtistData(resInJson.artists.items);

    const resTracks = await fetch(
      `${API_ADDRESS}/artist/${resInJson.artists.items[0]?.id}/top-tracks`
    );
    const resInJsonTracks = await resTracks.json();
    setTracks(resInJsonTracks.tracks);
  }

  const TopTracks =
    tracks.length > 0
      ? tracks.map((track: any, index: any) => {
          return (
            <TrackCard
              track={track}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              key={index}
            />
          );
        })
      : null;

  console.log(tracks);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col w-4/6 justify-center items-center gap-8 mt-10">
        <motion.h1
          className="bg-gradient-to-b from-black to-gray-600/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-800/10"
          style={{ fontFamily: "cursive", y: -100 }}
          animate={{ y: 0 }}
        >
          listening Infrastructure for{" "}
          <span className="bg-gradient-to-b from-gray-600/80 to-black bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            everyone
          </span>
        </motion.h1>
        <p className="text-wrap w-4/6 text-gray-500 font-sans text-center">
          Discover the top tracks of your favorite artists and enjoy their music
          for free! Whether you’re a fan of pop, rock, hip-hop, or any other
          genre, we’ve got you covered.
        </p>
        <form className="w-3/6 flex flex-col gap-4 items-center p-4 justify-center items-center">
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="artist name"
            className="w-full rounded-xl py-2 text-center text-sm bg-transparent border-2 border-gray-800 focus:outline-none"
          />
          <RainbowButton
            type="submit"
            onClick={handelGetArtist}
            className="w-full"
          >
            let's get my artists's top song
          </RainbowButton>
        </form>
      </div>
      <div className="flex items-center justify-center m-12">
        {artistData &&
          artistData.map((artist: any, index: any) => {
            return (
              <div
                key={index}
                className="h-1/2 w-1/2 flex flex-col items-center"
              >
                <motion.img
                  src={
                    artist?.images[0]?.url ||
                    artist?.images[1]?.url ||
                    artist?.images[2]?.url
                  }
                  alt="artist"
                  className="rounded-full max-h-1/2 border-2"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 50,
                    ease: "linear",
                  }}
                  style={{
                    backgroundColor: "tomato",
                  }}
                />
                <div className="text-2xl mt-2">{artist.name}</div>
                <div className="flex gap-4 w-full justify-center items-center">
                  <div className="flex gap-2">
                    <UserCheck size={20} /> {artist.followers.total}
                  </div>
                  <span>|</span>
                  <div className="">popularity {artist.popularity}</div>
                </div>
                <div className="flex gap-4 mt-2 flex flex-wrap mt-4">
                  {artist.genres.map((genre: string, index: any) => {
                    const colors = [
                      "#eea990",
                      "#3e3d54",
                      "#6e0b5",
                      "#8c646a",
                      "#2e4045",
                    ];
                    var color =
                      colors[Math.floor(Math.random() * colors.length)];
                    return (
                      <motion.div
                        key={index}
                        className={`border-2 px-4 text-sm py-1 rounded-xl`}
                        style={{ backgroundColor: color }}
                        whileHover={{ backgroundColor: "#191414" }}
                        transition={{ duration: 0.3 }}
                      >
                        {genre}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex flex-col gap-8 items-center text-transparent mb-12">
        {tracks.length > 0 && (
          <motion.div
            className="text-3xl md:text-8xl font-extrabold bg-gradient-to-b from-black to-gray-600/80 bg-clip-text "
            style={{ fontFamily: "cursive" }}
          >
            Artist Tracks
          </motion.div>
        )}
        <div className="flex flex-col gap-12">{TopTracks}</div>
      </div>
    </div>
  );
}
