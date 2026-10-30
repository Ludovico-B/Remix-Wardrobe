"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { byId, CART_KEY } from "./products";

type Filters = { brand: string; size: string; category: string };

type ShopContextValue = {
  /* Carrello */
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  /* Drawer carrello */
  drawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  /* Filtri catalogo */
  filters: Filters;
  setBrandFilter: (brand: string) => void;
  setFilters: (f: Partial<Filters>) => void;
  /* Overlay prodotti / checkout */
  productId: string | null;
  openProduct: (id: string) => void;
  checkoutOpen: boolean;
  openCheckout: () => void;
  closeAll: () => void;
  /* Toast */
  toastMsg: string;
  toast: (msg: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop deve essere usato dentro <ShopProvider>");
  return ctx;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [filters, setFiltersState] = useState<Filters>({ brand: "", size: "", category: "" });
  const [toastMsg, setToastMsg] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- Carrello (localStorage) ---------- */

  /* Carica il carrello al primo render (lato client) */
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- caricamento iniziale da localStorage, sicuro per l'idratazione
      setCart(Array.isArray(raw) ? raw.filter((id) => byId(id)) : []);
    } catch {
      setCart([]);
    }
  }, []);

  /* Persistenza su ogni cambio */
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  /* Sync tra schede aperte */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== CART_KEY) return;
      try {
        const raw = JSON.parse(e.newValue ?? "[]");
        setCart(Array.isArray(raw) ? raw.filter((id) => byId(id)) : []);
      } catch {
        setCart([]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 2200);
  }, []);

  const addToCart = useCallback(
    (id: string) => {
      setCart((c) => {
        if (c.includes(id)) {
          setDrawerOpen(true);
          toast("Già nel carrello: è un pezzo unico");
          return c;
        }
        toast("Aggiunto al carrello ✓");
        return [...c, id];
      });
    },
    [toast]
  );

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((c) => c.filter((x) => x !== id));
      toast("Rimosso dal carrello");
    },
    [toast]
  );

  /* ---------- Overlay ---------- */

  const closeAll = useCallback(() => {
    setDrawerOpen(false);
    setProductId(null);
    setCheckoutOpen(false);
    if (typeof window !== "undefined" && location.hash.startsWith("#p/")) {
      history.replaceState(null, "", location.pathname);
    }
  }, []);

  const openProduct = useCallback(
    (id: string) => {
      if (!byId(id)) return;
      setDrawerOpen(false);
      setCheckoutOpen(false);
      setProductId(id);
      history.replaceState(null, "", `#p/${id}`);
    },
    []
  );

  const openCheckout = useCallback(() => {
    setDrawerOpen(false);
    setProductId(null);
    setCheckoutOpen(true);
  }, []);

  const openCart = useCallback(() => {
    setProductId(null);
    setCheckoutOpen(false);
    setDrawerOpen(true);
  }, []);

  const closeCart = useCallback(() => setDrawerOpen(false), []);

  /* ESC chiude tutto */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  /* Blocca lo scroll della pagina quando un overlay è aperto */
  const overlayOpen = drawerOpen || productId !== null || checkoutOpen;
  useEffect(() => {
    document.body.classList.toggle("lock", overlayOpen);
    return () => document.body.classList.remove("lock");
  }, [overlayOpen]);

  /* ---------- Filtri catalogo ---------- */

  const setBrandFilter = useCallback((brand: string) => {
    setFiltersState({ brand, size: "", category: "" });
    document.getElementById("catalogo")?.scrollIntoView();
  }, []);

  const setFilters = useCallback((f: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...f }));
  }, []);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      drawerOpen,
      openCart,
      closeCart,
      filters,
      setBrandFilter,
      setFilters,
      productId,
      openProduct,
      checkoutOpen,
      openCheckout,
      closeAll,
      toastMsg,
      toast,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      drawerOpen,
      openCart,
      closeCart,
      filters,
      setBrandFilter,
      setFilters,
      productId,
      openProduct,
      checkoutOpen,
      openCheckout,
      closeAll,
      toastMsg,
      toast,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
