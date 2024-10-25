import AnimatedGradientTextDemo from "@/components/MyLink";

export default function MyPlaylists() {
  return (
    <div className="flex flex-col gap-16 px-24 py-10">
      <h2 className="bg-gradient-to-b from-black to-gray-400/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-800/10">
        My Playlists
      </h2>
      <AnimatedGradientTextDemo goToLink={"/"} />
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <iframe
          className="rounded-xl"
          src="https://open.spotify.com/embed/playlist/5zA6DEGoK3v76MmRyBKdJ3?utm_source=generator&theme=0"
          width="40%"
          height={400}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <iframe
          className="rounded-xl"
          src="https://open.spotify.com/embed/playlist/3mwQp4cY81qjT08otCALVo?utm_source=generator&theme=0"
          width="40%"
          height={400}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <iframe
          className="rounded-xl"
          src="https://open.spotify.com/embed/playlist/0ww3CcHraSLvN0Rrmwxl3C?utm_source=generator&theme=0"
          width="40%"
          height="400"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
