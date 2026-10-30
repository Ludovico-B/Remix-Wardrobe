"use client";

import { useState } from "react";
import { INSTAGRAM_URL, fmt } from "@/lib/products";
import { useShop } from "@/lib/shop";
import { ModalShell } from "./ProductModal";
import { cartTotal, useCartItems } from "./CartDrawer";

export default function CheckoutModal() {
  const { checkoutOpen, closeAll } = useShop();
  const items = useCartItems();
  const [done, setDone] = useState(false);

  if (!checkoutOpen) return null;

  const t = cartTotal(items);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputs = [...form.querySelectorAll<HTMLInputElement>("[required]")];
    const bad = inputs.filter((i) => !i.value.trim());
    inputs.forEach((i) => (i.style.borderColor = ""));
    if (bad.length) {
      bad.forEach((i) => (i.style.borderColor = "var(--color-red)"));
      bad[0].focus();
      return;
    }
    setDone(true);
  };

  return (
    <ModalShell onClose={closeAll}>
      {done ? (
        <div className="py-5 text-center">
          <span className="tape -rotate-2 mb-3.5 inline-block bg-yellow font-bebas text-[2rem] text-dark">
            Grazie!
          </span>
          <h2 className="font-bebas text-cream">Ordine di prova completato</h2>
          <p className="mx-auto mb-[18px] max-w-[30em] text-[#d6cdbb]">
            Questa era solo una simulazione: nessun ordine è stato inviato e nessun
            pagamento è stato effettuato. Quando lo shop sarà attivo potrai
            acquistare direttamente da qui.
          </p>
          <a className="btn btn-r" href={INSTAGRAM_URL} target="_blank" rel="noopener">
            Scrivici su Instagram
          </a>
        </div>
      ) : (
        <div className="p-[18px] pt-[24px] pb-[28px] md:p-[34px]">
          <h2 className="mb-3 flex items-center gap-3 font-bebas text-[2.4rem] leading-none text-cream">
            Checkout
            <span className="tape bg-red text-white text-[1.2rem]">Demo</span>
          </h2>
          <div className="mb-[18px] border-2 border-yellow bg-[#FFC42518] p-3.5 text-[#fff3cf]">
            <strong className="mb-1 block font-bebas text-[1.4rem] leading-[1.1] tracking-[0.04em] text-yellow">
              ⚠ Pagamenti non ancora attivi
            </strong>
            Questo è un prototipo: nessun pagamento verrà effettuato e{" "}
            <u>non chiediamo né salviamo dati di carte di credito</u>. Per acquistare
            ora un capo scrivici su Instagram{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="text-yellow">
              @remix.wardrobe
            </a>{" "}
            o cercaci su Vinted.
          </div>
          <div className="grid gap-[22px] md:grid-cols-[1.2fr_1fr]">
            <form className="grid gap-3" onSubmit={onSubmit} noValidate>
              <h3 className="mb-2 font-bebas text-[1.4rem] tracking-[0.04em] text-cream">
                Dati di spedizione
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Nome" name="nome" required />
                <Field label="Cognome" name="cognome" required />
              </div>
              <Field label="Email" name="email" type="email" required />
              <Field label="Indirizzo" name="indirizzo" required />
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="CAP" name="cap" inputMode="numeric" required />
                <Field label="Città" name="citta" required />
              </div>
              <label className="grid gap-1 text-[0.88rem] text-muted">
                Note (facoltative)
                <textarea
                  name="note"
                  rows={2}
                  className="w-full border-[1.5px] border-[#3a3f50] bg-[#0f1117] px-3 py-2.5 font-oswald text-[1rem] text-ink focus:outline-2 focus:outline-offset-1 focus:outline-yellow"
                />
              </label>
              <h3 className="mt-1.5 font-bebas text-[1.4rem] tracking-[0.04em] text-cream">
                Pagamento
              </h3>
              <div className="border-[1.5px] border-dashed border-[#555b6e] p-3.5 text-center text-[0.92rem] text-muted">
                💳 Metodi di pagamento in arrivo (es. carta, PayPal).
                <br />
                Nessun dato di pagamento viene richiesto in questa demo.
              </div>
              <button type="submit" className="btn btn-y w-full">
                Conferma ordine (demo)
              </button>
              <p className="text-[0.8rem] text-muted">
                I dati inseriti restano nel tuo browser e non vengono inviati a nessuno.
              </p>
            </form>

            <div className="h-fit border border-[#2f3342] bg-[#171a23] px-4 py-3.5">
              <h3 className="mb-2 font-bebas text-[1.4rem] tracking-[0.04em] text-cream">
                Riepilogo ordine
              </h3>
              {items.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between gap-2.5 border-b border-dashed border-[#2f3342] py-1.5 text-[0.92rem]"
                >
                  <span>
                    {p.name} · {p.size}
                  </span>
                  <span>{p.price == null ? "€ —" : fmt(p.price)}</span>
                </div>
              ))}
              <div className="flex justify-between gap-2.5 border-b border-dashed border-[#2f3342] py-1.5 text-[0.92rem]">
                <span>Spedizione</span>
                <span>€ — (da definire)</span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between font-bebas text-[1.6rem] tracking-[0.03em] text-cream">
                <span>Totale</span>
                <span>{t.label}</span>
              </div>
              {t.unknown && <p className="text-[0.82rem] text-muted">Prezzi ancora da definire.</p>}
            </div>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  inputMode?: "numeric";
}) {
  return (
    <label className="grid gap-1 text-[0.88rem] text-muted">
      {label}
      <input
        name={name}
        type={type}
        inputMode={inputMode}
        required={required}
        className="w-full border-[1.5px] border-[#3a3f50] bg-[#0f1117] px-3 py-2.5 font-oswald text-[1rem] text-ink focus:outline-2 focus:outline-offset-1 focus:outline-yellow"
      />
    </label>
  );
}
