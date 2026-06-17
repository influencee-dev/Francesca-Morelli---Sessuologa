import { ServiceCard, ApproccioPrincipio } from "./types";

export const CHI_SONO_PARAGRAPHS = [
  "Mi chiamo Francesca Morelli e sono consulente sessuologa ed educatrice alla sessualità.",
  "Accompagno adolescenti, adulti e coppie in percorsi di conoscenza, consapevolezza e benessere relazionale e sessuale, offrendo uno spazio di ascolto professionale, riservato e privo di giudizio.",
  "Nel mio lavoro incontro persone che stanno attraversando momenti diversi della propria vita: chi desidera comprendere meglio se stesso, chi vive difficoltà nella relazione di coppia, chi vuole migliorare la comunicazione con il partner, chi sta affrontando cambiamenti personali o semplicemente sente il bisogno di confrontarsi con una professionista.",
  "Credo che la sessualità sia una dimensione fondamentale del benessere della persona e che meriti di essere vissuta con serenità, consapevolezza e libertà. Per questo motivo il mio approccio si basa sull’ascolto, sull’empatia e sul rispetto dell’unicità di ogni storia personale.",
  "Ogni percorso viene costruito insieme alla persona o alla coppia, valorizzando bisogni, obiettivi e tempi individuali, senza schemi rigidi e senza giudizi."
];

export const COSA_FACCIO_SECTION_1 = [
  "Offro consulenze individuali e di coppia dedicate a chi desidera migliorare il proprio benessere affettivo, relazionale e sessuale.",
  "Durante gli incontri è possibile affrontare tematiche come difficoltà comunicative nella coppia, gestione dell’intimità, calo del desiderio, dubbi legati alla sessualità, cambiamenti nelle diverse fasi della vita, educazione affettiva e sessuale, costruzione dell’autostima e consapevolezza del proprio corpo e dei propri bisogni.",
  "L’obiettivo del percorso non è fornire risposte preconfezionate, ma aiutare la persona a sviluppare una maggiore conoscenza di sé, migliorare la qualità delle proprie relazioni e vivere la sessualità in modo più autentico e soddisfacente."
];

export const COSA_FACCIO_SECTION_2 = [
  "Mi occupo inoltre di educazione alla sessualità attraverso incontri, percorsi formativi e attività rivolte ad adolescenti, adulti, scuole, associazioni e realtà educative.",
  "Promuovo una cultura della sessualità basata sul rispetto reciproco, sul consenso, sull’inclusione e sulla consapevolezza, offrendo strumenti concreti per affrontare questi temi con maggiore serenità e competenza.",
  "Che tu stia vivendo una difficoltà specifica o desideri semplicemente comprenderti meglio, il primo passo può essere una conversazione. Un confronto professionale può aiutarti a guardare la situazione da una prospettiva nuova e a trovare gli strumenti più adatti per il tuo percorso."
];

export const COSA_FACCIO_CONCETTI = [
  { title: "Ascolto", text: "Spazio protetto e accoglienza attiva" },
  { title: "Riservatezza", text: "Segreto e tutela della propria intimità" },
  { title: "Empatia", text: "Comprensione profonda e autentica" },
  { title: "Percorsi personalizzati", text: "Cuciti su misura rispetto alla storia" }
];

export const SERVIZI: ServiceCard[] = [
  {
    id: "consulenza-individuale",
    title: "Consulenza individuale",
    text: "Uno spazio riservato in cui affrontare dubbi, difficoltà, cambiamenti e bisogni legati alla sfera affettiva, relazionale e sessuale. Il percorso aiuta a sviluppare maggiore consapevolezza di sé, del proprio corpo e dei propri bisogni.",
    category: "Consulenza"
  },
  {
    id: "consulenza-di-coppia",
    title: "Consulenza di coppia",
    text: "Un percorso dedicato alle coppie che desiderano migliorare la comunicazione, affrontare difficoltà legate all’intimità e ritrovare un dialogo più autentico, rispettoso e consapevole.",
    category: "Consulenza"
  },
  {
    id: "educazione-adolescenti",
    title: "Educazione sessuale per adolescenti",
    text: "Incontri e percorsi educativi per accompagnare ragazze e ragazzi nella conoscenza del corpo, delle emozioni, delle relazioni, del consenso e della sessualità, attraverso un linguaggio adeguato all’età.",
    category: "Educazione"
  },
  {
    id: "consapevolezza-benessere",
    title: "Consapevolezza e benessere sessuale",
    text: "Un percorso per conoscere meglio il proprio corpo, riconoscere desideri e bisogni, superare condizionamenti e vivere la sessualità con maggiore serenità, libertà e consapevolezza.",
    category: "Consapevolezza"
  },
  {
    id: "educazione-consenso",
    title: "Educazione al consenso e relazioni sane",
    text: "Percorsi dedicati al rispetto dei confini personali, alla comunicazione del consenso, alla gestione delle emozioni e alla costruzione di relazioni basate sull’ascolto e sulla reciprocità.",
    category: "Consenso"
  },
  {
    id: "formazione-scuole",
    title: "Formazione per scuole e associazioni",
    text: "Incontri, laboratori e percorsi formativi rivolti a scuole, associazioni, gruppi educativi e realtà del territorio sui temi dell’educazione affettiva, della sessualità, del consenso e delle relazioni.",
    category: "Formazione"
  }
];

export const PRINCIPI_APPROCCIO: ApproccioPrincipio[] = [
  {
    title: "Ascolto",
    description: "Ogni percorso parte dall’ascolto della storia, delle necessità e degli obiettivi della persona.",
    iconName: "Heart"
  },
  {
    title: "Assenza di giudizio",
    description: "Lo spazio di consulenza è riservato, rispettoso e libero da pregiudizi.",
    iconName: "Shield"
  },
  {
    title: "Personalizzazione",
    description: "Non esistono soluzioni uguali per tutti. Ogni percorso viene adattato alla persona o alla coppia.",
    iconName: "Compass"
  },
  {
    title: "Consapevolezza",
    description: "L’obiettivo è fornire strumenti utili per comprendersi meglio e compiere scelte più consapevoli.",
    iconName: "Sparkles"
  }
];

export const TEMI_EDUCAZIONE = [
  "educazione affettiva",
  "conoscenza del corpo",
  "emozioni e relazioni",
  "consenso e confini personali",
  "rispetto reciproco",
  "prevenzione degli stereotipi",
  "comunicazione consapevole",
  "inclusione"
];
