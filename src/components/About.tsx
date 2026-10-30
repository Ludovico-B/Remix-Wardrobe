"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { INSTAGRAM_URL } from "@/lib/products";

export default function About() {
  const reduce = useReducedMotion();
  const fade = {
    initial: reduce ? undefined : { opacity: 0, y: 26 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7 },
  };

  return (
    <section id="chi-siamo" className="bg-[#101219] py-14 md:py-20">
      <motion.div
        {...fade}
        className="mx-auto grid max-w-[1200px] items-center gap-[26px] px-[18px] md:grid-cols-[1fr_1.2fr] md:gap-[50px]"
      >
        <Image
          src="/img/logo-denim.jpg"
          alt="Etichetta Remix Wardrobe"
          width={1200}
          height={806}
          loading="lazy"
          className="rotate-[-1.5deg] border-4 border-cream shadow-[8px_10px_0_rgba(0,0,0,0.45)]"
        />
        <div>
          <span className="edit-note">Testo segnaposto · da modificare</span>
          <h2 className="sec-title">Chi siamo</h2>
          <p className="mb-3 text-[1.05rem] text-[#ddd3c0]">
            Remix Wardrobe nasce dalla passione per l&apos;abbigliamento vintage e
            workwear. Selezioniamo capi originali di seconda mano dei marchi che
            amiamo, li controlliamo uno per uno e li fotografiamo così come sono.
          </p>
          <p className="mb-3 text-[1.05rem] text-[#ddd3c0]">
            Crediamo in una moda più sostenibile: dare una seconda vita a un capo di
            qualità è la scelta più bella che puoi fare per il tuo guardaroba e per
            il pianeta.
          </p>
          <p className="text-[1.05rem] text-[#ddd3c0]">
            Ci trovi anche su Vinted (dal 31 ottobre 2026) e su Instagram come{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="text-yellow">
              @remix.wardrobe
            </a>
            .
          </p>
        </div>
      </motion.div>
    </section>
  );
}
