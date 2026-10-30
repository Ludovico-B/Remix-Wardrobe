"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { fmt } from "@/lib/products";
import type { Product } from "@/lib/products";
import { byId } from "@/lib/products";
import { useShop } from "@/lib/shop";

export function cartTotal(items: Product[]) {
  const unknown = items.some((p) => p.price == null);
  const sum = items.reduce((t, p) => t + (Number(p.price) || 0), 0);
  return { unknown, sum, label: unknown ? (sum ? fmt(sum) + " + —" : "€ —") : fmt(sum) };
}

export function useCartItems() {
  const { cart } = useShop();
  return cart.map((id) => byId(id)!).filter(Boolean);
}

export function CartDrawer() {
  const { drawerOpen, closeCart, cart, removeFromCart, openCheckout } = useShop();
  const items = cart.map((id) => byId(id)!).filter(Boolean);
  const t = cartTotal(items);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(420px,100%)] flex-col border-l border-[#2f3342] bg-dark2"
            aria-label="Carrello"
            aria-hidden="false"
          >
            <div className="flex items-center justify-between border-b border-[#2f3342] px-4 py-3.5">
              <h2 className="font-bebas text-[2rem] leading-none tracking-[0.03em] text-cream">
                Il tuo carrello
              </h2>
              <button
                className="grid h-11 w-11 place-items-center text-[1.8rem] leading-none text-cream"
                aria-label="Chiudi carrello"
                onClick={closeCart}
              >
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <div className="py-10 text-center text-muted">
                <span className="tape -rotate-2 mb-3.5 inline-block bg-yellow font-bebas text-[1.5rem] text-dark">
                  Carrello vuoto
                </span>
                <p>Dai un&apos;occhiata al catalogo: ogni capo è un pezzo unico.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto px-4 py-3">
                  {items.map((p) => (
                    <div
                      key={p.id}
                      className="grid grid-cols-[72px_1fr_auto] items-center gap-3 border-b border-[#2f3342] py-3"
                    >
                      <Image
                        src={`/${p.images[0]}`}
                        alt=""
                        width={72}
                        height={88}
                        className="h-[88px] w-[72px] object-cover"
                      />
                      <div>
                        <div className="text-[0.95rem] font-medium leading-[1.2]">{p.name}</div>
                        <div className="text-[0.82rem] text-muted">
                          {p.brand} · Taglia {p.size}
                        </div>
                        <div className="font-bebas text-[1.15rem] text-cream">
                          {p.price == null ? "Prezzo da definire" : fmt(p.price)}
                        </div>
                      </div>
                      <button
                        className="px-1.5 py-1.5 text-[0.85rem] text-red underline"
                        onClick={() => removeFromCart(p.id)}
                      >
                        Rimuovi
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#2f3342] px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
                  <div className="flex items-baseline justify-between font-bebas text-[1.6rem] tracking-[0.03em] text-cream">
                    <span>Totale</span>
                    <span>{t.label}</span>
                  </div>
                  <p className="my-0.5 mb-3 text-[0.82rem] text-muted">
                    {t.unknown
                      ? "Alcuni prezzi sono ancora da definire. Spedizione esclusa."
                      : "Spedizione calcolata al checkout."}
                  </p>
                  <button className="btn btn-y w-full" onClick={openCheckout}>
                    Vai al checkout
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
