"use client";

import { motion, useReducedMotion } from "framer-motion";
import { INSTAGRAM_URL, PRODUCTS, COMING_SOON } from "@/lib/products";
import { useShop } from "@/lib/shop";
import ProductCard, { ComingSoonCard } from "./ProductCard";

const uniq = (key: "brand" | "size" | "category") =>
  [...new Set(PRODUCTS.map((p) => p[key]))].sort();

const ALL_BRANDS = [...new Set(["Carhartt", "Dickies", "Ralph Lauren", "Lacoste", ...uniq("brand")])];

function Select({
  name,
  label,
  values,
  placeholder,
}: {
  name: string;
  label: string;
  values: string[];
  placeholder: string;
}) {
  const { filters, setFilters } = useShop();
  const value = filters[name as keyof typeof filters];
  return (
    <label className="block">
      <span className="block font-bebas text-[1.05rem] tracking-[0.06em] text-yellow">
        {label}
        <select
          value={value}
          onChange={(e) => setFilters({ [name]: e.target.value })}
          className="w-full appearance-none border-[1.5px] border-[#3a3f50] bg-dark2 bg-no-repeat px-3 py-2.5 pr-9 font-oswald text-[1rem] text-ink accent-transparent focus:outline-2 focus:outline-offset-1 focus:outline-yellow [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%278%27%3E%3Cpath%20d=%27M1%201l5%205%205-5%27%20stroke=%27%23d9c7a3%27%20stroke-width=%272%27%20fill=%27none%27/%3E%3C/svg%3E')] [background-position:right_12px_center]"
        >
          <option value="">{placeholder}</option>
          {values.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

export default function Catalog() {
  const { filters, setFilters, cart } = useShop();
  void cart;
  const reduce = useReducedMotion();

  const list = PRODUCTS.filter(
    (p) =>
      (!filters.brand || p.brand === filters.brand) &&
      (!filters.size || p.size === filters.size) &&
      (!filters.category || p.category === filters.category)
  );

  const showSoon = !filters.size && !filters.category;
  const soon = COMING_SOON.filter((x) => !filters.brand || x.brand === filters.brand);

  const count =
    list.length === 0
      ? "Nessun capo disponibile al momento"
      : list.length === 1
        ? "1 capo disponibile"
        : `${list.length} capi disponibili`;

  return (
    <section id="catalogo" className="py-14 md:py-20">
      <div className="mx-auto max-w-[1200px] px-[18px]">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 26 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="sec-title">Catalogo</h2>
          <p className="mb-[26px] text-[1.05rem] text-muted">
            Ogni capo è disponibile in un solo pezzo. Quando è venduto, è venduto.
          </p>

          <div className="mb-[22px] grid grid-cols-2 items-end gap-2.5 md:grid-cols-[1fr_1fr_1fr_auto]">
            <Select name="brand" label="Marchio" values={ALL_BRANDS} placeholder="Tutti i marchi" />
            <Select name="size" label="Taglia" values={uniq("size")} placeholder="Tutte le taglie" />
            <Select
              name="category"
              label="Categoria"
              values={uniq("category")}
              placeholder="Tutte le categorie"
            />
            <button
              className="justify-self-center text-[0.95rem] text-cream underline max-md:col-start-2 max-md:mt-3"
              onClick={() => setFilters({ brand: "", size: "", category: "" })}
            >
              Azzera filtri
            </button>
          </div>

          <p className="mb-3 text-[0.95rem] text-muted">{count}</p>

          <motion.div layout className="grid grid-cols-2 gap-3.5 md:grid-cols-4 md:gap-[22px]">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
            {showSoon &&
              soon.map((x) => <ComingSoonCard key={x.brand} x={x} />)}
          </motion.div>

          {list.length === 0 && (
            <div className="col-span-full py-10 text-center text-muted">
              Nessun capo disponibile con questi filtri… per ora! Nuovi arrivi in
              arrivo su{" "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="text-yellow">
                @remix.wardrobe
              </a>
              .
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
