import Loader from "@/components/Loader";
import LoaderDrawing from "@/components/LoaderDrawing";
import ScrollUI from "@/components/ScrollUI";
import Grain from "@/components/Grain";
import ContextCursor from "@/components/ContextCursor";
import CommandPalette from "@/components/CommandPalette";
import Toast from "@/components/Toast";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Ledger from "@/components/Ledger";
import Flagship from "@/components/Flagship";
import WorkStack from "@/components/WorkStack";
import AlsoBuilt from "@/components/AlsoBuilt";
import Claims from "@/components/Claims";
import Background from "@/components/Background";
import Method from "@/components/Method";
import Footer from "@/components/Footer";
import Workbench from "@/components/marginalia/Workbench";
import References from "@/components/marginalia/References";

export default function Home() {
  return (
    <>
      <Loader>
        <LoaderDrawing />
      </Loader>
      <Grain />
      <ContextCursor />
      <CommandPalette />
      <Toast />
      <ScrollUI />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Workbench />
        <Ledger />
        <section id="work" data-anno="<section #work> · Flagship, WorkStack (position: sticky), AlsoBuilt" className="relative px-page py-[clamp(90px,14vh,160px)]">
          <Flagship />
          <WorkStack />
          <AlsoBuilt />
        </section>
        <Claims />
        <Background />
        <Method />
        <References />
      </main>
      <Footer />
    </>
  );
}
