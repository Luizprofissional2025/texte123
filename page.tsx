import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowToFindUs from "@/components/HowToFindUs";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadPopup from "@/components/LeadPopup";

/**
 * Página única (landing page). A ordem dos componentes abaixo É a ordem
 * das seções na tela — para reorganizar a página (ex: colocar "Serviços"
 * antes de "Como nos encontrar"), basta mudar a ordem das linhas aqui.
 *
 * Este arquivo não tem "use client": ele e a maior parte dos componentes
 * que importa são renderizados no servidor. Só os poucos componentes que
 * realmente precisam (Header, LeadPopup) têm sua própria diretiva
 * "use client" no topo do arquivo deles.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowToFindUs />
        <Services />
        <Differentials />
        <FinalCTA />
      </main>
      <Footer />

      {/* Elementos fixos, sempre por cima do conteúdo da página */}
      <WhatsAppButton />
      <LeadPopup />
    </>
  );
}
