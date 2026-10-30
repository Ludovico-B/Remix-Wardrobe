"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fmt } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useShop } from "@/lib/shop";

export const priceHTMLParts = (p: Product) =>
  p.price == null
    ? { price: "€ —", note: "Prezzo da definire" }
    : { price: fmt(p.price), note: null as string | null };

export function AddButton({ p, className = "" }: { p: Product; className?: string }) {
  const { cart, addToCart } = useShop();
  const inCart = cart.includes(p.id);
  const [cls, label] = p.sold
    ? ["btn-o", "Venduto"]
    : inCart
      ? ["btn-c", "Nel carrello ✓"]
      : ["btn-y", "Aggiungi al carrello"];
  return (
    <button
      className={`btn ${cls} w-full text-[1.05rem] whitespace-nowrap p-[0.45em_0.6em_0.35em] ${className}`}
      disabled={p.sold}
      onClick={() => addToCart(p.id)}
    >
      {label}
    </button>
  );
}

export default function ProductCard({ p }: { p: Product }) {
  const { openProduct } = useShop();
  const reduce = useReducedMotion();
  const { price, note } = priceHTMLParts(p);

  return (
    <motion.article
      layout
      initial={reduce ? undefined : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col border border-[#2a2e3b] bg-dark2 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
    >
      <div
        className="relative aspect-4/5 cursor-pointer overflow-hidden bg-[#0d0f14]"
        onClick={() => openProduct(p.id)}
      >
        <Image
          src={`/${p.images[0]}`}
          alt={p.name}
          width={600}
          height={750}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.04]"
        />
        <span className="tape absolute top-2.5 -left-1 bg-red text-white text-[1rem]">
          Pezzo unico
        </span>
        {p.images.length > 1 && (
          <span className="absolute right-2 bottom-2 bg-[rgba(20,22,30,0.8)] px-2 py-0.5 text-[0.75rem] tracking-[0.04em]">
            {p.images.length} foto
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 pt-3 pb-3.5">
        <span className="font-bebas text-[1rem] leading-none tracking-[0.08em] text-yellow">
          {p.brand}
        </span>
        <h3
          className="cursor-pointer font-oswald text-[1rem] font-medium leading-[1.25]"
          onClick={() => openProduct(p.id)}
        >
          {p.name}
        </h3>
        <span className="text-[0.85rem] text-muted">
          Taglia {p.size} · {p.category}
        </span>
        <div className="mt-auto pt-1.5 font-bebas text-[1.4rem] tracking-[0.04em] text-cream">
          {price}
          {note && (
            <small className="block -mt-0.5 font-oswald text-[0.75rem] tracking-normal text-muted">
              {note}
            </small>
          )}
        </div>
        <AddButton p={p} className="mt-2" />
      </div>
    </motion.article>
  );
}

export function ComingSoonCard({ x }: { x: { brand: string; tape: string } }) {
  const reduce = useReducedMotion();
  const TAPE_CLASS: Record<string, string> = {
    "t-navy": "bg-navy text-white",
    "t-cream": "bg-cream text-dark",
  };
  return (
    <motion.article
      layout
      initial={reduce ? undefined : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col border border-[#2a2e3b] bg-dark2"
    >
      <div
        className="grid aspect-4/5 place-items-center [background:repeating-linear-gradient(-45deg,#1a1d27_0_14px,#161821_14px_28px)]"
        aria-hidden="true"
      >
        <div className="text-center">
          <span className={`tape -rotate-2 ${TAPE_CLASS[x.tape] ?? ""} text-[clamp(1.1rem,4.5vw,1.6rem)]`}>
            {x.brand}
          </span>
          <p className="mt-2.5 font-bebas text-[3.4rem] leading-none text-cream [text-shadow:3px_3px_0_var(--color-red)]">
            ?
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 pt-3 pb-3.5">
        <span className="font-bebas text-[1rem] leading-none tracking-[0.08em] text-yellow">
          {x.brand}
        </span>
        <h3 className="font-oswald text-[1rem] font-medium leading-[1.25]">Prossimamente</h3>
        <span className="text-[0.85rem] text-muted">
          Nuovi capi in arrivo · nessuna foto finché il capo non è pronto
        </span>
        <a
          href="https://instagram.com/remix.wardrobe"
          target="_blank"
          rel="noopener"
          className="btn btn-o mt-2 w-full text-[1.05rem] p-[0.45em_0.6em_0.35em]"
        >
          Seguici per il drop
        </a>
      </div>
    </motion.article>
  );
}
