import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GuideIndex from "@/components/guide/GuideIndex";
import PostDining from "@/components/guide/PostDining";
import PostCorporate from "@/components/guide/PostCorporate";
import PostAirport from "@/components/guide/PostAirport";

export const metadata: Metadata = {
  title: "Blog & Local Guide \u2014 Brookside Motel, Rolleston",
  description:
    "Where to eat in Rolleston, why it is the smart base for corporate travellers, and how to plan a stress-free Christchurch Airport stopover.",
  openGraph: {
    title: "Blog & Local Guide \u2014 Brookside Motel, Rolleston",
    description:
      "Where to eat in Rolleston, why it is the smart base for corporate travellers, and how to plan a stress-free Christchurch Airport stopover.",
    url: "/local-guide",
  },
};

export default function LocalGuidePage() {
  return (
    <>
      <PageHero
        src="/images/local-guide-hero.jpg"
        alt="Canterbury countryside near Rolleston"
        placeholderLabel="Canterbury / Rolleston"
        placeholderSub="Landscape · 21:9"
        crumb="Local Guide"
        title="Blog & Local Guide"
        sub="Where to eat, how to travel, and how to make the most of Rolleston and the wider Selwyn District."
      />

      <section className="section bg-cream">
        <div className="wrap">
          <GuideIndex />
          <PostDining />
          <PostCorporate />
          <PostAirport />
        </div>
      </section>
    </>
  );
}
