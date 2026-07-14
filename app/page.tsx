import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/sections/Hero";
import { Solutions } from "./components/sections/Solutions";
import { FeaturedProduct } from "./components/sections/FeaturedProduct";
import { Technology } from "./components/sections/Technology";
import { Clients } from "./components/sections/Clients";
import { CTA } from "./components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <FeaturedProduct />
        <Technology />
        <Clients />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
