"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { byId } from "@/lib/products";
import { useShop } from "@/lib/shop";
import { AddButton, priceHTMLParts } from "./ProductCard";

export default function ProductModal() {
  const { productId, closeAll } = useShop();
  const p = productId ? byId(productId) : null;
  if (!p) return null;
  return (
    <ModalShell onClose={closeAll}>
      <ProductContent key={p.id} productId={productId!} />
    </ModalShell>
  );
}

function ProductContent({ productId }: { productId: string }) {
  const p = byId(productId)!;
  const [img, setImg] = useState(0);
  const n = p.images.length;
  const multi = n > 1;
  const startX = useRef<number | null>(null);

  const go = (dir: number) => setImg((i) => (i + dir + n) % n);

  const { price, note } = priceHTMLParts(p);

  return (
    <div className="md:grid md:grid-cols-[1.1fr_1fr]">
      {/* Galleria */}
      <div className="md:sticky md:top-0 md:self-start">
        <div
          className="relative aspect-4/5 overflow-hidden bg-[#0d0f14]"
          onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (startX.current === null) return;
            const dx = e.changedTouches[0].clientX - startX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            startX.current = null;
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={img}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              <Image
                src={`/${p.images[img]}`}
                alt={`${p.name} – foto ${img + 1}`}
                fill
                sizes="(min-width:900px) 45vw, 100vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
          {multi && (
            <>
              <button
                className="absolute top-1/2 left-2 grid h-[42px] w-[42px] -translate-y-1/2 place-items-center bg-[rgba(20,22,30,0.75)] text-[1.6rem] text-cream"
                aria-label="Foto precedente"
                onClick={() => go(-1)}
              >
                ‹
              </button>
              <button
                className="absolute top-1/2 right-2 grid h-[42px] w-[42px] -translate-y-1/2 place-items-center bg-[rgba(20,22,30,0.75)] text-[1.6rem] text-cream"
                aria-label="Foto successiva"
                onClick={() => go(1)}
              >
                ›
              </button>
              <span className="absolute bottom-2 left-2 bg-[rgba(20,22,30,0.8)] px-2 py-0.5 text-[0.8rem]">
                {img + 1} / {n}
              </span>
            </>
          )}
        </div>
        {multi && (
          <div className="flex gap-2 overflow-x-auto p-2.5">
            {p.images.map((s, i) => (
              <button
                key={s}
                className={`h-[76px] w-16 shrink-0 border-2 opacity-100 ${
                  i === img ? "border-yellow" : "border-transparent opacity-60"
                }`}
                onClick={() => setImg(i)}
                aria-label={`Foto ${i + 1}`}
              >
                <Image
                  src={`/${s}`}
                  alt=""
                  width={64}
                  height={76}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 pb-[26px] md:p-[30px]">
        <span className="font-bebas text-[1.2rem] tracking-[0.08em] text-yellow">
          {p.brand}
        </span>
        <h2 className="my-0.5 mb-2.5 font-bebas text-[2.3rem] leading-none tracking-[0.02em] text-cream">
          {p.name}
        </h2>
        <div className="font-bebas text-[2rem] text-cream">
          {price}
          {note && (
            <small className="block font-oswald text-[0.85rem] text-muted">{note}</small>
          )}
        </div>
        <dl className="my-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.95rem]">
          <dt className="text-muted">Taglia</dt>
          <dd>{p.size}</dd>
          <dt className="text-muted">Categoria</dt>
          <dd>{p.category}</dd>
          <dt className="text-muted">Condizioni</dt>
          <dd>{p.condition}</dd>
          <dt className="text-muted">Disponibilità</dt>
          <dd>{p.sold ? "Venduto" : "1 pezzo (pezzo unico)"}</dd>
        </dl>
        <p className="mb-[18px] text-[#d6cdbb]">{p.description}</p>
        <AddButton p={p} />
        {p.vinted && (
          <a className="btn btn-o mt-2.5 w-full" href={p.vinted} target="_blank" rel="noopener">
            Vedi su Vinted
          </a>
        )}
        <p className="mt-2.5 text-center text-[0.85rem] text-muted">
          Foto reali del capo in vendita. Hai domande? Scrivici su{" "}
          <a href="https://instagram.com/remix.wardrobe" target="_blank" rel="noopener" className="text-yellow">
            Instagram
          </a>
          .
        </p>
      </div>
    </div>
  );
}

/* Contenitore condiviso delle modali (prodotto / checkout) */
export function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[94vh] w-full max-w-[980px] overflow-auto border-t-4 border-yellow bg-dark2">
        <button
          className="absolute top-2 right-2 z-[3] grid h-[42px] w-[42px] place-items-center bg-[rgba(20,22,30,0.85)] text-[1.6rem] leading-none text-cream"
          aria-label="Chiudi"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </motion.div>
  );
}
