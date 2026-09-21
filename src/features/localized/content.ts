export type LocalizedTypingContent = {
  lang: "fr" | "it" | "hi";
  locale: "fr-FR" | "it-IT" | "hi-IN";
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  passages: string[];
  nav: {
    home: string;
    languageLabel: string;
    privacy: string;
    terms: string;
    languages: Record<"en" | "fr" | "it" | "hi", string>;
  };
  ui: {
    testHeading: string;
    testIntro: string;
    durationLabel: string;
    durations: Record<60 | 180 | 300, string>;
    restart: string;
    startHint: string;
    mobileNote: string;
    inputLabel: string;
    inputPlaceholder: string;
    wpm: string;
    accuracy: string;
    consistency: string;
    time: string;
    remaining: string;
    complete: string;
    resultHeading: string;
    rawWpm: string;
    errors: string;
    characters: string;
    tryAgain: string;
    certificateButton: string;
    close: string;
  };
  keyboard: {
    heading: string;
    name: string;
    rows: string[][];
    intro: string;
    steps: string[];
    note: string;
  };
  guide: Array<{ heading: string; paragraphs: string[] }>;
  faqHeading: string;
  faqs: Array<{ question: string; answer: string }>;
  footer: string;
  certificate: {
    dialogTitle: string;
    dialogIntro: string;
    nameLabel: string;
    namePlaceholder: string;
    generate: string;
    titleTop: string;
    titleMain: string;
    certifies: string;
    statement: string;
    speedLabel: string;
    accuracyLabel: string;
    testLabel: string;
    dateLabel: string;
    testName: string;
    motto: string;
    disclaimer: string;
    download: string;
    print: string;
    fileName: string;
  };
};

export const frenchTypingContent: LocalizedTypingContent = {
  lang: "fr",
  locale: "fr-FR",
  path: "/fr/test-de-vitesse-de-frappe/",
  title: "Test de vitesse de frappe gratuit en français | WPMTest",
  description: "Testez gratuitement votre vitesse de frappe en français. Mesurez vos mots par minute, votre précision et votre régularité sur clavier AZERTY.",
  h1: "Test de vitesse de frappe en français",
  eyebrow: "GRATUIT · SANS INSCRIPTION · RÉSULTATS PRIVÉS",
  intro: "Tapez un texte français naturel avec ses accents et sa ponctuation. Obtenez immédiatement votre vitesse, votre précision et votre régularité, puis créez un certificat en français.",
  passages: [
    "Chaque matin, la boulangerie du quartier ouvre avant le lever du soleil. L'odeur du pain chaud traverse la place, tandis que les premiers clients choisissent une baguette, un croissant ou un café.",
    "À la gare, les voyageurs consultent l'heure du prochain train et préparent leur billet. Une annonce rappelle que le quai peut changer ; chacun écoute attentivement avant de reprendre sa conversation.",
    "Pour écrire vite et correctement, il vaut mieux garder un rythme régulier. Les accents, les apostrophes et les espaces comptent autant que les lettres : la précision vient avant la vitesse.",
    "Le samedi, le marché réunit des producteurs, des voisins et des familles. On compare les tomates, les fromages et les fleurs de saison, puis on rentre préparer un déjeuner simple et convivial.",
    "Au bureau comme à l'école, quelques minutes d'entraînement quotidien suffisent pour progresser. Une posture détendue et des gestes précis réduisent les erreurs et rendent la frappe plus confortable."
  ],
  nav: {
    home: "Accueil WPMTest",
    languageLabel: "Changer de langue",
    privacy: "Confidentialité",
    terms: "Conditions d'utilisation",
    languages: { en: "English", fr: "Français", it: "Italiano", hi: "हिन्दी" }
  },
  ui: {
    testHeading: "Commencer le test de frappe",
    testIntro: "Choisissez une durée, activez votre clavier français et recopiez le texte exactement.",
    durationLabel: "Durée du test",
    durations: { 60: "1 minute", 180: "3 minutes", 300: "5 minutes" },
    restart: "Recommencer",
    startHint: "Touchez ou cliquez dans le champ, puis commencez à taper. Le chronomètre démarre à la première saisie.",
    mobileNote: "Sur téléphone ou tablette, sélectionnez le clavier français dans les réglages de votre appareil. Un clavier physique reste préférable pour travailler la technique de dactylographie.",
    inputLabel: "Zone de saisie du test de frappe en français",
    inputPlaceholder: "Touchez ici pour ouvrir le clavier",
    wpm: "MPM",
    accuracy: "Précision",
    consistency: "Régularité",
    time: "Temps",
    remaining: "Restant",
    complete: "Test terminé",
    resultHeading: "{wpm} MPM · {accuracy} % de précision",
    rawWpm: "MPM bruts",
    errors: "Erreurs",
    characters: "Caractères",
    tryAgain: "Refaire le test",
    certificateButton: "Créer mon certificat en français",
    close: "Fermer"
  },
  keyboard: {
    heading: "Clavier français AZERTY",
    name: "Disposition française AZERTY",
    rows: [
      ["&", "é", "\"", "'", "(", "-", "è", "_", "ç", "à", ")", "="],
      ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P", "^", "$"],
      ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M", "ù", "*"],
      ["W", "X", "C", "V", "B", "N", ",", ";", ":", "!"]
    ],
    intro: "En France, la disposition courante est l'AZERTY. Les touches A et Q ainsi que Z et W ne sont pas placées comme sur un clavier QWERTY, et plusieurs accents français disposent de touches dédiées.",
    steps: [
      "Windows : Paramètres → Heure et langue → Langue et région → Français → Clavier français.",
      "macOS : Réglages Système → Clavier → Sources d'entrée → Français.",
      "iPhone ou Android : ajoutez « Français » dans les réglages du clavier, puis changez de langue avec la touche globe."
    ],
    note: "Le site ne peut pas modifier la disposition physique de votre appareil. Il évalue les caractères réellement produits par le clavier que vous avez sélectionné."
  },
  guide: [
    {
      heading: "Comment la vitesse est-elle calculée ?",
      paragraphs: [
        "Le résultat utilise la convention internationale d'un mot standard pour cinq caractères, espaces compris. Cette méthode permet de comparer des textes de longueurs différentes sans dépendre du nombre réel de mots.",
        "La précision indique la part des frappes correctes. Une vitesse élevée accompagnée de nombreuses erreurs est moins utile qu'un rythme légèrement plus lent mais fiable."
      ]
    },
    {
      heading: "S'entraîner avec un texte français naturel",
      paragraphs: [
        "Les phrases de ce test utilisent des accents, des apostrophes et une ponctuation courante. Elles ressemblent davantage à un courriel, un devoir ou un document professionnel qu'à une simple liste de mots.",
        "Pour progresser, répétez le même format pendant plusieurs jours et comparez surtout votre précision. Passez ensuite d'une minute à trois ou cinq minutes pour vérifier que votre rythme reste stable."
      ]
    }
  ],
  faqHeading: "Questions fréquentes",
  faqs: [
    { question: "Dois-je utiliser un clavier AZERTY ?", answer: "Il est recommandé pour ce test français, car il donne un accès direct aux lettres et accents courants. Le test accepte toutefois tout clavier capable de produire exactement le texte affiché." },
    { question: "Comment activer le clavier français sur mon appareil ?", answer: "Ajoutez Français dans les réglages de langue ou de clavier de Windows, macOS, iOS ou Android. Utilisez ensuite l'indicateur de langue ou la touche globe pour passer en AZERTY avant de commencer." },
    { question: "Les accents comme é, è, à et ç comptent-ils ?", answer: "Oui. Chaque caractère doit correspondre au texte. Un accent manquant ou différent est compté comme une erreur, car il change l'orthographe française." },
    { question: "Qu'est-ce qu'une bonne vitesse de frappe en français ?", answer: "Environ 40 MPM constitue une base confortable pour de nombreuses tâches. Le niveau utile dépend du contexte, mais une précision d'au moins 95 % est généralement plus importante qu'un record bref." },
    { question: "Puis-je faire le test sur mobile ?", answer: "Oui. Le clavier à l'écran s'ouvre dans la zone de saisie. Le résultat mesure alors votre vitesse sur écran tactile ; utilisez un clavier physique pour évaluer une compétence de dactylographie sur ordinateur." },
    { question: "Le certificat est-il officiel ?", answer: "Non. Le certificat WPMTest enregistre le résultat de votre test en ligne. Il ne remplace pas une certification professionnelle accréditée ni un examen imposé par un employeur." },
    { question: "Mes données sont-elles enregistrées sur un serveur ?", answer: "Le test fonctionne dans votre navigateur et ne demande pas de compte. Le nom saisi pour le certificat sert uniquement à créer le document sur votre appareil." }
  ],
  footer: "Test de frappe gratuit en français · Résultats locaux · Sans inscription",
  certificate: {
    dialogTitle: "Créer votre certificat de frappe",
    dialogIntro: "Saisissez le nom qui doit apparaître sur le certificat en français.",
    nameLabel: "Votre nom",
    namePlaceholder: "Nom et prénom",
    generate: "Générer le certificat",
    titleTop: "CERTIFICAT DE",
    titleMain: "DACTYLOGRAPHIE",
    certifies: "CERTIFIE QUE",
    statement: "a réalisé un test de frappe en français sur WPMTest et obtenu les résultats suivants :",
    speedLabel: "MOTS PAR MINUTE",
    accuracyLabel: "PRÉCISION",
    testLabel: "TEST EFFECTUÉ",
    dateLabel: "DATE",
    testName: "Test de frappe en français",
    motto: "LA PRATIQUE FAIT PROGRESSER",
    disclaimer: "Ce certificat consigne un résultat obtenu sur WPMTest ; il ne constitue pas une certification professionnelle accréditée.",
    download: "Télécharger",
    print: "Imprimer / Enregistrer en PDF",
    fileName: "Certificat-WPMTest-francais"
  }
};

export const italianTypingContent: LocalizedTypingContent = {
  lang: "it",
  locale: "it-IT",
  path: "/it/test-di-velocita-di-scrittura/",
  title: "Test di velocità di scrittura gratuito in italiano | WPMTest",
  description: "Misura gratis la velocità di scrittura in italiano, la precisione e la costanza. Test con frasi naturali, tastiera italiana e certificato in italiano.",
  h1: "Test di velocità di scrittura in italiano",
  eyebrow: "GRATUITO · SENZA REGISTRAZIONE · RISULTATI PRIVATI",
  intro: "Scrivi frasi italiane naturali con accenti e punteggiatura. Controlla subito parole al minuto, precisione e regolarità, poi crea il tuo certificato in italiano.",
  passages: [
    "Ogni mattina il bar della piazza apre presto. Il profumo del caffè accompagna chi va al lavoro, mentre il giornalaio sistema i quotidiani e saluta i primi clienti.",
    "Alla stazione, i viaggiatori controllano l'orario del treno e tengono il biglietto a portata di mano. Un annuncio segnala il binario corretto e invita tutti a non oltrepassare la linea gialla.",
    "Per scrivere bene non serve correre subito. Un ritmo regolare, una postura comoda e pochi errori aiutano a migliorare più di una breve prova eseguita troppo in fretta.",
    "Il sabato il mercato riempie le strade di colori e voci. Le famiglie scelgono frutta, pane e formaggi, poi tornano a casa per preparare un pranzo semplice da condividere.",
    "A scuola e in ufficio, la tastiera è uno strumento quotidiano. Allenarsi per alcuni minuti al giorno rende più facili le email, i documenti e tutte le attività che richiedono attenzione."
  ],
  nav: {
    home: "Home WPMTest",
    languageLabel: "Cambia lingua",
    privacy: "Privacy",
    terms: "Condizioni d'uso",
    languages: { en: "English", fr: "Français", it: "Italiano", hi: "हिन्दी" }
  },
  ui: {
    testHeading: "Inizia il test di scrittura",
    testIntro: "Scegli la durata, attiva la tastiera italiana e copia il testo esattamente come appare.",
    durationLabel: "Durata del test",
    durations: { 60: "1 minuto", 180: "3 minuti", 300: "5 minuti" },
    restart: "Ricomincia",
    startHint: "Tocca o fai clic nel campo e inizia a scrivere. Il tempo parte con il primo carattere.",
    mobileNote: "Su telefono o tablet, seleziona la tastiera italiana nelle impostazioni del dispositivo. Per allenare la tecnica di dattilografia è preferibile una tastiera fisica.",
    inputLabel: "Area di scrittura del test in italiano",
    inputPlaceholder: "Tocca qui per aprire la tastiera",
    wpm: "PPM",
    accuracy: "Precisione",
    consistency: "Regolarità",
    time: "Tempo",
    remaining: "Rimanente",
    complete: "Test completato",
    resultHeading: "{wpm} PPM · {accuracy}% di precisione",
    rawWpm: "PPM lorde",
    errors: "Errori",
    characters: "Caratteri",
    tryAgain: "Ripeti il test",
    certificateButton: "Crea il certificato in italiano",
    close: "Chiudi"
  },
  keyboard: {
    heading: "Tastiera italiana QWERTY",
    name: "Layout italiano QWERTY",
    rows: [
      ["\\", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'", "ì"],
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "è", "+"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", "ò", "à", "ù"],
      ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "-"]
    ],
    intro: "La tastiera italiana mantiene la disposizione QWERTY per le lettere principali e include tasti dedicati per vocali accentate come è, ò, à, ù e ì.",
    steps: [
      "Windows: Impostazioni → Data/ora e lingua → Lingua e area geografica → Italiano → Tastiera italiana.",
      "macOS: Impostazioni di Sistema → Tastiera → Sorgenti di input → Italiano.",
      "iPhone o Android: aggiungi Italiano nelle impostazioni della tastiera e usa il tasto con il globo per cambiare lingua."
    ],
    note: "Una pagina web non può cambiare il layout del dispositivo. Il test valuta i caratteri prodotti dalla tastiera selezionata dall'utente."
  },
  guide: [
    {
      heading: "Come viene calcolata la velocità?",
      paragraphs: [
        "Il risultato segue la convenzione di una parola standard ogni cinque caratteri, spazi compresi. In questo modo testi diversi possono essere confrontati con una misura coerente.",
        "La precisione mostra quante battute corrispondono al testo. Nella scrittura reale, correggere molti errori fa perdere tempo: per questo conviene consolidare prima la precisione."
      ]
    },
    {
      heading: "Allenarsi con frasi italiane realistiche",
      paragraphs: [
        "Il test include apostrofi, accenti e punteggiatura comuni nei messaggi, nei documenti e nei testi scolastici. Copiare frasi complete aiuta più di una sequenza artificiale di parole isolate.",
        "Ripeti una prova breve ogni giorno e osserva la precisione. Quando il risultato diventa stabile, passa a tre o cinque minuti per misurare la resistenza e la regolarità."
      ]
    }
  ],
  faqHeading: "Domande frequenti",
  faqs: [
    { question: "Devo usare una tastiera italiana?", answer: "È consigliata perché offre tasti diretti per le vocali accentate più comuni. Puoi comunque usare qualsiasi layout che produca esattamente i caratteri mostrati nel testo." },
    { question: "Come attivo la tastiera italiana?", answer: "Aggiungi Italiano nelle impostazioni della lingua o della tastiera di Windows, macOS, iOS o Android. Prima del test, selezionala dall'indicatore della lingua o dal tasto con il globo." },
    { question: "Gli accenti vengono conteggiati come errori?", answer: "Sì. Una vocale accentata è diversa dalla stessa vocale senza accento. Il test controlla il carattere completo per riflettere una scrittura italiana corretta." },
    { question: "Qual è una buona velocità di scrittura?", answer: "Circa 40 PPM è una base utile per molte attività quotidiane. Il valore ideale dipende dal lavoro, ma una precisione pari o superiore al 95% conta più di un picco molto breve." },
    { question: "Il test funziona sullo smartphone?", answer: "Sì. Toccando il campo si apre la tastiera italiana del dispositivo. Il risultato misura la scrittura su touchscreen; per valutare la dattilografia da computer usa una tastiera fisica." },
    { question: "Il certificato ha valore ufficiale?", answer: "No. Il certificato WPMTest documenta un risultato ottenuto online e non sostituisce una certificazione professionale o una prova richiesta da un datore di lavoro." },
    { question: "WPMTest conserva il mio nome o il testo digitato?", answer: "Il test non richiede un account. Il nome viene usato nel browser per creare il certificato e non è necessario inviarlo a un server." }
  ],
  footer: "Test di scrittura gratuito in italiano · Risultati locali · Senza registrazione",
  certificate: {
    dialogTitle: "Crea il certificato di scrittura",
    dialogIntro: "Inserisci il nome che deve apparire sul certificato in italiano.",
    nameLabel: "Il tuo nome",
    namePlaceholder: "Nome e cognome",
    generate: "Genera il certificato",
    titleTop: "CERTIFICATO DI",
    titleMain: "DATTILOGRAFIA",
    certifies: "SI CERTIFICA CHE",
    statement: "ha completato un test di scrittura in italiano su WPMTest ottenendo i seguenti risultati:",
    speedLabel: "PAROLE AL MINUTO",
    accuracyLabel: "PRECISIONE",
    testLabel: "TEST ESEGUITO",
    dateLabel: "DATA",
    testName: "Test di scrittura in italiano",
    motto: "LA PRATICA PORTA AL PROGRESSO",
    disclaimer: "Questo certificato riporta un risultato ottenuto su WPMTest e non costituisce una certificazione professionale accreditata.",
    download: "Scarica",
    print: "Stampa / Salva come PDF",
    fileName: "Certificato-WPMTest-italiano"
  }
};

export const hindiTypingContent: LocalizedTypingContent = {
  lang: "hi",
  locale: "hi-IN",
  path: "/hi/hindi-typing-test/",
  title: "मुफ़्त हिंदी टाइपिंग टेस्ट और गति प्रमाणपत्र | WPMTest",
  description: "देवनागरी में मुफ़्त हिंदी टाइपिंग टेस्ट दें। शब्द प्रति मिनट, शुद्धता और निरंतरता जाँचें, इनस्क्रिप्ट कीबोर्ड समझें और हिंदी प्रमाणपत्र बनाएँ।",
  h1: "हिंदी टाइपिंग टेस्ट",
  eyebrow: "मुफ़्त · बिना पंजीकरण · निजी परिणाम",
  intro: "परिचित हिंदी वाक्य टाइप करके अपनी गति, शुद्धता और निरंतरता जाँचें। यह टेस्ट देवनागरी इनस्क्रिप्ट, फ़ोनेटिक और मोबाइल हिंदी कीबोर्ड से आने वाले यूनिकोड पाठ को स्वीकार करता है।",
  passages: [
    "सुबह की चाय के साथ घर में दिन की योजना बनती है। कोई अख़बार पढ़ता है, कोई बच्चों का टिफ़िन तैयार करता है और कोई समय पर बस पकड़ने के लिए जल्दी निकलता है।",
    "रेलवे स्टेशन पर यात्री अपनी ट्रेन का समय और प्लेटफ़ॉर्म देखते हैं। घोषणा सुनते ही लोग सामान सँभालते हैं और सही डिब्बे की ओर शांतिपूर्वक बढ़ते हैं।",
    "अच्छी टाइपिंग के लिए पहले शुद्धता पर ध्यान दें। नियमित गति, आरामदायक मुद्रा और सही कीबोर्ड लेआउट से गलतियाँ कम होती हैं और आत्मविश्वास बढ़ता है।",
    "शनिवार को स्थानीय बाज़ार में ताज़ी सब्ज़ियाँ, फल, मसाले और फूल मिलते हैं। परिवार ज़रूरत की चीज़ें चुनते हैं और दुकानदार से कीमत पूछकर भुगतान करते हैं।",
    "विद्यालय और कार्यालय दोनों जगह हिंदी में साफ़ लिखना उपयोगी है। रोज़ कुछ मिनट अभ्यास करने से संदेश, आवेदन और दस्तावेज़ जल्दी तथा सही ढंग से तैयार होते हैं।"
  ],
  nav: {
    home: "WPMTest मुख्य पृष्ठ",
    languageLabel: "भाषा बदलें",
    privacy: "गोपनीयता",
    terms: "उपयोग की शर्तें",
    languages: { en: "English", fr: "Français", it: "Italiano", hi: "हिन्दी" }
  },
  ui: {
    testHeading: "हिंदी टाइपिंग टेस्ट शुरू करें",
    testIntro: "समय चुनें, अपने उपकरण पर हिंदी कीबोर्ड सक्रिय करें और दिखाया गया पाठ बिल्कुल वैसा ही लिखें।",
    durationLabel: "टेस्ट की अवधि",
    durations: { 60: "1 मिनट", 180: "3 मिनट", 300: "5 मिनट" },
    restart: "फिर से शुरू करें",
    startHint: "इनपुट बॉक्स को छुएँ या क्लिक करें और टाइप करना शुरू करें। पहली प्रविष्टि के साथ समय शुरू होगा।",
    mobileNote: "फ़ोन या टैबलेट पर सेटिंग में हिंदी कीबोर्ड जोड़ें। हार्डवेयर टाइपिंग कौशल का अभ्यास करने के लिए संभव हो तो भौतिक कीबोर्ड और देवनागरी इनस्क्रिप्ट लेआउट उपयोग करें।",
    inputLabel: "हिंदी टाइपिंग टेस्ट का इनपुट क्षेत्र",
    inputPlaceholder: "कीबोर्ड खोलने के लिए यहाँ छुएँ",
    wpm: "शब्द/मिनट",
    accuracy: "शुद्धता",
    consistency: "निरंतरता",
    time: "समय",
    remaining: "शेष",
    complete: "टेस्ट पूरा हुआ",
    resultHeading: "{wpm} शब्द/मिनट · {accuracy}% शुद्धता",
    rawWpm: "कच्ची गति",
    errors: "गलतियाँ",
    characters: "अक्षर समूह",
    tryAgain: "टेस्ट दोबारा दें",
    certificateButton: "हिंदी प्रमाणपत्र बनाएँ",
    close: "बंद करें"
  },
  keyboard: {
    heading: "देवनागरी इनस्क्रिप्ट कीबोर्ड",
    name: "मानक देवनागरी इनस्क्रिप्ट लेआउट",
    rows: [
      ["ौ", "ै", "ा", "ी", "ू", "ब", "ह", "ग", "द", "ज", "ड़"],
      ["ो", "े", "्", "ि", "ु", "प", "र", "क", "त", "च", "ट"],
      ["ं", "म", "न", "व", "ल", "स", ",", ".", "य"],
      ["Shift", "Space", "Enter"]
    ],
    intro: "भारत में देवनागरी लिखने के लिए इनस्क्रिप्ट एक मानक कीबोर्ड लेआउट है। बहुत से फ़ोन और कंप्यूटर फ़ोनेटिक विकल्प भी देते हैं, जिसमें रोमन अक्षरों से हिंदी शब्द बनाए जाते हैं।",
    steps: [
      "Windows: Settings → Time & language → Language & region → Hindi → Devanagari INSCRIPT जोड़ें।",
      "macOS: System Settings → Keyboard → Input Sources में Hindi या Devanagari जोड़ें।",
      "Android या iPhone: कीबोर्ड सेटिंग में हिन्दी जोड़ें; उपलब्ध होने पर देवनागरी, फ़ोनेटिक या हस्तलेखन विकल्प चुनें।"
    ],
    note: "वेब पेज आपके उपकरण का कीबोर्ड नहीं बदल सकता। यह टेस्ट आपके चुने हुए कीबोर्ड से बने वास्तविक यूनिकोड देवनागरी अक्षर समूहों की तुलना करता है।"
  },
  guide: [
    {
      heading: "हिंदी टाइपिंग की गति कैसे मापी जाती है?",
      paragraphs: [
        "गति को एक समान रखने के लिए पाँच दिखाई देने वाले यूनिकोड अक्षर समूहों को एक मानक शब्द इकाई माना जाता है। मात्रा और संयुक्त अक्षर को सही देवनागरी समूह के रूप में गिना जाता है, केवल अलग-अलग कोड इकाइयों के रूप में नहीं।",
        "शुद्धता बताती है कि आपकी प्रविष्टियाँ दिए गए पाठ से कितनी मेल खाती हैं। हिंदी में मात्रा, अनुस्वार, चंद्रबिंदु और विराम चिह्न बदलने पर अर्थ या वर्तनी बदल सकती है, इसलिए ये भी जाँचे जाते हैं।"
      ]
    },
    {
      heading: "इनस्क्रिप्ट और फ़ोनेटिक इनपुट में अंतर",
      paragraphs: [
        "इनस्क्रिप्ट में हर देवनागरी अक्षर की निश्चित कुंजी होती है और नियमित अभ्यास के बाद यह तेज़ हार्डवेयर टाइपिंग के लिए उपयोगी है। फ़ोनेटिक इनपुट में आप रोमन ध्वनियाँ लिखते हैं और इनपुट मेथड उन्हें देवनागरी में बदलता है।",
        "दोनों तरीकों से यह टेस्ट दिया जा सकता है, क्योंकि स्कोर अंतिम देवनागरी पाठ पर आधारित है। नौकरी या परीक्षा की तैयारी करते समय वही लेआउट चुनें जो वास्तविक परीक्षण में उपयोग होगा।"
      ]
    }
  ],
  faqHeading: "अक्सर पूछे जाने वाले प्रश्न",
  faqs: [
    { question: "क्या हिंदी भारत की एकमात्र भाषा है?", answer: "नहीं। भारत बहुभाषी देश है और संविधान की आठवीं अनुसूची में अनेक भाषाएँ शामिल हैं। यह पृष्ठ विशेष रूप से देवनागरी में हिंदी टाइपिंग के लिए बनाया गया है; यह सभी भारतीय भाषाओं का प्रतिनिधित्व करने का दावा नहीं करता।" },
    { question: "क्या मुझे इनस्क्रिप्ट कीबोर्ड ही उपयोग करना होगा?", answer: "नहीं। आप इनस्क्रिप्ट, हिंदी फ़ोनेटिक या मोबाइल देवनागरी कीबोर्ड उपयोग कर सकते हैं। टेस्ट अंतिम यूनिकोड हिंदी पाठ की तुलना करता है। किसी नौकरी या परीक्षा के लिए उसी लेआउट पर अभ्यास करें जिसकी वहाँ अनुमति है।" },
    { question: "अपने फ़ोन या कंप्यूटर पर हिंदी कीबोर्ड कैसे जोड़ूँ?", answer: "उपकरण की भाषा और कीबोर्ड सेटिंग खोलें, हिन्दी या Devanagari जोड़ें और टेस्ट से पहले भाषा स्विच करें। Windows में Devanagari INSCRIPT उपलब्ध है; मोबाइल कीबोर्ड अक्सर देवनागरी और फ़ोनेटिक दोनों विकल्प देते हैं।" },
    { question: "मात्रा और संयुक्त अक्षर कैसे गिने जाते हैं?", answer: "इंजन यूनिकोड ग्रैफीम समूहों के आधार पर पाठ मिलाता है। इससे कि, क्ष और न्द जैसे दिखाई देने वाले समूह JavaScript की अलग-अलग कोड इकाइयों के कारण गलत तरीके से विभाजित नहीं होते।" },
    { question: "हिंदी में अच्छी टाइपिंग गति कितनी है?", answer: "एक ही सार्वभौमिक मानक नहीं है, क्योंकि इनस्क्रिप्ट और फ़ोनेटिक इनपुट की प्रक्रिया अलग हो सकती है। अपनी शुद्धता 95% या अधिक रखने और उसी इनपुट पद्धति पर नियमित रूप से प्रगति देखने पर ध्यान दें।" },
    { question: "क्या यह टेस्ट मोबाइल पर काम करता है?", answer: "हाँ। इनपुट क्षेत्र छूने पर आपका चुना हुआ हिंदी कीबोर्ड खुलता है। मोबाइल स्कोर टचस्क्रीन गति मापता है; हार्डवेयर कौशल के लिए भौतिक कीबोर्ड उपयोग करें।" },
    { question: "क्या हिंदी प्रमाणपत्र आधिकारिक है?", answer: "नहीं। WPMTest प्रमाणपत्र आपके ऑनलाइन परिणाम का रिकॉर्ड है। यह किसी मान्यता प्राप्त व्यावसायिक प्रमाणपत्र या नियोक्ता द्वारा आयोजित परीक्षा का विकल्प नहीं है।" }
  ],
  footer: "मुफ़्त हिंदी टाइपिंग टेस्ट · स्थानीय परिणाम · बिना पंजीकरण",
  certificate: {
    dialogTitle: "हिंदी टाइपिंग प्रमाणपत्र बनाएँ",
    dialogIntro: "प्रमाणपत्र पर दिखने वाला नाम लिखें।",
    nameLabel: "आपका नाम",
    namePlaceholder: "पूरा नाम",
    generate: "प्रमाणपत्र बनाएँ",
    titleTop: "हिंदी टाइपिंग",
    titleMain: "प्रमाणपत्र",
    certifies: "यह प्रमाणित करता है कि",
    statement: "ने WPMTest पर हिंदी टाइपिंग टेस्ट पूरा किया और निम्न परिणाम प्राप्त किए:",
    speedLabel: "शब्द प्रति मिनट",
    accuracyLabel: "शुद्धता",
    testLabel: "टेस्ट",
    dateLabel: "दिनांक",
    testName: "हिंदी टाइपिंग टेस्ट",
    motto: "नियमित अभ्यास से प्रगति",
    disclaimer: "यह प्रमाणपत्र WPMTest के ऑनलाइन परिणाम का रिकॉर्ड है; यह मान्यता प्राप्त व्यावसायिक प्रमाणपत्र नहीं है।",
    download: "डाउनलोड करें",
    print: "प्रिंट / PDF में सहेजें",
    fileName: "WPMTest-Hindi-Pramanpatra"
  }
};

export const localizedTypingContents = {
  fr: frenchTypingContent,
  it: italianTypingContent,
  hi: hindiTypingContent
} as const;
