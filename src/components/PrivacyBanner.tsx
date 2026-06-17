import React, { useState, useEffect } from "react";
import { ShieldCheck, Info, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function PrivacyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [activePolicy, setActivePolicy] = useState<"privacy" | "cookie" | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem("francesca-morelli-cookie-consent");
    if (!consent) {
      // Show banner after 1.5 seconds delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("francesca-morelli-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("francesca-morelli-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-45 bg-white/95 backdrop-blur-md shadow-lg border border-warm-beige rounded-2xl p-5 text-charcoal"
            id="cookie-consent-banner"
          >
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-pale-pink text-terracotta rounded-full shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h5 className="font-display font-semibold text-sm tracking-tight text-charcoal">
                  Informativa sui Cookie & Privacy
                </h5>
                <p className="text-[12px] leading-relaxed text-charcoal-light">
                  Questo sito utilizza cookie tecnici ed analitici anonimi per migliorare la tua esperienza di navigazione. Puoi leggere l'informativa in dettaglio e scegliere come procedere.
                </p>
                <div className="flex flex-wrap gap-3 pt-2 text-[11px] font-medium">
                  <button
                    onClick={() => setActivePolicy("privacy")}
                    className="text-mauve hover:text-charcoal underline"
                  >
                    Privacy Policy
                  </button>
                  <span className="text-warm-beige">•</span>
                  <button
                    onClick={() => setActivePolicy("cookie")}
                    className="text-mauve hover:text-charcoal underline"
                  >
                    Cookie Policy
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-warm-beige/50">
              <button
                onClick={handleDecline}
                className="text-xs text-charcoal-light hover:text-charcoal px-3 py-1.5 font-medium"
              >
                Rifiuta
              </button>
              <button
                onClick={handleAccept}
                className="bg-charcoal hover:bg-black text-white text-xs px-4 py-2 rounded-full font-medium transition-all shadow-sm"
              >
                Accetta Tutti
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal containing Privacy or Cookie documents */}
      <AnimatePresence>
        {activePolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-warm-cream border border-warm-beige w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl p-6 md:p-8 shadow-xl text-charcoal"
              id="policy-modal"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-beige">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-terracotta" />
                  <h3 className="font-display font-bold text-lg md:text-xl text-charcoal">
                    {activePolicy === "privacy" ? "Informativa sulla Privacy" : "Informativa sui Cookie"}
                  </h3>
                </div>
                <button
                  onClick={() => setActivePolicy(null)}
                  className="p-1.5 rounded-full hover:bg-warm-beige/50 text-charcoal-light hover:text-charcoal transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm text-charcoal-light leading-relaxed space-y-4 pr-1 text-justify">
                {activePolicy === "privacy" ? (
                  <>
                    <p className="font-semibold text-charcoal">Ultimo aggiornamento: Giugno 2026</p>
                    <p>
                      Ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR), la dott.ssa <strong>Francesca Morelli</strong>, titolare del trattamento dei dati personali, informa gli utenti in merito alle modalità di gestione delle informazioni raccolte attraverso questo sito web.
                    </p>
                    
                    <h4 className="font-display font-semibold text-charcoal pt-2 text-base">1. Tipologia di dati raccolti</h4>
                    <p>
                      Attraverso il modulo di contatto di questo sito vengono acquisiti esclusivamente dati personali identificativi generici (Nome, Cognome, indirizzo Email, Numero di telefono, servizio d'interesse, preferenza di contatto e messaggio opzionale). Si raccomanda espressamente di non inserire nel campo messaggio dettagli ipersensibili, anamnesi mediche o diagnosi cliniche.
                    </p>

                    <h4 className="font-display font-semibold text-charcoal pt-2 text-base">2. Finalità e base giuridica</h4>
                    <p>
                      I dati inviati dall'utente sono trattati esclusivamente per riscontrare la richiesta di informazioni, preventivi o prenotazione di un primo incontro conoscitivo. Il trattamento si basa sul consenso esplicito dell'interessato espresso selezionando la casella obbligatoria in calce al modulo di contatto.
                    </p>

                    <h4 className="font-display font-semibold text-charcoal pt-2 text-base">3. Modalità di conservazione e destinatario</h4>
                    <p>
                      I dati personali raccolti sono trattati con strumenti digitali protetti. Non sono comunicati a terzi, né diffusi in alcun modo. Saranno conservati per il tempo strettamente necessario a completare la richiesta o stabilire il primo contatto professionale, dopodiché saranno eliminati se non si darà avvio ad un percorso ufficiale di consulenza (per il quale è prevista apposita informativa clinica firmata di presenza).
                    </p>

                    <h4 className="font-display font-semibold text-charcoal pt-2 text-base">4. Diritti dell'interessato</h4>
                    <p>
                      Gli utenti hanno il diritto in qualunque momento di richiedere l'accesso ai propri dati, la rettifica, la cancellazione o la limitazione del trattamento inviando un'email all'indirizzo: <strong>dottoressafrancescamorelli@gmail.com</strong>.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-charcoal">Ultimo aggiornamento: Giugno 2026</p>
                    <p>
                      Questo sito web utilizza cookie per garantire il corretto funzionamento delle procedure e migliorare l'esperienza d'uso delle applicazioni online. Questa informativa descrive le tipologie di cookie impiegate e le relative scelte di installazione.
                    </p>

                    <h4 className="font-display font-semibold text-charcoal pt-2 text-base">1. Cosa sono i Cookie?</h4>
                    <p>
                      I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali (solitamente al browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.
                    </p>

                    <h4 className="font-display font-semibold text-charcoal pt-2 text-base">2. Tipologia di cookie utilizzati</h4>
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                      <li><strong>Cookie Tecnici Essenziali:</strong> Necessari per permettere la navigazione fluida sul sito, implementare le scelte dell'utente (come la chiusura di questa barra di notifica) e l'inoltro sicuro del modulo di contatto.</li>
                      <li><strong>Cookie Analitici Anonimizzati:</strong> Raccolgono statistiche in forma assolutamente aggregata ed anonima sul traffico delle pagine, sui tempi di sosta e sulle modalità di interazione, senza profilazione personale.</li>
                    </ul>

                    <h4 className="font-display font-semibold text-charcoal pt-2 text-base">3. Gestione e cancellazione dei Cookie</h4>
                    <p>
                      L'utente può configurare le preferenze del proprio browser per negare l'installazione dei cookie, bloccarli selettivamente o eliminare quelli già memorizzati. La disattivazione dei cookie tecnici essenziali potrebbe condizionare l'accesso a determinate aree o impedire l'invio corretto del modulo contatti.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-warm-beige flex justify-end">
                <button
                  onClick={() => setActivePolicy(null)}
                  className="bg-charcoal hover:bg-black text-white text-xs px-5 py-2.5 rounded-full font-medium transition-all"
                >
                  Chiudi informativa
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
