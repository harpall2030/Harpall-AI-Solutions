import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Props { webmSrc?: string; mp4Src?: string; poster: string; alt: string; className?: string }

export function VideoOptimized({ webmSrc, mp4Src, poster, alt, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduced) { video.pause(); return; }
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) video.play().catch(() => {}); else video.pause(); }, { threshold: 0.1 });
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);
  if (!webmSrc && !mp4Src) return <img src={poster} alt={alt} className={className ?? "h-full w-full object-cover"} loading="lazy" />;
  return (
    <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-label={alt} className={className ?? "h-full w-full object-cover"}>
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      {mp4Src && <source src={mp4Src} type="video/mp4" />}
    </video>
  );
}
