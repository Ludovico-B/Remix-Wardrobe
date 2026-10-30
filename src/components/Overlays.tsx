"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "@/lib/shop";
import ProductModal from "./ProductModal";
import CheckoutModal from "./CheckoutModal";
import { CartDrawer } from "./CartDrawer";

export default function Overlays() {
  const { drawerOpen, productId, checkoutOpen, closeAll, toastMsg } = useShop();
  const somethingOpen = drawerOpen || productId !== null || checkoutOpen;

  return (
    <>
      <AnimatePresence>
        {somethingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[rgba(5,6,10,0.72)]"
            onClick={closeAll}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <CartDrawer />

      <AnimatePresence>{productId && <ProductModal />}</AnimatePresence>
      <AnimatePresence>{checkoutOpen && <CheckoutModal />}</AnimatePresence>

      {/* Toast */}
      <div
        className={`fixed top-20 left-1/2 z-[90] -translate-x-1/2 ${toastMsg ? "visible" : "invisible"}`}
        role="status"
        aria-live="polite"
      >
        <span
          className={`tape inline-block bg-yellow font-bebas text-[1.3rem] tracking-[0.04em] whitespace-nowrap text-dark shadow-[4px_4px_0_rgba(0,0,0,0.5)] ${
            toastMsg ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"
          } transition-[transform,opacity] duration-300`}
        >
          {toastMsg}
        </span>
      </div>
    </>
  );
}
