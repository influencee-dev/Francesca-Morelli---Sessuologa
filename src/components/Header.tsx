import React, { useState, useEffect } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Chi sono", id: "chi-sono" },
    { name: "Cosa faccio", id: "cosa-faccio" },
    { name: "Servizi", id: "servizi" },
    { name: "Contatti", id: "contatti" }
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-warm-cream/95 backdrop-blur-md shadow-sm border-b border-warm-beige/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand left */}
          <div 
            onClick={() => handleItemClick("hero")}
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo"
          >
            <img 
              src="logo.png" 
              alt="Francesca Morelli" 
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const textFallback = document.getElementById('header-text-logo-fallback');
                if (textFallback) textFallback.classList.remove('hidden');
              }}
            />
            <div id="header-text-logo-fallback" className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-charcoal group-hover:text-terracotta transition-colors">
                Francesca Morelli
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-sm font-medium transition-colors hover:text-terracotta relative py-1 ${
                  activeSection === item.id || (activeSection === "hero" && item.id === "hero")
                    ? "text-terracotta font-semibold"
                    : "text-charcoal-light"
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call to action Right banner */}
          <div className="hidden md:flex items-center" id="desktop-cta-btn">
            <button
              onClick={() => handleItemClick("contatti")}
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold px-4.5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Prenota un incontro
            </button>
          </div>

          {/* Hamburger Menu on Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-charcoal hover:text-terracotta transition-colors focus:outline-none"
              aria-label="Toggle Menu"
              id="hamburger-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-warm-cream border-b border-warm-beige/80"
            id="mobile-drawer"
          >
            <div className="px-5 py-6 space-y-4">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`text-left text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-pale-pink/80 text-terracotta font-semibold"
                        : "text-charcoal-light hover:bg-warm-panna hover:text-charcoal"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="pt-4 border-t border-warm-beige">
                <button
                  onClick={() => handleItemClick("contatti")}
                  className="w-full flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-sm font-semibold py-3 px-4 rounded-full transition-all shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Prenota un incontro
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
