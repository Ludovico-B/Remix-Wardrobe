"use client";

import { motion, useReducedMotion } from "framer-motion";
import { INSTAGRAM_URL, VINTED_URL } from "@/lib/products";
import { useShop } from "@/lib/shop";

export default function Social() {
  const { toast } = useShop();
  const reduce = useReducedMotion();
  const fade = {
    initial: reduce ? undefined : { opacity: 0, y: 26 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7 },
  };

  return (
    <section id="contatti" className="bg-red py-12 text-center">
      <motion.div {...fade} className="mx-auto max-w-[1200px] px-[18px]">
        <h2 className="font-bebas text-white text-[clamp(2.4rem,9vw,4rem)] leading-none [text-shadow:3px_3px_0_rgba(0,0,0,0.35)]">
          Seguici e acquista
        </h2>
        <p className="my-2 mb-[22px] text-[1.1rem] text-white">
          Novità, drop e pezzi unici ogni settimana. Apertura su Vinted sabato 31
          ottobre!
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <a className="btn btn-d" href={INSTAGRAM_URL} target="_blank" rel="noopener">
            Instagram @remix.wardrobe
          </a>
          {VINTED_URL ? (
            <a className="btn btn-y" href={VINTED_URL} target="_blank" rel="noopener">
              Il nostro Vinted
            </a>
          ) : (
            <button
              className="btn btn-y"
              title="Link Vinted da inserire"
              onClick={() => toast("Link Vinted in arrivo dal 31 ottobre!")}
            >
              Il nostro Vinted (link in arrivo)
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
