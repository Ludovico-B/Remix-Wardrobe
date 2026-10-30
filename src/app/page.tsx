import Brands from "@/components/Brands";
import Catalog from "@/components/Catalog";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Shipping from "@/components/Shipping";
import Social from "@/components/Social";

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Catalog />
      <About />
      <Shipping />
      <Social />
    </main>
  );
}
