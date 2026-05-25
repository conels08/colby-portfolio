"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  gallery: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const SWIPE_OFFSET_THRESHOLD = 50;   // px — minimum drag to trigger nav
const SWIPE_VELOCITY_THRESHOLD = 400; // px/s — fast flick also triggers

export function Lightbox({ isOpen, gallery, index, alt, onClose, onIndexChange }: LightboxProps) {
  const directionRef = useRef(0); // 1 = forward, -1 = back — used for slide direction
  const src = gallery[index] ?? null;
  const hasMultiple = gallery.length > 1;

  const goNext = () => {
    if (!hasMultiple) return;
    directionRef.current = 1;
    onIndexChange((index + 1) % gallery.length);
  };

  const goPrev = () => {
    if (!hasMultiple) return;
    directionRef.current = -1;
    onIndexChange((index - 1 + gallery.length) % gallery.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipedRight = offset.x > SWIPE_OFFSET_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD;
    const swipedLeft  = offset.x < -SWIPE_OFFSET_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD;
    if (swipedRight) goPrev();
    else if (swipedLeft) goNext();
  };

  // Keyboard: arrows navigate, Escape closes (capture phase so it beats the drawer)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      { e.stopPropagation(); onClose(); }
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft")  goPrev();
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index, gallery.length]);

  const slideVariants = {
    enter:  (dir: number) => ({ x: dir >= 0 ? "55%" : "-55%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit:   (dir: number) => ({ x: dir >= 0 ? "-55%" : "55%", opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 flex items-center justify-center bg-black/92 overflow-hidden"
          style={{ zIndex: 10010 }}
          onClick={onClose}
        >
          {/* Close button — large tap target */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Desktop prev/next arrow buttons */}
          {hasMultiple && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image — slides between shots, draggable for swipe */}
          <AnimatePresence mode="popLayout" custom={directionRef.current}>
            <motion.div
              key={index}
              custom={directionRef.current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
              drag={hasMultiple ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={handleDragEnd}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-4 md:inset-12 select-none touch-pan-y"
              style={{ cursor: hasMultiple ? "grab" : "default" }}
              whileDrag={{ cursor: "grabbing" }}
            >
              <Image
                src={src}
                alt={`${alt} — ${index + 1} of ${gallery.length}`}
                fill
                sizes="100vw"
                className="object-contain pointer-events-none"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          {hasMultiple && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    directionRef.current = i > index ? 1 : -1;
                    onIndexChange(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    i === index
                      ? "w-6 h-2 bg-white"
                      : "w-2 h-2 bg-white/35 hover:bg-white/65"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Mobile swipe hint — shown only on first image, fades after a moment */}
          {hasMultiple && index === 0 && (
            <motion.p
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 text-white/50 text-xs pointer-events-none whitespace-nowrap md:hidden"
            >
              swipe to browse
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
