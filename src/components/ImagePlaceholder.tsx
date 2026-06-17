import React from "react";
import { User, Image as ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  label: string;
  className?: string;
}

export default function ImagePlaceholder({ label, className = "" }: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden border border-warm-beige bg-gradient-to-br from-pale-pink to-warm-panna shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
      id={`placeholder-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Decorative calm background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-60 h-60 rounded-full bg-warm-beige/30 blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-20%] w-72 h-72 rounded-full bg-pale-pink/50 blur-3xl pointer-events-none" />
      
      {/* Abstract curving path representing paths coming together */}
      <svg
        className="absolute inset-0 w-full h-full text-mauve/10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q25,20 50,50 T100,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M0,60 Q35,80 70,40 T100,60"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-sm">
        <div className="mb-4 p-4 rounded-full bg-white/80 shadow-sm border border-warm-beige/50 text-terracotta">
          <User className="w-10 h-10" />
        </div>
        <h4 className="font-display font-medium text-charcoal text-lg mb-1">
          {label}
        </h4>
        <p className="text-xs text-charcoal-light mb-4">
          Spazio riservato per la fotografia professionale di Francesca Morelli
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-mauve bg-white/60 px-3 py-1.5 rounded-full border border-warm-beige/45">
          <ImageIcon className="w-3.5 h-3.5" />
          Dimensioni consigliate: 800 x 1000px
        </div>
      </div>
    </div>
  );
}
