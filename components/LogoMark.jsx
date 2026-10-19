export default function LogoMark({ src, text, width, height, displayH, brand = false }) {
  return (
    <span className="flex h-10 items-center justify-center">
      {src ? (
        <img
          src={src}
          alt=""
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          style={{ height: displayH }}
          className={`logo-mark w-auto max-w-full object-contain ${brand ? 'logo-mark--brand' : ''}`}
        />
      ) : (
        <span className="font-sans text-[16px] font-semibold tracking-[-0.01em] text-white">{text}</span>
      )}
    </span>
  );
}
