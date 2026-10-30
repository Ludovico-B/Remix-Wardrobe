"use client";

import { motion, useReducedMotion } from "framer-motion";

const INFO = [
  {
    title: "Spedizioni",
    body: (
      <ul className="mt-1.5 list-disc pl-[1.1em]">
        <li>Spedizione in tutta Italia con corriere tracciato [corriere da definire].</li>
        <li>
          Costo spedizione: <strong>€ [da definire]</strong>.
        </li>
        <li>Tempi di consegna indicativi: [X–Y] giorni lavorativi.</li>
        <li>Spedizione entro [X] giorni lavorativi dall&apos;ordine.</li>
      </ul>
    ),
  },
  {
    title: "Resi e rimborsi",
    body: (
      <ul className="mt-1.5 list-disc pl-[1.1em]">
        <li>
          Diritto di recesso entro 14 giorni dalla consegna, come previsto dal
          Codice del Consumo [verificare con un consulente].
        </li>
        <li>Il capo deve essere restituito nelle stesse condizioni in cui è stato ricevuto.</li>
        <li>Costi di reso: [a carico di chi? da definire].</li>
        <li>Rimborso entro [X] giorni dalla ricezione del reso.</li>
      </ul>
    ),
  },
  {
    title: "Condizioni dei capi",
    body: (
      <p>
        Tutti i capi sono usati e originali. Eventuali difetti o segni di usura sono
        indicati nella scheda prodotto e visibili nelle foto. [Aggiungi qui la tua
        scala di valutazione, es. Ottimo / Buono / Discreto.]
      </p>
    ),
  },
  {
    title: "Pagamenti",
    body: (
      <p>
        I pagamenti online <strong>non sono ancora attivi</strong>. Per ora puoi
        acquistare su Vinted o scriverci su Instagram. [Metodi di pagamento da
        definire.]
      </p>
    ),
  },
];

export default function Shipping() {
  const reduce = useReducedMotion();
  const fade = {
    initial: reduce ? undefined : { opacity: 0, y: 26 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7 },
  };

  return (
    <section id="spedizioni" className="py-14 md:py-20">
      <motion.div {...fade} className="mx-auto max-w-[1200px] px-[18px]">
        <h2 className="sec-title">Spedizioni e resi</h2>
        <p className="mb-[26px] text-[1.05rem] text-muted">
          Informazioni generiche.{" "}
          <strong className="text-yellow">
            Tutti i testi qui sotto sono segnaposto da modificare
          </strong>{" "}
          prima della messa online.
        </p>
        <div className="grid gap-[18px] md:grid-cols-2">
          {INFO.map((info) => (
            <div key={info.title} className="relative border border-[#2a2e3b] bg-dark2 px-5 py-[22px]">
              <span className="edit-note">Da modificare</span>
              <h3 className="mb-1.5 font-bebas text-[1.8rem] tracking-[0.03em] text-cream">
                {info.title}
              </h3>
              <div className="text-[1rem] text-[#d6cdbb]">{info.body}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
