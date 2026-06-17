import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Brevo contact insertion
  app.post("/api/contacts", async (req, res) => {
    try {
      const { email, firstName, lastName, phone, service, message } = req.body;

      if (!email || !phone) {
         res.status(400).json({ error: "Email e numero di telefono sono obbligatori." });
         return;
      }

      // API Key from environment variable
      const apiKey = process.env.BREVO_API_KEY;

      if (!apiKey) {
         console.warn("BREVO_API_KEY is not defined in the environment.");
         res.status(500).json({ error: "Configurazione del server incompleta (BREVO_API_KEY non definita)." });
         return;
      }

      // List ID from environment or standard fallback
      const listIdEnv = process.env.BREVO_LIST_ID;
      const listIds = listIdEnv ? [parseInt(listIdEnv, 10)] : [44];

      // Call Brevo API
      const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": apiKey,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          attributes: {
            FIRSTNAME: firstName,
            LASTNAME: lastName,
            SMS: phone,
            PHONE: phone,
            SERVICE: service || "Non specificato",
            MESSAGE: message || "Non specificato"
          },
          listIds: listIds,
          updateEnabled: true
        })
      });

      if (!brevoResponse.ok) {
        const errorText = await brevoResponse.text();
        console.error("Brevo API error response:", errorText);
        res.status(brevoResponse.status).json({
          error: "Errore durante l'inserimento su Brevo",
          details: errorText
        });
        return;
      }

      const responseData = await brevoResponse.json();
      res.status(200).json({ success: true, data: responseData });
    } catch (error: any) {
      console.error("Brevo contact creation failed:", error);
      res.status(500).json({ error: "Errore interno del server", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
