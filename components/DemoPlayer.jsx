export default function DemoPlayer({ demo }) {
  return (
    <div className="aspect-video bg-black">
      {demo.demo.type === 'youtube' ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${demo.demo.id}?autoplay=1&rel=0&playsinline=1`}
          title={`${demo.title} — demo`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <video
          src={demo.demo.src}
          aria-label={`${demo.title} demo`}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="h-full w-full"
        />
      )}
    </div>
  );
}
