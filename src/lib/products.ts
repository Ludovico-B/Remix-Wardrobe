/* =====================================================================
   PRODOTTI — modifica qui!
   - price: prezzo in euro (es. 45 o 39.90). Lascia null se non è ancora
     definito → verrà mostrato "Prezzo da definire".
   - images: percorsi delle foto in public/img (la prima è la copertina).
   - sold: true per segnare il capo come venduto.
   - vinted: link all'annuncio Vinted (facoltativo).
   ===================================================================== */

export type Product = {
  id: string;
  brand: string;
  name: string;
  category: string;
  size: string;
  price: number | null;
  condition: string;
  description: string;
  images: string[];
  sold: boolean;
  vinted: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "carhartt-sherpa-xxl",
    brand: "Carhartt",
    name: "Giacca Carhartt con fodera sherpa",
    category: "Giacche",
    size: "XXL",
    price: null,
    condition: "Da definire",
    description:
      "Giacca Carhartt originale con interno in sherpa, taglia XXL. [Aggiungi colore, condizioni, misure e eventuali difetti.]",
    images: ["img/carhartt-sherpa-1.jpg"],
    sold: false,
    vinted: "",
  },
  {
    id: "lacoste-puffer-mixmatch",
    brand: "Lacoste",
    name: "Piumino Lacoste “Mix & Match”",
    category: "Piumini",
    size: "FR 52 / US M/L",
    price: null,
    condition: "Da definire",
    description:
      "Piumino trapuntato Lacoste della linea Mix & Match, blu navy, con coccodrillo verde sul petto. Taglia FR 52 (US M/L). Nelle foto trovi le misure prese con il metro. [Aggiungi condizioni e misure in cm.]",
    images: [
      "img/lacoste-puffer-1.jpg",
      "img/lacoste-puffer-2.jpg",
      "img/lacoste-puffer-3.jpg",
      "img/lacoste-puffer-etichetta.jpg",
    ],
    sold: false,
    vinted: "",
  },
];

/* Card "Prossimamente": nessuna foto, solo segnaposto. */
export const COMING_SOON = [
  { brand: "Dickies", tape: "t-navy" },
  { brand: "Ralph Lauren", tape: "t-cream" },
] as const;

/* Link Vinted: inserisci qui l'URL del profilo quando è online */
export const VINTED_URL = "";

export const CART_KEY = "remixwardrobe_cart_v1";

export const INSTAGRAM_URL = "https://instagram.com/remix.wardrobe";

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id);

/* Formatta un prezzo in euro alla italiana, oppure "€ —" se non definito */
export const fmt = (price: number | null | undefined | string) =>
  price === null || price === undefined || price === ""
    ? "€ —"
    : "€ " +
      Number(price).toLocaleString("it-IT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
