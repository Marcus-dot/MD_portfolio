import Loader from "@/components/Loader";
import ScrollUI from "@/components/ScrollUI";
import Grain from "@/components/Grain";
import ContextCursor from "@/components/ContextCursor";
import Spotlight from "@/components/Spotlight";
import CommandPalette from "@/components/CommandPalette";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import Flagship from "@/components/Flagship";
import WorkStack from "@/components/WorkStack";
import Claims from "@/components/Claims";
import Method from "@/components/Method";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Grain />
      <ContextCursor />
      <Spotlight />
      <CommandPalette />
      <ScrollUI />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Marquee />
        <section id="work" className="px-page py-[clamp(90px,14vh,160px)]">
          <Flagship />
          <WorkStack />
        </section>
        <Claims />
        <Method />
      </main>
      <Footer />
    </>
  );
}
