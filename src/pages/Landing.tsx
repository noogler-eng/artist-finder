import { useState } from "react";
import { motion } from "framer-motion";
import Meteors from "@/components/ui/meteors";

import { RainbowButton } from "@/components/ui/rainbow-button";
import TrackCard from "@/components/TrackCard";
import { AnimatedBeamDemo } from "@/components/FromToFrom";
import Avtaar from "@/components/Avtaar";
import { UserCheck } from "lucide-react";
import AnimatedGradientTextDemo from "@/components/MyLink";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
            className="w-full text-white"
          >
            let's get my artists's top song
          </RainbowButton>
        </form>
      </div>
      {!artistData.length ? (
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <div className="w-5/6 py-10 px-24 mt-20 flex gap-4 items-center justify-center">
            <AnimatedBeamDemo />
            <p className="text-center w-full flex flex-wrap text-gray-500">
              By implementing these steps, you can create a seamless flow of
              data from Spotify to your application, ensuring high-quality audio
              playback. Consider using advanced audio processing techniques to
              further enhance the listening experience. With efficient data
              handling and playback control, users will enjoy a smooth and
              responsive audio experience.
            </p>
          </div>
          <div className="flex gap-8 items-center justify-center w-5/6 px-24">
            <p className="text-center text-gray-500">
              Our application is a trusted platform utilized by thousands of
              users, providing a seamless and engaging experience for music
              lovers. With a robust and user-friendly interface, we prioritize
              security and reliability, ensuring that every interaction is
              smooth and enjoyable. Our dedicated team continually works to
              enhance performance and introduce innovative features, all while
              maintaining a strong commitment to user privacy. By integrating
              with popular services like Spotify, we offer access to a vast
              library of music, empowering users to discover, listen, and enjoy
              their favorite tracks with exceptional sound quality. Join our
              growing community and experience the difference that a trusted
              application can make in your musical journey!
            </p>
            <Avtaar />
          </div>
        </div>
      ) : null}
      <div className="flex items-center justify-center m-12">
        {artistData &&
          artistData.map((artist: any, index: any) => {
            return (
              <div
                key={index}
                className="h-1/2 flex flex-col w-full relative w-full items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl bg-black gap-2"
              >
                <Meteors number={30} />
                <div className="w-4/6 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent h-full">
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
                </div>
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
                <RainbowButton
                  onClick={() => window.location.reload()}
                  className="text-white"
                >
                  Refresh
                </RainbowButton>
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
        {tracks.length > 0 && (
          <Alert>
            {/* <Terminal className="h-4 w-4" /> */}
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              some song will not play as there is some copyright issues!
            </AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col gap-12">{TopTracks}</div>
      </div>
      <AnimatedGradientTextDemo goToLink={"/my-playlists"} />
      <div className="flex items-center w-full">
        <p className="text-center w-full py-1">made with ❤️ by sharad</p>
      </div>
    </div>
  );
}
