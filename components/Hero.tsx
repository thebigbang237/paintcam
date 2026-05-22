"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import type { Lang } from "@/hooks/useLanguage";

const copy = {
  fr: {
    title1: "20 ans",
    title2: "ans de",
    title3: "l'innovation",
    quote:
      "“Une vision qui traverse le temps devient un héritage à célébrer. À l’occasion de ses 20 ans, Paintcam Industries S.A. a l’honneur de vous convier à une soirée célébrant deux décennies d’innovation, d’excellence et de vision d’avenir.”",
    cta: "Confirmer ma présence",
  },
  en: {
    title1: "20 Years",
    title2: "years of",
    title3: "innovation",
    quote:
      "“Every once in a while, a vision grows beyond an idea and becomes a milestone worth honoring. Paintcam Industries S.A. is honored to invite you to an evening reflecting 20 years of innovation, engineering, and forward-thinking vision.”",
    cta: "Confirm Attendance",
  },
};

// Stagger container for hero content
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const portraitRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const userMutedRef = useRef(false);

  // Callback refs fire synchronously during React's commit phase — before iOS
  // Safari evaluates autoplay, which is why useEffect alone is too late.
  const bgVideoRefCb = useCallback((el: HTMLVideoElement | null) => {
    bgVideoRef.current = el;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  const portraitRefCb = useCallback((el: HTMLVideoElement | null) => {
    portraitRef.current = el;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    if (!portraitRef.current) return;
    const next = !muted;
    portraitRef.current.muted = next;
    portraitRef.current.play().catch(() => {});
    setMuted(next);
    userMutedRef.current = next;
  };

  useEffect(() => {
    const unmute = () => {
      if (userMutedRef.current || !portraitRef.current) return;
      portraitRef.current.muted = false;
      portraitRef.current.play().catch(() => {});
      setMuted(false);
    };
    document.addEventListener("click", unmute, { once: true });
    document.addEventListener("touchstart", unmute, { once: true });
    return () => {
      document.removeEventListener("click", unmute);
      document.removeEventListener("touchstart", unmute);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative max-sm:mt-10 min-h-screen w-full overflow-hidden flex flex-col justify-between items-center md:flex-row"
    >
      {/* ── BACKGROUND VIDEO ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={bgVideoRefCb}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="//video.mp4" type="video/mp4" />
        </video>

        {/* Gradient: transparent top → dark center → solid dark bottom */}
        {/* This creates the seamless transition into the next section */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(3,3,3,0.15)  0%,
                rgba(3,3,3,0.25)  15%,
                rgba(3,3,3,0.6)   45%,
                rgba(3,3,3,0.88)  70%,
                rgba(3,3,3,1)     100%
              )
            `,
          }}
          aria-hidden="true"
        />

        {/* Left-side vignette to help portrait card stand out */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, transparent 30%, rgba(3,3,3,0.55) 80%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── LEFT: PORTRAIT VIDEO CARD ── */}
      <div className="relative z-10 flex w-full items-end justify-center pb-8 pt-28 md:w-[45%] md:items-center md:justify-end md:pb-0 md:pl-8 md:pt-0 lg:pl-14">
        <motion.div
          className="hero-video-card relative aspect-[9/16] w-full max-w-[260px] md:max-w-65 lg:max-w-75 xl:max-w-85"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.2,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          {/* Video frame */}
          <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-black ">
            <video
              ref={portraitRefCb}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            >
              <source src="/assets/video.mp4" type="video/mp4" />
            </video>

            {/* Inner gradient on portrait */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)",
              }}
              aria-hidden="true"
            />

            {/* ── MUTE BUTTON — bottom LEFT as requested ── */}
            <button
              onClick={toggleMute}
              aria-label={
                muted
                  ? lang === "fr"
                    ? "Activer le son"
                    : "Unmute"
                  : lang === "fr"
                    ? "Couper le son"
                    : "Mute"
              }
              className="absolute bottom-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 backdrop-blur-md transition-all duration-300 hover:border-[#D7B66F]/70 hover:bg-black/70 hover:scale-105 active:scale-95"
            >
              {muted ? (
                <VolumeX size={14} className="text-white/85" />
              ) : (
                <Volume2 size={14} className="text-[#D7B66F]" />
              )}
            </button>
          </div>

          {/* Gold corner brackets */}
          <span
            className="corner-bracket tl text-[#D7B66F]"
            aria-hidden="true"
          />
          <span
            className="corner-bracket tr text-[#D7B66F]"
            aria-hidden="true"
          />
          <span
            className="corner-bracket bl text-[#D7B66F]"
            aria-hidden="true"
          />
          <span
            className="corner-bracket br text-[#D7B66F]"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* ── RIGHT: HERO CONTENT ── */}
      <motion.div
        className="relative z-10 flex w-full flex-col items-center justify-center px-8 pb-16 text-center md:w-[45%] md:items-start md:pb-0 md:pr-10 md:text-left lg:pr-14"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Main headline */}
        <motion.div
          variants={item}
          className="mb-6 [@media(max-height:799px)]:mb-3"
        >
          <h1 style={{ textShadow: "0 4px 50px rgba(0,0,0,0.7)" }}>
            <span
              className="hero-number block leading-none tracking-[-0.045em] text-[#D7B66F]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              20
            </span>
            <span
              className="hero-subtitle mt-1 block uppercase text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t.title2}
            </span>
            <span
              className="hero-subtitle block uppercase text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t.title3}
            </span>
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={item}
          className="mb-8 [@media(max-height:799px)]:mb-3 w-full max-w-[320px] md:mx-0"
        >
          <div className="gold-divider" />
        </motion.div>

        {/* Quote */}
        <motion.div
          variants={item}
          className="mb-8 [@media(max-height:799px)]:mb-3"
        >
          <blockquote
            className="text-lg leading-relaxed text-[#F5F2EA]/90 [@media(max-height:799px)]:text-sm max-w-120 md:mx-0 mx-auto"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t.quote}
          </blockquote>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={item}
          className="mb-8 [@media(max-height:799px)]:mb-3 w-full max-w-[320px] md:mx-0"
        >
          <div className="gold-divider" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-3 md:justify-start"
        >
          <a
            href="#rsvp"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#rsvp")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block border border-[#D7B66F]/40 px-6 py-3 text-[#D7B66F] transition-colors duration-300 hover:bg-[#D7B66F]/15 cursor-pointer"
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: "1.1rem",
              letterSpacing: "0.04em",
            }}
          >
            {t.cta}
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, #030303)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
