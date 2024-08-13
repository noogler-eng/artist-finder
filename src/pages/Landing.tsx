import { useState } from "react";
import Tracks from "../components/Tracks";
import { UserCheck } from "lucide-react";
import { motion } from "framer-motion"


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
            <Tracks
              track={track}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              key={index}
            />
          );
        })
      : null;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-8 mt-10">
        <motion.h1
          className="text-5xl font-extrabold"
          style={{ fontFamily: "cursive", y: -100 }}
          animate={{ y: 0 }}
        >
          listening Infrastructure for{" "}
          <span className="bg-gradient-to-r from-white via-[#1db954] to-[#1db954] bg-clip-text text-transparent">
            everyone
          </span>
        </motion.h1>
        <form className="flex gap-2 items-center p-4 justify-center items-center">
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="artist name"
            className="w-64 rounded-xl py-1 text-center text-black text-sm"
          />
          <motion.button
            type="submit"
            onClick={handelGetArtist}
            className="border-2 px-4 py-1 rounded-xl text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            fetch
          </motion.button>
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
      <div className="flex flex-col gap-8 items-center bg-gradient-to-r from-[#1db954] via-white to-[#1db954] bg-clip-text text-transparent mb-12">
        {tracks.length > 0 && <div className="text-3xl">Artist Tracks</div>}
        <div className="flex flex-col gap-12">{TopTracks}</div>
      </div>
    </div>
  );
}