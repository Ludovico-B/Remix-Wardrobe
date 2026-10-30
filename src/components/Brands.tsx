"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useShop } from "@/lib/shop";

const TILES = [
  { brand: "Carhartt", sub: "Workwear", className: "bg-[#E9A11F] text-dark", slab: true, rot: -2 },
  { brand: "Dickies", sub: "Workwear", className: "bg-navy text-white", slab: true, rot: 1.5 },
  {
    brand: "Ralph Lauren",
    sub: "Classic",
    className: "bg-cream text-navy",
    slab: false,
    rot: 1.5,
  },
  { brand: "Lacoste", sub: "Sportswear", className: "bg-green text-white", slab: true, rot: -2 },
];

export default function Brands() {
  const { setBrandFilter } = useShop();
  const reduce = useReducedMotion();

  return (
    <section id="marchi" className="border-y border-[#23263180] bg-[#101219] py-14 md:py-20">
      <div className="mx-auto max-w-[1200px] px-[18px]">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 26 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="sec-title">I marchi</h2>
          <p className="mb-[26px] text-[1.05rem] text-muted">
            I brand che troverai da Remix Wardrobe. Tocca un marchio per filtrare
            il catalogo.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-[22px]">
            {TILES.map((t) => (
              <motion.button
                key={t.brand}
                whileHover={reduce ? undefined : { scale: 1.04, rotate: 0 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setBrandFilter(t.brand)}
                className={`tape ${t.className} ${t.slab ? "font-slab tracking-[0.02em]" : "font-bebas"} px-[0.5em] pt-[0.6em] pb-[0.5em] text-center [font-size:clamp(1.25rem,5.5vw,2.2rem)]`}
                style={t.rot ? { transform: `rotate(${t.rot}deg)` } : undefined}
              >
                {t.brand}
                <small className="block font-oswald text-[0.8rem] uppercase tracking-[0.06em] opacity-80 mt-[0.2em]">
                  {t.sub}
                </small>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
