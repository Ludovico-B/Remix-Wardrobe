"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { INSTAGRAM_URL } from "@/lib/products";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#0b0c10]"
    >
      <div className="absolute inset-0 -z-30">
        <Image
          src="/img/hero-mobile.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[50%_0%] motion-safe:animate-[heroZoom_14s_ease-out_forwards] md:hidden"
        />
        <Image
          src="/img/hero-desktop.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hidden object-cover object-[60%_50%] motion-safe:animate-[heroZoom_14s_ease-out_forwards] md:block"
        />
        <div className="absolute inset-0 -z-20 backdrop-blur-[3px] saturate-[0.9] [mask-image:linear-gradient(to_top,#000_0,#000_35%,transparent_55%)] md:[mask-image:linear-gradient(to_right,#000_0,#000_30%,transparent_58%)]" />
        <div className="absolute inset-0 -z-10 bg-[image:linear-gradient(to_top,rgba(14,15,21,0.97)_0,rgba(14,15,21,0.85)_36%,rgba(14,15,21,0.3)_58%,rgba(14,15,21,0.1)_75%,rgba(14,15,21,0.6)_100%),radial-gradient(ellipse_at_50%_35%,transparent_30%,rgba(0,0,0,0.55)_100%)] md:bg-[image:linear-gradient(90deg,rgba(14,15,21,0.95)_0,rgba(14,15,21,0.82)_34%,rgba(14,15,21,0.25)_62%,rgba(14,15,21,0.15)_100%),linear-gradient(to_top,rgba(14,15,21,0.85)_0,transparent_30%),linear-gradient(to_bottom,rgba(14,15,21,0.5)_0,transparent_22%),radial-gradient(ellipse_at_70%_45%,transparent_35%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="relative flex w-full flex-col justify-end px-[18px] pt-24 pb-20 md:mx-auto md:max-w-[1200px] md:justify-center md:py-[110px]">
        <div className="max-w-[660px]">
          <motion.div
            variants={rise}
            custom={0.1}
            initial="hidden"
            animate="show"
            className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2.5"
          >
            <span className="tape -rotate-2 bg-red text-white text-[1.05rem]">
              Apertura su Vinted · Sabato 31 ottobre
            </span>
            <span className="tape rotate-[1.5deg] hidden bg-yellow text-dark text-[1.05rem] md:inline-block">
              Est. second hand
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            custom={0.25}
            initial="hidden"
            animate="show"
            className="font-bebas text-cream [font-size:clamp(3rem,13.5vw,8.6rem)] leading-[0.9] tracking-[0.01em] [text-shadow:4px_4px_0_var(--color-red),0_8px_30px_rgba(0,0,0,0.5)] md:text-[min(6.4vw,11vh)]"
          >
            Capi originali
            <br />
            di seconda mano,
            <br />
            foto reali
          </motion.h1>

          <motion.p
            variants={rise}
            custom={0.4}
            initial="hidden"
            animate="show"
            className="mt-3.5 max-w-[32em] text-[1.02rem] text-[#eee4cf] [text-shadow:0_2px_10px_rgba(0,0,0,0.7)] md:text-[1.25rem]"
          >
            Streetwear e workwear vintage selezionati uno per uno. Ogni capo è un
            pezzo unico, fotografato davvero: niente foto di repertorio.
          </motion.p>

          <motion.div
            variants={rise}
            custom={0.55}
            initial="hidden"
            animate="show"
            className="mt-5 grid grid-cols-2 gap-2.5 md:flex md:flex-wrap md:gap-4"
          >
            <a href="#catalogo" className="btn btn-y text-[1.15rem] whitespace-nowrap md:text-[1.35rem]">
              Scopri il catalogo
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-o bg-[rgba(20,22,30,0.45)] backdrop-blur-sm text-[1.15rem] whitespace-nowrap md:text-[1.35rem]"
            >
              Instagram<span className="hidden md:inline">&nbsp;@remix.wardrobe</span>
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            custom={0.7}
            initial="hidden"
            animate="show"
            className="hidden flex-wrap gap-2 pt-[18px] md:flex"
          >
            {["100% originali", "Pezzi unici", "Foto reali"].map((c) => (
              <span
                key={c}
                className="border-[1.5px] border-cream bg-[rgba(20,22,30,0.35)] px-[0.6em] pt-[0.15em] font-bebas text-[1rem] tracking-[0.05em] text-cream"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={rise}
          custom={1}
          initial="hidden"
          animate="show"
          className="hidden md:block md:absolute md:right-10 md:bottom-[60px] md:w-[150px] md:rotate-4 md:border-[3px] md:border-cream md:shadow-[8px_10px_0_rgba(0,0,0,0.5)]"
        >
          <Image
            src="/img/logo.jpg"
            alt="Logo Remix Wardrobe"
            width={400}
            height={282}
            className="h-auto w-full"
          />
        </motion.div>

        <motion.a
          variants={rise}
          custom={1}
          initial="hidden"
          animate="show"
          href="#marchi"
          aria-label="Scorri verso il basso"
          className="absolute bottom-[18px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-bebas text-[0.85rem] tracking-[0.18em] text-cream/85"
        >
          <span className="relative block h-[34px] w-[22px] rounded-xl border-2 border-cream">
            <span className="absolute top-1.5 left-1/2 -ml-0.5 h-2 w-1 rounded-[2px] bg-yellow motion-safe:animate-[scrollDot_1.8s_ease-in-out_infinite]" />
          </span>
          Scorri
        </motion.a>
      </div>
    </section>
  );
}
