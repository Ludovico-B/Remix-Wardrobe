"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/lib/shop";

const LINKS = [
  { href: "#catalogo", label: "Catalogo" },
  { href: "#marchi", label: "Marchi" },
  { href: "#chi-siamo", label: "Chi siamo" },
  { href: "#spedizioni", label: "Spedizioni e resi" },
  { href: "#contatti", label: "Contatti" },
];

export default function Header() {
  const { cart, openCart } = useShop();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color,box-shadow] duration-300 ${
        solid || menuOpen
          ? "border-b border-[#2a2e3b] bg-[rgba(20,22,30,0.96)] backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent bg-gradient-to-b from-[rgba(10,11,15,0.55)] to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 items-center justify-between gap-3 px-[18px] md:h-[74px]">
        <Link href="#home" aria-label="Remix Wardrobe - home" className="flex items-center gap-2.5">
          <Image
            src="/img/logo.jpg"
            alt="Logo Remix Wardrobe"
            width={74}
            height={52}
            priority
            className="h-11 w-auto rounded-[3px] shadow-[0_2px_6px_rgba(0,0,0,0.5)] transition-[height] duration-300 md:h-[52px]"
          />
          <span className="font-bebas text-[1.6rem] leading-none tracking-[0.04em] text-cream">
            Remix
            <br />
            Wardrobe
          </span>
        </Link>

        <nav aria-label="Navigazione principale" className="hidden gap-[22px] md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-bebas text-[1.25rem] tracking-[0.05em] text-cream hover:text-yellow"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            className="icon-btn relative grid h-11 w-11 place-items-center"
            aria-label="Apri il carrello"
            onClick={openCart}
          >
            <CartIcon />
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span
                  key={cart.length}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: [1.25, 1], opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute top-[3px] right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-yellow px-[5px] font-bebas text-[0.95rem] leading-none text-dark"
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            className="icon-btn grid h-11 w-11 place-items-center md:hidden"
            aria-label="Apri il menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Menu mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-[#2a2e3b] bg-dark2 md:hidden"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block border-t border-[#2a2e3b] px-[18px] py-3.5 font-bebas text-[1.5rem] tracking-[0.05em] text-cream"
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px] text-cream">
      <path d="M6 7h12l-1 13H7L6 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-[26px] w-[26px] text-cream">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
