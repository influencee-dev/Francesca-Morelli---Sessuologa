import React, { useState, useEffect } from "react";
import {
  Heart,
  Shield,
  Compass,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Calendar,
  Lock,
  ChevronUp,
  Instagram
} from "lucide-react";
import { motion } from "motion/react";

import Header from "./components/Header";
import ImagePlaceholder from "./components/ImagePlaceholder";
import ContactForm from "./components/ContactForm";
import PrivacyBanner from "./components/PrivacyBanner";

import {
  CHI_SONO_PARAGRAPHS,
  COSA_FACCIO_SECTION_1,
  COSA_FACCIO_SECTION_2,
  COSA_FACCIO_CONCETTI,
  SERVIZI,
  PRINCIPI_APPROCCIO,
  TEMI_EDUCAZIONE
} from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedService, setSelectedService] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heroImgErr, setHeroImgErr] = useState(false);
  const [aboutImgErr, setAboutImgErr] = useState(false);

  // Monitor scroll to highlight current section in navigation and show Back-to-Top Button
  useEffect(() => {
    const handleScroll = () => {
      // Back to top visibility
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Intersection logic for active nav highlight
      const sections = ["hero", "chi-sono", "cosa-faccio", "servizi", "contatti"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServiceInquiry = (serviceId: string) => {
    // Find service label/value matching form definition
    setSelectedService(serviceId);
    scrollToSection("main-contact-form");
  };

  return (
    <div className="min-h-screen bg-warm-cream/40 flex flex-col antialiased selection:bg-pale-pink selection:text-terracotta">
      {/* 1. Header Navigation */}
      <Header onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Container */}
      <main className="flex-grow pt-20">
        
        {/* 2. Hero Section */}
        <section
          id="hero"
          className="relative min-h-[85vh] flex items-center justify-center py-12 md:py-20 lg:py-24 overflow-hidden border-b border-warm-beige/30"
        >
          {/* Gentle warm background circle decorations */}
          <div className="absolute top-[10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-pale-pink/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-warm-beige/30 blur-3xl pointer-events-none animate-pulse duration-10000" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Hero Left Copy */}
              <div className="lg:col-span-7 space-y-7 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF0ED] text-terracotta text-xs font-semibold tracking-wide border border-terracotta/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-ping" />
                  Su appuntamento in studio a Foggia e Online
                </div>

                {/* Main H1 Title - Sole H1 on page for SEO */}
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight text-charcoal leading-[1.12]">
                  Uno spazio di ascolto <br />
                  <span className="text-terracotta">per il tuo benessere</span> <br />
                  relazionale e sessuale
                </h1>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-charcoal-light max-w-xl leading-relaxed">
                  Percorsi individuali, di coppia e di educazione alla sessualità costruiti nel rispetto della tua storia, dei tuoi bisogni e dei tuoi tempi.
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                  <button
                    onClick={() => scrollToSection("main-contact-form")}
                    className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="w-4.5 h-4.5" />
                    Prenota un primo incontro
                  </button>
                  <button
                    onClick={() => scrollToSection("servizi")}
                    className="inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-charcoal border border-warm-beige text-sm font-semibold px-6 py-3.5 rounded-full transition-all shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer"
                  >
                    Scopri i percorsi
                    <ArrowRight className="w-4 h-4 text-terracotta" />
                  </button>
                </div>

                {/* Reassurance text */}
                <div className="flex items-center gap-2.5 text-xs text-charcoal-light/90 pt-3">
                  <Shield className="w-4 h-4 text-terracotta" />
                  <span>Uno spazio professionale, riservato e privo di giudizio.</span>
                </div>
              </div>

              {/* Hero Right Frame with profilo.png and elegant frame */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                {!heroImgErr ? (
                  <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm border border-warm-beige bg-white transform rotate-1 hover:rotate-0 transition-all duration-500">
                    <img
                      src="profilo.png"
                      alt="Dott.ssa Francesca Morelli"
                      className="w-full h-full object-cover"
                      onError={() => setHeroImgErr(true)}
                    />
                  </div>
                ) : (
                  <ImagePlaceholder
                    label="Francesca Morelli"
                    className="w-full max-w-[340px] aspect-[4/5] rounded-[2rem] shadow-sm transform rotate-1 hover:rotate-0 transition-all duration-500"
                  />
                )}
              </div>

            </div>
          </div>
        </section>

        {/* 3. Sezione Chi Sono */}
        <section
          id="chi-sono"
          className="py-16 md:py-24 bg-white/70 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Photograph Frame for Francesca Morelli - profilo2.png */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
                <div className="relative w-full max-w-[320px]">
                  {/* Stylized background decorative aura */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-warm-beige to-pale-pink opacity-50 blur-xl rounded-[2.5rem]" />
                  {!aboutImgErr ? (
                    <div className="relative z-10 w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-warm-beige bg-white hover:scale-[1.02] transition-transform duration-500">
                      <img
                        src="profilo2.png"
                        alt="Francesca Morelli Studio"
                        className="w-full h-full object-cover"
                        onError={() => setAboutImgErr(true)}
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder
                      label="Dott.ssa Morelli Studio"
                      className="relative z-10 w-full aspect-[3/4] rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-500"
                    />
                  )}
                </div>
              </div>

              {/* Copywriting Details */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#A66555] uppercase block mb-2">
                    Incontra la Professionista
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal tracking-tight">
                    Chi sono
                  </h2>
                </div>

                <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-charcoal-light text-justify">
                  {CHI_SONO_PARAGRAPHS.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Key Concepts highlighted as delicate badges */}
                <div className="pt-4">
                  <span className="text-xs font-semibold text-charcoal-light block mb-3">
                    Elementi fondanti della mia pratica professionale:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {["Ascolto attento", "Riservatezza assoluta", "Empatia e cura", "Percorsi personalizzati"].map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-warm-panna/60 border border-warm-beige text-xs text-charcoal font-medium hover:bg-pale-pink/50 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-terracotta" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Sezione Cosa Faccio */}
        <section
          id="cosa-faccio"
          className="py-16 md:py-24 bg-warm-cream/20 border-t border-b border-warm-beige/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-[#A66555] uppercase block mb-2">
                Le aree d'intervento
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal tracking-tight">
                Cosa faccio
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Concept grid panel left */}
              <div className="lg:col-span-7 space-y-6 text-sm md:text-[15px] leading-relaxed text-charcoal-light text-justify">
                {COSA_FACCIO_SECTION_1.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
                
                <div className="p-5 my-6 rounded-2xl bg-white border border-warm-beige/60 shadow-sm leading-relaxed space-y-1.5">
                  <h4 className="font-display font-bold text-sm text-charcoal">
                    Consulenze dedicate a temi specifici:
                  </h4>
                  <p className="text-xs text-charcoal-light">
                    Difficoltà comunicative, gestione dell'intimità di coppia, calo del desiderio, dubbi sulla prima sessualità, consapevolezza del corpo, supporto ai cambiamenti personali (es. maternità, menopausa, relazioni).
                  </p>
                </div>

                {COSA_FACCIO_SECTION_2.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Concepts badge card on the right */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-warm-beige rounded-2xl p-6 md:p-8 shadow-sm relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pale-pink/30 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-6 z-10">
                  <h3 className="font-display font-bold text-lg text-charcoal mb-4">
                    Il mio approccio clinico ed educativo
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {COSA_FACCIO_CONCETTI.map((item, idx) => (
                      <div key={idx} className="flex gap-3.5 items-start">
                        <div className="p-1 rounded bg-pale-pink/80 text-terracotta block shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-xs text-charcoal">{item.title}</h4>
                          <p className="text-xs text-charcoal-light mt-0.5">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA end section */}
                <div className="pt-8 border-t border-warm-beige/50 mt-8 space-y-4">
                  <p className="text-xs font-medium italic text-charcoal">
                    "Ogni percorso può iniziare da una prima conversazione."
                  </p>
                  <button
                    onClick={() => handleServiceInquiry("altro")}
                    className="w-full inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold py-3 px-4 rounded-full transition-all cursor-pointer"
                  >
                    Richiedi un primo confronto
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 5. Sezione Servizi */}
        <section
          id="servizi"
          className="py-16 md:py-24 bg-white/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold tracking-widest text-[#A66555] uppercase block">
                Proposte Cliniche ed Educative
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal tracking-tight">
                I percorsi e i servizi
              </h2>
              <div className="w-12 h-1 bg-terracotta mx-auto rounded-full my-4" />
              <p className="text-sm md:text-base text-charcoal-light max-w-xl mx-auto leading-relaxed">
                Ogni proposta viene adattata alle esigenze, agli obiettivi e ai tempi della persona o della coppia. Francesca riceve <strong>su appuntamento in studio e online</strong>.
              </p>
            </div>

            {/* 6 Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
              {SERVIZI.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-warm-beige hover:border-terracotta/40 rounded-2xl p-6.5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                  id={`service-card-${service.id}`}
                >
                  <div className="space-y-4">
                    {/* Badge Category */}
                    <span className="inline-block text-[10px] font-mono tracking-wider uppercase bg-mauve-light text-mauve px-2.5 py-1 rounded-full font-medium">
                      {service.category}
                    </span>
                    
                    <h3 className="font-display font-bold text-[17px] text-charcoal tracking-tight group-hover:text-terracotta transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-xs leading-relaxed text-charcoal-light text-justify">
                      {service.text}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-warm-panna flex items-center justify-between">
                    <button
                      onClick={() => handleServiceInquiry(service.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:text-terracotta-hover transition-colors cursor-pointer group-hover:underline"
                    >
                      Richiedi informazioni
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    
                    {/* Tiny secure lock */}
                    <div className="flex items-center gap-1 text-[10px] text-charcoal-light/50 font-mono">
                      <Lock className="w-3 h-3 text-mauve/40" />
                      Protetti
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. Sezione Il Mio Approccio */}
        <section
          id="approccio"
          className="py-16 md:py-24 bg-warm-panna/30 border-t border-b border-warm-beige/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-[#A66555] uppercase block mb-2">
                Le linee guida etiche e cliniche
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal tracking-tight">
                Un percorso costruito insieme
              </h2>
              <p className="text-xs text-charcoal-light mt-2">
                Quattro pilastri fondamentali messi a tutela della persona
              </p>
            </div>

            {/* 4 elements layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRINCIPI_APPROCCIO.map((item, idx) => {
                // Map string names to actual Lucide components
                const iconMap: Record<string, React.ReactNode> = {
                  Heart: <Heart className="w-5 h-5" />,
                  Shield: <Shield className="w-5 h-5" />,
                  Compass: <Compass className="w-5 h-5" />,
                  Sparkles: <Sparkles className="w-5 h-5 animate-pulse" />
                };

                return (
                  <div
                    key={idx}
                    className="p-5.5 bg-white border border-warm-beige rounded-2xl flex flex-col gap-3.5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-3 bg-pale-pink text-terracotta rounded-full w-fit">
                      {iconMap[item.iconName]}
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-charcoal mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[12px] leading-relaxed text-charcoal-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. Sezione Educazione e Formazione */}
        <section
          id="educazione"
          className="py-16 md:py-24 bg-white/70 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Copy left */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#A66555] uppercase block mb-2">
                    Cultura, scuole, associazioni
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal tracking-tight">
                    Educazione alla sessualità e formazione
                  </h2>
                </div>

                <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-charcoal-light text-justify">
                  <p>
                    L’educazione alla sessualità non riguarda soltanto la trasmissione di informazioni, ma la possibilità di sviluppare consapevolezza, rispetto, capacità di comunicazione e strumenti utili per costruire relazioni sane.
                  </p>
                  <p>
                    Francesca Morelli realizza incontri e percorsi formativi rivolti ad adolescenti, adulti, scuole, associazioni e realtà educative, adattando contenuti, linguaggio e modalità di intervento alle caratteristiche dei partecipanti.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleServiceInquiry("formazione-scuole")}
                    className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold px-5.5 py-3 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Richiedi informazioni per un progetto formativo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Themes grid right */}
              <div className="lg:col-span-5 bg-warm-panna/50 border border-warm-beige rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2 pb-3 border-b border-warm-beige">
                  <BookOpen className="w-5 h-5 text-terracotta" />
                  <h3 className="font-display font-bold text-sm text-charcoal tracking-tight">
                    I percorsi possono affrontare temi come:
                  </h3>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TEMI_EDUCAZIONE.map((temo, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs font-medium text-charcoal-light bg-white border border-warm-beige/35 p-2 rounded-lg"
                    >
                      <span className="w-1.5 h-1.5 bg-terracotta rounded-full block" />
                      {temo}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* 8. Call To Action Principale */}
        <section
          id="cta-principale"
          className="py-14 md:py-20 bg-gradient-to-br from-[#FAF0ED] to-warm-panna border-t border-b border-warm-beige relative overflow-hidden"
        >
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-pale-pink/50 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-7">
            <span className="w-10 h-10 bg-white shadow-sm border border-warm-beige flex items-center justify-center rounded-full mx-auto text-terracotta">
              <Heart className="w-5 h-5" />
            </span>
            
            <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-tight">
              Il primo passo può essere una conversazione
            </h2>
            
            <p className="text-sm md:text-base text-charcoal-light leading-relaxed max-w-2xl mx-auto">
              Che tu stia vivendo una difficoltà specifica o senta semplicemente il bisogno di comprenderti meglio, puoi richiedere un primo confronto professionale, riservato e privo di giudizio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
              {/* Local interactive Contact */}
              <button
                onClick={() => scrollToSection("main-contact-form")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4.5 h-4.5" />
                Richiedi un incontro
              </button>
            </div>
          </div>
        </section>

        {/* 9. Sezione Contatti con Iframe Mappa Google */}
        <section
          id="contatti"
          className="py-16 md:py-24 bg-white/55 relative scroll-mt-10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-widest text-[#A66555] uppercase block mb-2">
                Inizia ora il tuo percorso
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal tracking-tight">
                Contatti
              </h2>
              <p className="text-xs text-charcoal-light mt-2.5 max-w-md mx-auto leading-relaxed">
                Francesca riceve <strong>su appuntamento in studio oppure online</strong>. Per richiedere informazioni, proporre un progetto formativo o prenotare un primo incontro, compila il modulo o utilizza i recapiti diretti.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Contacts columns: Data list + Google Map layout */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Contact data panels */}
                <div className="bg-warm-panna/40 border border-warm-beige rounded-2xl p-6.5 space-y-4">
                  <h3 className="font-display font-bold text-[#A66555] uppercase tracking-wider text-[11px]">
                    Recapiti diretti studio
                  </h3>

                  <div className="space-y-4">
                    {/* Tel block */}
                    <a
                      href="tel:+393276562045"
                      className="flex items-start gap-4 p-2 rounded-lg hover:bg-white/60 transition-colors group"
                    >
                      <div className="p-2.5 bg-pale-pink rounded-full text-terracotta">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-charcoal-light uppercase block tracking-wider">
                          Telefono e WhatsApp
                        </span>
                        <span className="text-sm font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                          +39 327 656 2045
                        </span>
                      </div>
                    </a>

                    {/* Email block */}
                    <a
                      href="mailto:dottoressafrancescamorelli@gmail.com"
                      className="flex items-start gap-4 p-2 rounded-lg hover:bg-white/60 transition-colors group"
                    >
                      <div className="p-2.5 bg-pale-pink rounded-full text-terracotta">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-bold text-charcoal-light uppercase block tracking-wider">
                          Posta elettronica
                        </span>
                        <span className="text-sm font-semibold text-charcoal group-hover:text-terracotta transition-colors break-all">
                          dottoressafrancescamorelli@gmail.com
                        </span>
                      </div>
                    </a>

                    {/* Address block */}
                    <a
                      href="https://maps.app.goo.gl/B9UeQx2W2S3h8hJp9"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-4 p-2 rounded-lg hover:bg-white/60 transition-colors group"
                    >
                      <div className="p-2.5 bg-pale-pink rounded-full text-terracotta">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-charcoal-light uppercase block tracking-wider">
                          Indirizzo Studio
                        </span>
                        <span className="text-sm font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                          Via Carelli 28, Foggia (FG)
                        </span>
                        <span className="text-[10px] text-charcoal-light block mt-0.5">
                          Riceve su appuntamento in studio oppure online
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Google Maps Embed Iframe */}
                <div className="bg-white border border-warm-beige rounded-2xl overflow-hidden p-1 shadow-sm relative group">
                  <div className="map-responsive rounded-xl overflow-hidden bg-warm-panna">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.8294677765103!2d15.5482393!3d41.4640195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133c2e17cbd4b2b9%3A0xff3c96d88c9dfa53!2sVia%20Carelli%2028%2C%2071121%20Foggia%20FG!5e0!3m2!1sit!2sit!4v1718617385000!5m2!1sit!2sit"
                      title="Studio Francesca Morelli, Via Carelli 28, Foggia"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="p-3 text-center border-t border-warm-panna">
                    <a
                      href="https://maps.app.goo.gl/B9UeQx2W2S3h8hJp9"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-terracotta hover:text-terracotta-hover transition-colors"
                    >
                      Apri su Google Maps ufficiale
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Form Input Right side */}
              <div className="lg:col-span-7">
                <ContactForm selectedService={selectedService} />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 10. Footer Section */}
      <footer className="bg-charcoal text-warm-cream border-t border-[#3F3A39] py-12" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[#3F3A39]">
            
            {/* Identity Column */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <img 
                  src="logo.png" 
                  alt="Francesca Morelli" 
                  className="h-28 w-auto object-contain brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const textFallback = document.getElementById('footer-text-logo-fallback');
                    if (textFallback) textFallback.classList.remove('hidden');
                  }}
                />
                <span id="footer-text-logo-fallback" className="hidden font-display font-medium text-lg block tracking-tight text-white">
                  Francesca Morelli
                </span>
              </div>
              <p className="text-xs text-warm-panna/70 max-w-sm leading-relaxed">
                Consulente sessuologa ed educatrice alla sessualità. Professionalità, riservatezza ed assenza di giudizio per adolescents, adulti e coppie a Foggia.
              </p>
            </div>

            {/* Address Studio Column */}
            <div className="space-y-3 text-xs text-warm-panna/85">
              <span className="font-display font-bold text-white text-[11px] uppercase tracking-wider block">
                Modalità di ricezione
              </span>
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                  <span>Via Carelli 28, Foggia (FG) <br />e consulenza Online</span>
                </p>
                <p className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-terracotta" />
                  Su appuntamento in studio e online
                </p>
              </div>
            </div>

            {/* Contacts Column */}
            <div className="space-y-3 text-xs text-warm-panna/85">
              <span className="font-display font-bold text-white text-[11px] uppercase tracking-wider block">
                Contatti rapidi
              </span>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-terracotta" />
                  +39 327 656 2045
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-terracotta" />
                  dottoressafrancescamorelli@gmail.com
                </p>
              </div>
            </div>

          </div>

          <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-warm-panna/50">
            <p className="order-2 sm:order-1 text-center sm:text-left">
              © Francesca Morelli. Tutti i diritti riservati.
            </p>
            
            {/* Regulatory Policy Actions which open local non-intrusive popup */}
            <div className="inline-flex gap-5 font-medium order-1 sm:order-2">
              <span className="hover:text-white transition-colors cursor-pointer text-xs">
                Foggia Studio Lic.
              </span>
              <span className="text-[#3F3A39]">•</span>
              <span className="text-[11px] hover:text-white transition-colors cursor-pointer block">
                Informativa Cookie & Privacy predisposta
              </span>
            </div>
          </div>

          {/* Section Powered by Socialee */}
          <div className="mt-8 pt-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-warm-panna/40 font-medium font-sans">
                powered by
              </span>
              <div className="flex items-center gap-1.5">
                <img 
                  src="logo-socialee.png" 
                  alt="Socialee" 
                  className="h-5 object-contain opacity-85 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.currentTarget.style.display = 'none';
                    const textFallback = document.getElementById('socialee-text-fallback');
                    if (textFallback) textFallback.classList.remove('hidden');
                  }}
                />
                <span id="socialee-text-fallback" className="hidden text-xs font-bold font-display text-white tracking-tight">
                  Socialee
                </span>
              </div>
            </div>
            
            {/* Socialee Contact Details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-5 gap-y-2 text-[11px] text-warm-panna/60">
              <a 
                href="tel:+393281230265" 
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-terracotta" />
                <span>+39 328 123 0265</span>
              </a>
              <span className="hidden sm:inline text-warm-panna/20">•</span>
              <a 
                href="mailto:info@socialee.it" 
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3 h-3 text-terracotta" />
                <span>info@socialee.it</span>
              </a>
              <span className="hidden sm:inline text-warm-panna/20">•</span>
              <a 
                href="https://www.instagram.com/socialee.it/" 
                target="_blank" 
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 hover:text-[#E1306C] transition-colors"
                aria-label="Instagram di Socialee"
              >
                <Instagram className="w-3 h-3 text-terracotta hover:text-[#E1306C] transition-colors" />
                <span>@socialee.it</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Circular Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-white border border-warm-beige text-charcoal rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          aria-label="Torna in alto"
          id="scroll-to-top-button"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* 11. Privacy GDPR Banner & Policy Viewer */}
      <PrivacyBanner />
    </div>
  );
}
