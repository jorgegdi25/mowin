import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/sections/Hero";
import { Solutions } from "./components/sections/Solutions";
import { FeaturedProduct } from "./components/sections/FeaturedProduct";
import { Technology } from "./components/sections/Technology";
import { Clients } from "./components/sections/Clients";
import { CTA } from "./components/sections/CTA";
import { client } from "../sanity/lib/client";
import { productsQuery } from "../sanity/lib/queries";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  let sanityProducts = [];
  try {
    if (client.config().projectId !== 'quc3ruz6') {
      sanityProducts = await client.fetch(productsQuery);
    }
  } catch (err) {
    console.error("Error fetching Sanity products", err);
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <FeaturedProduct sanityProducts={sanityProducts} />
        <Technology />
        <Clients />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
