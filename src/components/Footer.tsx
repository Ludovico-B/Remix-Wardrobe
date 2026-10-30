"use client";

import Image from "next/image";
import Link from "next/link";
import { INSTAGRAM_URL, VINTED_URL } from "@/lib/products";
import { useShop } from "@/lib/shop";

export default function Footer() {
  const { toast } = useShop();

  const legal = (label: string) => (
    <button key={label} onClick={() => toast("Pagina legale da creare")} className="text-left text-cream hover:text-yellow">
      {label}
    </button>
  );

  return (
    <footer className="bg-[#0c0d12] pt-10 pb-[calc(28px+env(safe-area-inset-bottom))] text-[0.92rem] text-muted">
      <div className="mx-auto max-w-[1200px] px-[18px]">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/img/logo.jpg"
              alt="Remix Wardrobe"
              width={110}
              height={78}
              loading="lazy"
              className="mb-2.5 h-auto w-[110px]"
            />
            <p>Capi originali di seconda mano, foto reali.</p>
          </div>
          <div>
            <h4 className="mb-1.5 font-bebas text-[1.3rem] tracking-[0.05em] text-cream">Negozio</h4>
            <FooterList>
              <li><Link href="#catalogo">Catalogo</Link></li>
              <li><Link href="#marchi">Marchi</Link></li>
              <li><Link href="#chi-siamo">Chi siamo</Link></li>
            </FooterList>
          </div>
          <div>
            <h4 className="mb-1.5 font-bebas text-[1.3rem] tracking-[0.05em] text-cream">Aiuto</h4>
            <FooterList>
              <li><Link href="#spedizioni">Spedizioni e resi</Link></li>
              <li><Link href="#contatti">Contatti</Link></li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram</a>
              </li>
              <li>
                {VINTED_URL ? (
                  <a href={VINTED_URL} target="_blank" rel="noopener">Vinted</a>
                ) : (
                  <button onClick={() => toast("Link Vinted in arrivo dal 31 ottobre!")} className="text-cream hover:text-yellow">
                    Vinted (link in arrivo)
                  </button>
                )}
              </li>
            </FooterList>
          </div>
          <div>
            <h4 className="mb-1.5 font-bebas text-[1.3rem] tracking-[0.05em] text-cream">Note legali</h4>
            <FooterList>
              <li>{legal("Privacy Policy")}</li>
              <li>{legal("Cookie Policy")}</li>
              <li>{legal("Condizioni di vendita")}</li>
            </FooterList>
          </div>
        </div>
        <div className="mt-[26px] flex flex-wrap justify-between gap-2 gap-x-5 border-t border-[#23263a] pt-4 text-[0.82rem]">
          <span>© 2026 Remix Wardrobe · P.IVA [da inserire, se applicabile]</span>
          <span>Sito prototipo · pagamenti non attivi</span>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ children }: { children: React.ReactNode }) {
  return <ul className="grid list-none gap-1 text-cream">{children}</ul>;
}
