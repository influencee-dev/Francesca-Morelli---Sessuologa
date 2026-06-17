import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { ContactFormInputs } from "../types";

interface ContactFormProps {
  selectedService: string;
}

export default function ContactForm({ selectedService }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormInputs>({
    fullname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    privacyConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState("");

  // Sync selectedService if parent changes it
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const servicesList = [
    { value: "consulenza-individuale", label: "Consulenza individuale" },
    { value: "consulenza-di-coppia", label: "Consulenza di coppia" },
    { value: "educazione-adolescenti", label: "Educazione sessuale per adolescenti" },
    { value: "consapevolezza-benessere", label: "Consapevolezza e benessere sessuale" },
    { value: "educazione-consenso", label: "Educazione al consenso e relazioni sane" },
    { value: "formazione-scuole", label: "Formazione per scuole e associazioni" },
    { value: "altro", label: "Altro" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic Validation
    if (!formData.fullname.trim()) {
      setErrorMessage("Inserisci il tuo nome e cognome.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Inserisci il tuo indirizzo email.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Inserisci il tuo numero di telefono.");
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMessage("È necessario acconsentire al trattamento dei dati personali.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Split Name into First & Last
      const nameParts = formData.fullname.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "Contatto";

      const selectedServiceLabel = servicesList.find((s) => s.value === formData.service)?.label || formData.service || "Non specificato";

      const formattedMessage = `Buongiorno Francesca, ecco i dati compilati dal modulo contatti del sito:

👤 *Nome e Cognome:* ${formData.fullname}
📨 *Email:* ${formData.email}
📞 *Telefono:* ${formData.phone}
💼 *Servizio richiesto:* ${selectedServiceLabel}
💬 *Messaggio:* ${formData.message || "Nessun messaggio inserito"}`;

      const waLink = `https://wa.me/393276562045?text=${encodeURIComponent(formattedMessage)}`;
      setLastWhatsappUrl(waLink);

      // Call API proxy to register in Brevo List 44
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          firstName,
          lastName,
          phone: formData.phone,
          service: selectedServiceLabel,
          message: formData.message
        })
      });

      if (!response.ok) {
        const errObj = await response.json().catch(() => ({}));
        throw new Error(errObj.error || "Impossibile completare la registrazione su Brevo");
      }

      // Automatically try to open WhatsApp pre-filled window/tab
      window.open(waLink, "_blank", "noopener,noreferrer");

      // Store locally to persist submission for fallback/later inspection
      const pastInquiries = JSON.parse(localStorage.getItem("francesca-inquiries") || "[]");
      const newInquiry = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: crypto.randomUUID()
      };
      localStorage.setItem("francesca-inquiries", JSON.stringify([...pastInquiries, newInquiry]));

      setSubmitSuccess(true);
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        privacyConsent: false
      });
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMessage(err.message || "Si è verificato un errore durante l'invio. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div 
        className="bg-white/70 border border-[#CBD5E1]/40 backdrop-blur-md rounded-2xl p-8 text-center space-y-5 shadow-sm transition-all animate-fade-in text-charcoal"
        id="contact-success-state"
      >
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h4 className="font-display font-bold text-lg text-charcoal">
            Richiesta inviata con successo!
          </h4>
          <p className="text-xs text-charcoal-light max-w-md mx-auto leading-relaxed">
            I tuoi dati sono stati registrati e inseriti nella lista contatti.
          </p>
          <div className="bg-warm-cream border border-warm-beige p-4 rounded-xl max-w-sm mx-auto text-left space-y-2 mt-4">
            <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider block">Avvia ora la chat con Francesca</span>
            <p className="text-[11px] text-charcoal-light leading-relaxed">
              Il sistema ha pre-compilato il messaggio con i tuoi dati. Clicca il link qui sotto per inviarlo direttamente a Francesca su WhatsApp e accelerare la risposta.
            </p>
            {lastWhatsappUrl && (
              <a
                href={lastWhatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all hover:-translate-y-0.5 mt-2 decoration-0"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Invia messaggio su WhatsApp
              </a>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="text-xs font-semibold text-terracotta hover:text-terracotta-hover underline mt-2 cursor-pointer"
          >
            Invia un altro messaggio o compila di nuovo
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/85 border border-warm-beige rounded-2xl p-6 md:p-8 space-y-5 shadow-sm"
      id="main-contact-form"
    >
      <div className="space-y-1">
        <h4 className="font-display font-semibold text-charcoal text-base">
          Modulo di richiesta informazioni
        </h4>
        <p className="text-xs text-charcoal-light">
          Ti invitiamo a descrivere soltanto in modo generale il motivo del contatto, senza inserire dati ultrasensibili o condizioni sanitarie.
        </p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fullname */}
        <div className="space-y-1">
          <label htmlFor="fullname" className="text-xs font-medium text-charcoal-light">
            Nome e cognome <span className="text-terracotta">*</span>
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            required
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Esempio: Mario Rossi"
            className="w-full text-sm bg-warm-cream/50 border border-warm-beige focus:border-terracotta focus:ring-1 focus:ring-terracotta rounded-lg px-3.5 py-2.5 transition-colors focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-xs font-medium text-charcoal-light">
            Indirizzo email <span className="text-terracotta">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="esempio@email.com"
            className="w-full text-sm bg-warm-cream/50 border border-warm-beige focus:border-terracotta focus:ring-1 focus:ring-terracotta rounded-lg px-3.5 py-2.5 transition-colors focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="space-y-1">
          <label htmlFor="phone" className="text-xs font-medium text-charcoal-light">
            Numero di telefono <span className="text-terracotta">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Esempio: +39 333 1234567"
            className="w-full text-sm bg-warm-cream/50 border border-warm-beige focus:border-terracotta focus:ring-1 focus:ring-terracotta rounded-lg px-3.5 py-2.5 transition-colors focus:outline-none"
          />
        </div>

        {/* Service of Interest */}
        <div className="space-y-1">
          <label htmlFor="service" className="text-xs font-medium text-charcoal-light">
            Servizio di interesse
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full text-sm bg-warm-cream/50 border border-warm-beige focus:border-terracotta focus:ring-1 focus:ring-terracotta rounded-lg px-3.5 py-2.5 transition-colors focus:outline-none text-charcoal"
          >
            <option value="" disabled>Seleziona un servizio...</option>
            {servicesList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label htmlFor="message" className="text-xs font-medium text-charcoal-light">
          Messaggio
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Scrivi brevemente qui la tua domanda o richiesta per fissare un incontro..."
          className="w-full text-sm bg-warm-cream/50 border border-warm-beige focus:border-terracotta focus:ring-1 focus:ring-terracotta rounded-lg px-3.5 py-2.5 transition-colors focus:outline-none resize-none"
        />
      </div>

      {/* Privacy Consent Checkbox */}
      <label className="flex items-start gap-2.5 cursor-pointer text-xs leading-relaxed text-charcoal-light select-none pt-1">
        <input
          type="checkbox"
          id="privacyConsent"
          name="privacyConsent"
          required
          checked={formData.privacyConsent}
          onChange={handleChange}
          className="w-4.5 h-4.5 text-terracotta focus:ring-terracotta border-warm-beige rounded focus:outline-none bg-warm-cream/50 mt-0.5"
        />
        <span>
          Dichiaro di aver letto l’
          <span className="text-mauve hover:text-charcoal underline font-medium">
            informativa sulla privacy
          </span>
          {" "}e acconsento al trattamento dei dati per essere ricontattato/a. <span className="text-terracotta">*</span>
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold py-3 px-5 rounded-full transition-all shadow-sm hover:shadow focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Invio in corso...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Invia la richiesta
          </>
        )}
      </button>

      {/* Subtle indicator of Brevo/CRM ready connection */}
      <div className="text-[10px] text-center text-charcoal-light/60 font-mono mt-1">
        Pronto per integrazione API Brevo / CRM / Mailbox
      </div>
    </form>
  );
}
