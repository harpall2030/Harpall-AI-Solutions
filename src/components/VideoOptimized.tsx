import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Props {
  webmSrc?: string;
  mp4Src?: string;
  poster: string;
  alt: string;
  className?: string;
  /** Hero video: attach source immediately. Others attach when near the viewport. */
  eager?: boolean;
}

/** Decorative, muted, looping background video. Plays only while visible; poster-only for reduced motion. */
export function VideoOptimized({ webmSrc, mp4Src, poster, alt, className, eager = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [load, setLoad] = useState(eager);
  const cls = className ?? "h-full w-full object-cover";

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) { setLoad(true); video.play().catch(() => {}); }
        else video.pause();
      },
      { rootMargin: "300px 0px", threshold: 0 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (load && !reduced) ref.current?.play().catch(() => {});
  }, [load, reduced]);

  if (reduced || (!webmSrc && !mp4Src)) {
    return <img src={poster} alt="" aria-hidden className={cls} loading={eager ? "eager" : "lazy"} />;
  }
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? "auto" : "none"}
      poster={poster}
      aria-hidden
      title={alt}
      disablePictureInPicture
      className={cls}
    >
      {load && webmSrc && <source src={webmSrc} type="video/webm" />}
      {load && mp4Src && <source src={mp4Src} type="video/mp4" />}
    </video>
  );
}
