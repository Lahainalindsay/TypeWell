import type { LocalizedTypingContent } from "./content";

export const spanishTypingContent: LocalizedTypingContent = {
  lang: "es", locale: "es-ES", path: "/es/prueba-de-velocidad-de-escritura/",
  title: "Prueba de velocidad de escritura gratis en español | WPMTest",
  description: "Mide tu velocidad de escritura, precisión y constancia con frases naturales en español. Incluye guía del teclado español y certificado gratuito.",
  h1: "Prueba de velocidad de escritura en español",
  eyebrow: "GRATIS · SIN REGISTRO · RESULTADOS PRIVADOS",
  intro: "Escribe frases en español con tildes, eñes y signos de puntuación. Mide tu velocidad y precisión con el teclado de tu dispositivo y crea un certificado en español.",
  passages: [
    "Cada mañana, la panadería del barrio abre temprano. Mientras llega el primer autobús, algunas personas compran pan y conversan sobre los planes del día.",
    "En la estación, los viajeros consultan el horario y buscan el andén correcto. Una voz anuncia un cambio de última hora y todos revisan sus billetes con atención.",
    "Escribir con soltura requiere práctica y paciencia. Primero conviene cuidar las tildes, la letra ñ y los signos de pregunta; después resulta más fácil aumentar la velocidad.",
    "El sábado fuimos al mercado para elegir fruta fresca. ¿Quedaban naranjas? Sí, y también había plátanos, tomates y un ramo de flores para la mesa.",
    "Al terminar el trabajo, Elena guardó sus documentos y respondió un mensaje. Una pausa breve le permitió volver a casa con ánimo para disfrutar de la tarde."
  ],
  nav: { home: "Inicio de WPMTest", languageLabel: "Cambiar idioma", privacy: "Privacidad", terms: "Condiciones de uso",
    languages: { en: "English", fr: "Français", it: "Italiano", hi: "हिन्दी", es: "Español", de: "Deutsch", pt: "Português", ru: "Русский" } },
  ui: {
    testHeading: "Empieza la prueba de escritura", testIntro: "Elige una duración, selecciona tu teclado en español y copia el texto tal como aparece.",
    durationLabel: "Duración de la prueba", durations: { 60: "1 minuto", 180: "3 minutos", 300: "5 minutos" },
    restart: "Reiniciar", startHint: "Toca el texto o el campo de escritura y empieza a escribir. El tiempo comienza con la primera tecla.",
    mobileNote: "En el móvil, activa el teclado en español del dispositivo. Para practicar mecanografía con los dedos, usa un teclado físico.",
    inputLabel: "Campo de escritura en español", inputPlaceholder: "Toca aquí para abrir el teclado",
    wpm: "PPM", accuracy: "Precisión", consistency: "Constancia", time: "Tiempo", remaining: "Restante",
    complete: "Prueba terminada", resultHeading: "{wpm} PPM · {accuracy} % de precisión", rawWpm: "PPM brutas",
    errors: "Errores", characters: "Caracteres", tryAgain: "Repetir prueba",
    certificateButton: "Crear certificado en español", close: "Cerrar"
  },
  keyboard: {
    heading: "Teclado español QWERTY", name: "Distribución española (España)",
    rows: [
      ["º", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'", "¡"],
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "`", "+"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "´", "Ç"],
      ["<", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "-", ";", "¿", "?"]
    ],
    intro: "La guía muestra una distribución española habitual de España. La Ñ tiene tecla propia y las tildes se escriben con una tecla de acento antes de la vocal. En América Latina algunas teclas cambian de posición.",
    steps: [
      "Windows: abre Configuración → Hora e idioma → Idioma y región y añade un teclado español.",
      "macOS: abre Ajustes del Sistema → Teclado → Fuentes de entrada y añade Español.",
      "iPhone o Android: añade Español a los teclados y cambia de idioma con la tecla del globo."
    ],
    note: "El dibujo es orientativo: comprueba la distribución activa en tu dispositivo. Esta página no puede cambiarla; el test evalúa los caracteres que introduces."
  },
  guide: [
    { heading: "Cómo se calcula la velocidad", paragraphs: [
      "La prueba considera una palabra estándar por cada cinco caracteres, incluidos los espacios. Así puedes comparar sesiones sin depender de la longitud de las palabras del texto.",
      "La precisión compara los caracteres escritos con el texto original. Una tilde omitida, una eñe sustituida o un signo incorrecto cuentan como error."
    ] },
    { heading: "Practica con frases reales", paragraphs: [
      "Las frases incluyen preguntas con signos de apertura, tildes y puntuación cotidiana. Practicar oraciones completas ayuda a preparar correos, trabajos y documentos en español.",
      "Empieza con una prueba de un minuto. Cuando mantengas la precisión, pasa a tres o cinco minutos para comprobar si tu ritmo sigue siendo estable."
    ] }
  ],
  faqHeading: "Preguntas frecuentes",
  faqs: [
    { question: "¿Necesito un teclado español?", answer: "Es recomendable por la tecla Ñ y el acceso a los acentos. Cualquier teclado sirve si produce exactamente los caracteres del texto." },
    { question: "¿Qué distribución muestra el dibujo?", answer: "Muestra una distribución española habitual de España. Los teclados latinoamericanos pueden colocar algunos símbolos en otras teclas." },
    { question: "¿Las tildes y los signos de apertura cuentan?", answer: "Sí. Á y A son caracteres diferentes, y ¿ o ¡ deben escribirse si aparecen en el pasaje." },
    { question: "¿Qué significa PPM?", answer: "Palabras por minuto. Para medirlas se divide el número de caracteres escritos, incluidos espacios, entre cinco y se ajusta al tiempo transcurrido." },
    { question: "¿Puedo hacer la prueba en el móvil?", answer: "Sí. Selecciona el teclado español del dispositivo. La velocidad en pantalla táctil puede ser diferente a la de un teclado físico." },
    { question: "¿Cómo puedo mejorar mi precisión?", answer: "Reduce un poco el ritmo, revisa las tildes y repite pruebas cortas. Aumenta la duración cuando cometas menos errores." },
    { question: "¿El certificado es oficial?", answer: "No. Registra tu resultado en WPMTest, pero no sustituye una evaluación profesional o exigida por un empleador." }
  ],
  footer: "Prueba de escritura en español · Resultados locales · Sin registro",
  certificate: {
    dialogTitle: "Crea tu certificado de escritura", dialogIntro: "Escribe el nombre que aparecerá en el certificado.",
    nameLabel: "Tu nombre", namePlaceholder: "Nombre y apellidos", generate: "Crear certificado",
    titleTop: "CERTIFICADO DE", titleMain: "MECANOGRAFÍA", certifies: "SE CERTIFICA QUE",
    statement: "ha completado una prueba de escritura en español en WPMTest con estos resultados:",
    speedLabel: "PALABRAS POR MINUTO", accuracyLabel: "PRECISIÓN", testLabel: "PRUEBA", dateLabel: "FECHA",
    testName: "Prueba en español", motto: "LA PRÁCTICA AYUDA A PROGRESAR",
    disclaimer: "Este certificado recoge un resultado de WPMTest; no es una acreditación profesional oficial.",
    download: "Descargar", print: "Imprimir / Guardar como PDF", fileName: "Certificado-WPMTest-espanol"
  }
};

export const germanTypingContent: LocalizedTypingContent = {
  lang: "de", locale: "de-DE", path: "/de/schreibtest/",
  title: "Kostenloser Schreibtest auf Deutsch: Tempo und Genauigkeit | WPMTest",
  description: "Teste deine Schreibgeschwindigkeit mit deutschen Sätzen, Umlauten und ß. Erhalte WPM, Genauigkeit, eine QWERTZ-Tastaturhilfe und ein deutsches Zertifikat.",
  h1: "Schreibtest auf Deutsch",
  eyebrow: "KOSTENLOS · OHNE ANMELDUNG · PRIVATE ERGEBNISSE",
  intro: "Tippe natürliche deutsche Sätze mit Umlauten und ß. Prüfe dein Tempo, deine Genauigkeit und deinen gleichmäßigen Rhythmus und erstelle anschließend ein Zertifikat.",
  passages: [
    "Am frühen Morgen öffnet die Bäckerei an der Ecke. Der Duft von frischen Brötchen zieht durch die Straße, während die ersten Gäste Kaffee bestellen.",
    "Auf dem Bahnhof zeigt die Anzeigetafel eine kleine Verspätung. Einige Reisende lesen ein Buch, andere prüfen noch einmal, ob sie am richtigen Gleis stehen.",
    "Wer flüssig schreiben möchte, sollte zuerst auf Genauigkeit achten. Ä, Ö, Ü und ß gehören ebenso zum Text wie Leerzeichen und Satzzeichen.",
    "Nach der Arbeit ging Mia über den Markt und kaufte Äpfel, Käse und Gemüse. Zu Hause schrieb sie, dass das Abendessen um sieben Uhr fertig ist.",
    "Eine kurze Übung jeden Tag kann mehr bringen als ein einzelner langer Test. Mit ruhigen Händen und regelmäßigen Pausen bleibt die Konzentration erhalten."
  ],
  nav: { home: "WPMTest-Startseite", languageLabel: "Sprache wechseln", privacy: "Datenschutz", terms: "Nutzungsbedingungen",
    languages: { en: "English", fr: "Français", it: "Italiano", hi: "हिन्दी", es: "Español", de: "Deutsch", pt: "Português", ru: "Русский" } },
  ui: {
    testHeading: "Schreibtest starten", testIntro: "Wähle eine Dauer, aktiviere deine deutsche Tastatur und tippe den Text genau ab.",
    durationLabel: "Testdauer", durations: { 60: "1 Minute", 180: "3 Minuten", 300: "5 Minuten" },
    restart: "Neu starten", startHint: "Tippe auf den Text oder das Eingabefeld und beginne zu schreiben. Die Zeit läuft ab dem ersten Zeichen.",
    mobileNote: "Wähle auf dem Smartphone die deutsche Tastatur. Für das Üben mit zehn Fingern eignet sich eine physische Tastatur.",
    inputLabel: "Eingabefeld für den deutschen Schreibtest", inputPlaceholder: "Tippen, um die Tastatur zu öffnen",
    wpm: "WPM", accuracy: "Genauigkeit", consistency: "Gleichmäßigkeit", time: "Zeit", remaining: "Verbleibend",
    complete: "Test beendet", resultHeading: "{wpm} WPM · {accuracy} % Genauigkeit", rawWpm: "Brutto-WPM",
    errors: "Fehler", characters: "Zeichen", tryAgain: "Erneut testen",
    certificateButton: "Deutsches Zertifikat erstellen", close: "Schließen"
  },
  keyboard: {
    heading: "Deutsche QWERTZ-Tastatur", name: "Deutsche QWERTZ-Belegung",
    rows: [
      ["^", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "ß", "´"],
      ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü", "+"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä", "#"],
      ["<", "Y", "X", "C", "V", "B", "N", "M", ",", ".", "-"]
    ],
    intro: "Auf der deutschen QWERTZ-Tastatur sind Y und Z gegenüber QWERTY vertauscht. Die Buchstaben Ä, Ö und Ü sowie ß besitzen eigene Tasten.",
    steps: [
      "Windows: Einstellungen → Zeit und Sprache → Sprache und Region → Deutsch → deutsche Tastatur.",
      "macOS: Systemeinstellungen → Tastatur → Eingabequellen → Deutsch hinzufügen.",
      "iPhone oder Android: Deutsch als Tastatursprache hinzufügen und mit der Globus-Taste wechseln."
    ],
    note: "Die Abbildung zeigt eine übliche deutsche Belegung. Die Website stellt deine Gerätetastatur nicht um; bewertet werden die tatsächlich eingegebenen Zeichen."
  },
  guide: [
    { heading: "So wird die Geschwindigkeit berechnet", paragraphs: [
      "Eine Standardwortlänge entspricht fünf Zeichen einschließlich Leerzeichen. Dadurch bleiben Ergebnisse aus unterschiedlichen Texten vergleichbar.",
      "Die Genauigkeit zeigt, wie viele Zeichen zum vorgegebenen Text passen. Ein fehlender Umlaut oder ein falsches ß zählt als Fehler."
    ] },
    { heading: "Mit echten deutschen Sätzen üben", paragraphs: [
      "Die Texte enthalten Großschreibung, Umlaute und alltägliche Satzzeichen. Vollständige Sätze bereiten besser auf E-Mails und Dokumente vor als isolierte Wörter.",
      "Beginne mit einer Minute und achte auf eine saubere Eingabe. Wenn das Ergebnis stabil ist, verlängere den Test auf drei oder fünf Minuten."
    ] }
  ],
  faqHeading: "Häufige Fragen",
  faqs: [
    { question: "Brauche ich eine QWERTZ-Tastatur?", answer: "Sie macht Umlaute und ß leichter erreichbar. Andere Belegungen funktionieren, sofern sie genau die angezeigten Zeichen erzeugen." },
    { question: "Was ist der Unterschied zwischen QWERTZ und QWERTY?", answer: "Vor allem Y und Z sind vertauscht; außerdem gibt es eigene Tasten für Umlaute und ß." },
    { question: "Zählen Umlaute und ß als eigene Zeichen?", answer: "Ja. Ä ist nicht dasselbe Zeichen wie A, und ß wird nicht durch ss ersetzt." },
    { question: "Wie wird WPM berechnet?", answer: "Die Anzahl der Zeichen einschließlich Leerzeichen wird durch fünf und anschließend durch die verstrichene Zeit in Minuten geteilt." },
    { question: "Funktioniert der Test auf dem Handy?", answer: "Ja. Wähle die deutsche Bildschirmtastatur. Ein Ergebnis am Touchscreen ist nicht direkt mit einer physischen Tastatur vergleichbar." },
    { question: "Wie verbessere ich meine Genauigkeit?", answer: "Übe kurze Abschnitte in ruhigem Tempo und achte besonders auf Großschreibung und Umlaute." },
    { question: "Ist das Zertifikat offiziell?", answer: "Nein. Es dokumentiert nur das online erzielte Ergebnis und ersetzt keinen anerkannten Eignungstest." }
  ],
  footer: "Kostenloser deutscher Schreibtest · Lokale Ergebnisse · Ohne Anmeldung",
  certificate: {
    dialogTitle: "Schreibzertifikat erstellen", dialogIntro: "Gib den Namen ein, der auf dem Zertifikat erscheinen soll.",
    nameLabel: "Dein Name", namePlaceholder: "Vor- und Nachname", generate: "Zertifikat erstellen",
    titleTop: "ZERTIFIKAT FÜR", titleMain: "SCHREIBGESCHWINDIGKEIT", certifies: "HIERMIT WIRD BESTÄTIGT, DASS",
    statement: "den deutschen Schreibtest auf WPMTest mit folgenden Ergebnissen abgeschlossen hat:",
    speedLabel: "WÖRTER PRO MINUTE", accuracyLabel: "GENAUIGKEIT", testLabel: "TEST", dateLabel: "DATUM",
    testName: "Deutscher Schreibtest", motto: "ÜBUNG MACHT FORTSCHRITT",
    disclaimer: "Dieses Zertifikat dokumentiert ein WPMTest-Ergebnis und ist keine anerkannte berufliche Qualifikation.",
    download: "Herunterladen", print: "Drucken / Als PDF speichern", fileName: "WPMTest-Zertifikat-Deutsch"
  }
};

export const portugueseTypingContent: LocalizedTypingContent = {
  lang: "pt", locale: "pt-BR", path: "/pt/teste-de-digitacao/",
  title: "Teste de digitação grátis em português brasileiro | WPMTest",
  description: "Teste sua velocidade de digitação em português brasileiro com acentos e ç. Confira PPM, precisão, teclado ABNT2 e certificado gratuito.",
  h1: "Teste de digitação em português brasileiro",
  eyebrow: "GRÁTIS · SEM CADASTRO · RESULTADOS PRIVADOS",
  intro: "Digite frases naturais em português brasileiro com acentos e cedilha. Acompanhe sua velocidade, precisão e constância e crie um certificado em português.",
  passages: [
    "Toda manhã, a padaria da esquina recebe os primeiros clientes. O cheiro de pão recém-assado toma conta da rua enquanto as pessoas conversam antes do trabalho.",
    "Na estação, os passageiros conferem o horário do próximo trem. Uma mensagem avisa que a plataforma mudou, e todos procuram as informações no painel.",
    "Para digitar com confiança, é melhor manter um ritmo confortável. Acentos, espaços e pontuação fazem parte do texto; a precisão vem antes da pressa.",
    "No sábado, João foi à feira comprar maçãs, mamão e café. Ele perguntou quanto custava a dúzia e anotou o preço antes de voltar para casa.",
    "Depois do almoço, Ana escreveu um e-mail para a equipe. Uma revisão rápida ajudou a corrigir uma palavra e deixou a mensagem clara para todos."
  ],
  nav: { home: "Página inicial do WPMTest", languageLabel: "Mudar idioma", privacy: "Privacidade", terms: "Termos de uso",
    languages: { en: "English", fr: "Français", it: "Italiano", hi: "हिन्दी", es: "Español", de: "Deutsch", pt: "Português", ru: "Русский" } },
  ui: {
    testHeading: "Comece o teste de digitação", testIntro: "Escolha a duração, ative o teclado em português e copie o texto exatamente.",
    durationLabel: "Duração do teste", durations: { 60: "1 minuto", 180: "3 minutos", 300: "5 minutos" },
    restart: "Reiniciar", startHint: "Toque no texto ou no campo de entrada e comece a digitar. O tempo começa na primeira tecla.",
    mobileNote: "No celular, selecione o teclado em português do aparelho. Use um teclado físico para treinar a técnica de digitação no computador.",
    inputLabel: "Campo de digitação em português", inputPlaceholder: "Toque aqui para abrir o teclado",
    wpm: "PPM", accuracy: "Precisão", consistency: "Constância", time: "Tempo", remaining: "Restante",
    complete: "Teste concluído", resultHeading: "{wpm} PPM · {accuracy}% de precisão", rawWpm: "PPM brutas",
    errors: "Erros", characters: "Caracteres", tryAgain: "Fazer novamente",
    certificateButton: "Criar certificado em português", close: "Fechar"
  },
  keyboard: {
    heading: "Teclado brasileiro ABNT2", name: "Layout brasileiro ABNT2",
    rows: [
      ["'", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´", "["],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç", "~", "]"],
      ["\\", "Z", "X", "C", "V", "B", "N", "M", ",", ".", ";", "/"]
    ],
    intro: "O ABNT2 brasileiro segue a ordem QWERTY, tem tecla dedicada para Ç e usa teclas de acento antes das vogais. O teclado de Portugal não é idêntico ao brasileiro.",
    steps: [
      "Windows: Configurações → Hora e idioma → Idioma e região → Português (Brasil) → teclado ABNT2.",
      "macOS: Ajustes do Sistema → Teclado → Fontes de Entrada → Português (Brasil).",
      "iPhone ou Android: adicione Português (Brasil) nas configurações do teclado e alterne pela tecla de globo."
    ],
    note: "A ilustração mostra as letras e teclas principais do ABNT2; símbolos podem variar conforme o aparelho. A página não altera o layout do seu teclado."
  },
  guide: [
    { heading: "Como a velocidade é calculada", paragraphs: [
      "Cada cinco caracteres, incluindo espaços, equivalem a uma palavra padrão. Essa convenção permite comparar textos de comprimentos diferentes.",
      "A precisão considera se cada caractere corresponde ao original. Uma letra sem acento, um Ç ausente ou um sinal diferente é registrado como erro."
    ] },
    { heading: "Treine com frases em português", paragraphs: [
      "Os textos usam acentos, cedilha e pontuação comuns em mensagens e documentos do dia a dia. Frases completas ajudam a treinar uma escrita prática.",
      "Comece com um minuto e priorize a precisão. Quando se sentir confortável, escolha três ou cinco minutos para avaliar sua constância."
    ] }
  ],
  faqHeading: "Perguntas frequentes",
  faqs: [
    { question: "Preciso de um teclado ABNT2?", answer: "É recomendado para quem usa português brasileiro, mas qualquer teclado que produza os caracteres apresentados pode fazer o teste." },
    { question: "Esse teste usa português do Brasil ou de Portugal?", answer: "Os textos e a ilustração do teclado usam português brasileiro e o layout ABNT2. O layout de Portugal é diferente." },
    { question: "Os acentos e o Ç contam como erros?", answer: "Sim. Á e A são caracteres diferentes; a palavra precisa corresponder ao texto exibido." },
    { question: "O que significa PPM?", answer: "Palavras por minuto. O cálculo usa uma palavra padrão de cinco caracteres, incluindo espaços." },
    { question: "Posso fazer o teste no celular?", answer: "Sim. Ative o teclado em português no aparelho. O resultado no celular mede digitação em tela sensível ao toque." },
    { question: "Como melhorar minha precisão?", answer: "Digite com calma, revise a posição das teclas de acento e pratique com sessões curtas e frequentes." },
    { question: "O certificado é oficial?", answer: "Não. Ele registra seu resultado no WPMTest, mas não substitui uma avaliação profissional reconhecida." }
  ],
  footer: "Teste de digitação em português brasileiro · Resultados locais · Sem cadastro",
  certificate: {
    dialogTitle: "Crie seu certificado de digitação", dialogIntro: "Digite o nome que aparecerá no certificado.",
    nameLabel: "Seu nome", namePlaceholder: "Nome completo", generate: "Gerar certificado",
    titleTop: "CERTIFICADO DE", titleMain: "DIGITAÇÃO", certifies: "CERTIFICAMOS QUE",
    statement: "concluiu um teste de digitação em português no WPMTest com os seguintes resultados:",
    speedLabel: "PALAVRAS POR MINUTO", accuracyLabel: "PRECISÃO", testLabel: "TESTE", dateLabel: "DATA",
    testName: "Teste em português", motto: "PRATICAR É PROGREDIR",
    disclaimer: "Este certificado registra um resultado obtido no WPMTest; não é uma certificação profissional reconhecida.",
    download: "Baixar", print: "Imprimir / Salvar como PDF", fileName: "Certificado-WPMTest-portugues"
  }
};

export const russianTypingContent: LocalizedTypingContent = {
  lang: "ru", locale: "ru-RU", path: "/ru/test-skorosti-pechati/",
  title: "Бесплатный тест скорости печати на русском | WPMTest",
  description: "Проверьте скорость и точность печати на русском языке. Тексты с кириллицей, схема раскладки ЙЦУКЕН и сертификат с результатом.",
  h1: "Тест скорости печати на русском языке",
  eyebrow: "БЕСПЛАТНО · БЕЗ РЕГИСТРАЦИИ · ЛИЧНЫЙ РЕЗУЛЬТАТ",
  intro: "Печатайте естественные русские предложения с кириллицей и знаками препинания. Узнайте свою скорость и точность, а затем создайте сертификат на русском языке.",
  passages: [
    "Утром во дворе открылось небольшое кафе. Первые посетители заказали чай и свежие булочки, а потом обсудили планы на день.",
    "На вокзале пассажиры смотрели на табло и искали нужную платформу. Объявление прозвучало дважды, поэтому никто не пропустил свой поезд.",
    "Чтобы научиться печатать быстрее, важно сохранять спокойный ритм. Сначала проверьте буквы и пробелы, затем постепенно увеличивайте скорость.",
    "В субботу семья пошла на рынок за яблоками, хлебом и овощами. Продавец улыбнулся и спросил, нужен ли им пакет.",
    "После прогулки Мария открыла ноутбук и ответила на письмо. Она внимательно перечитала сообщение, исправила ошибку и нажала кнопку отправки."
  ],
  nav: { home: "Главная страница WPMTest", languageLabel: "Выбрать язык", privacy: "Конфиденциальность", terms: "Условия использования",
    languages: { en: "English", fr: "Français", it: "Italiano", hi: "हिन्दी", es: "Español", de: "Deutsch", pt: "Português", ru: "Русский" } },
  ui: {
    testHeading: "Начать тест печати", testIntro: "Выберите длительность, включите русскую раскладку и перепечатайте текст точно.",
    durationLabel: "Длительность теста", durations: { 60: "1 минута", 180: "3 минуты", 300: "5 минут" },
    restart: "Начать заново", startHint: "Нажмите на текст или поле ввода и начинайте печатать. Отсчёт начнётся с первого символа.",
    mobileNote: "На телефоне выберите русскую экранную клавиатуру. Для тренировки печати на компьютере используйте физическую клавиатуру.",
    inputLabel: "Поле ввода для теста на русском", inputPlaceholder: "Нажмите, чтобы открыть клавиатуру",
    wpm: "СЛ/МИН", accuracy: "Точность", consistency: "Равномерность", time: "Время", remaining: "Осталось",
    complete: "Тест завершён", resultHeading: "{wpm} сл/мин · точность {accuracy} %", rawWpm: "Скорость без учёта ошибок",
    errors: "Ошибки", characters: "Символы", tryAgain: "Повторить тест",
    certificateButton: "Создать сертификат", close: "Закрыть"
  },
  keyboard: {
    heading: "Русская раскладка ЙЦУКЕН", name: "Русская раскладка ЙЦУКЕН",
    rows: [
      ["Ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
      ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
      ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
      ["Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", ","]
    ],
    intro: "ЙЦУКЕН — распространённая русская раскладка. Буквы расположены иначе, чем в латинском QWERTY; клавиша Ё обычно находится слева от цифры 1.",
    steps: [
      "Windows: Параметры → Время и язык → Язык и регион → Русский → клавиатура.",
      "macOS: Системные настройки → Клавиатура → Источники ввода → Русский.",
      "iPhone или Android: добавьте русский язык в настройки клавиатуры и переключитесь с помощью значка глобуса."
    ],
    note: "Схема показывает обычную раскладку ЙЦУКЕН. Сайт не может переключить клавиатуру устройства и проверяет символы, которые вы ввели."
  },
  guide: [
    { heading: "Как рассчитывается скорость", paragraphs: [
      "За одно условное слово принимаются пять символов, включая пробелы. Такой способ позволяет сравнивать результаты разных текстов.",
      "Точность показывает долю символов, совпадающих с образцом. Неправильная буква, пропущенный пробел или другой знак препинания учитывается как ошибка."
    ] },
    { heading: "Практика на русском языке", paragraphs: [
      "Предложения включают кириллицу, прописные буквы и обычную пунктуацию. Они похожи на тексты из сообщений и рабочих документов.",
      "Начните с одной минуты в удобном темпе. Затем увеличьте длительность до трёх или пяти минут и следите, чтобы точность оставалась высокой."
    ] }
  ],
  faqHeading: "Частые вопросы",
  faqs: [
    { question: "Нужна ли раскладка ЙЦУКЕН?", answer: "Она удобна для русского текста. Подойдёт и другая раскладка, если она позволяет вводить те же символы кириллицы." },
    { question: "Как включить русскую клавиатуру?", answer: "Добавьте русский язык в настройках клавиатуры Windows, macOS, iOS или Android, затем переключите язык ввода." },
    { question: "Учитываются ли буква Ё и знаки препинания?", answer: "Да. Ё и Е — разные символы, а знаки препинания должны совпадать с исходным текстом." },
    { question: "Что означает сл/мин?", answer: "Количество условных слов в минуту. Одно условное слово равно пяти введённым символам вместе с пробелами." },
    { question: "Можно ли проходить тест на телефоне?", answer: "Да. Выберите русскую экранную клавиатуру. Скорость на сенсорном экране может отличаться от скорости на физической клавиатуре." },
    { question: "Как улучшить точность?", answer: "Печатайте чуть медленнее и тренируйтесь короткими сериями. Обращайте внимание на пробелы, прописные буквы и пунктуацию." },
    { question: "Сертификат официальный?", answer: "Нет. Он фиксирует результат теста WPMTest и не заменяет профессиональную аттестацию." }
  ],
  footer: "Бесплатный тест печати · Результаты в браузере · Без регистрации",
  certificate: {
    dialogTitle: "Создать сертификат печати", dialogIntro: "Введите имя, которое будет указано в сертификате.",
    nameLabel: "Ваше имя", namePlaceholder: "Имя и фамилия", generate: "Создать сертификат",
    titleTop: "СЕРТИФИКАТ", titleMain: "СКОРОСТЬ ПЕЧАТИ", certifies: "ПОДТВЕРЖДАЕТСЯ, ЧТО",
    statement: "прошёл тест печати на русском языке в WPMTest со следующими результатами:",
    speedLabel: "СЛОВ В МИНУТУ", accuracyLabel: "ТОЧНОСТЬ", testLabel: "ТЕСТ", dateLabel: "ДАТА",
    testName: "Тест на русском", motto: "ПРАКТИКА ПОМОГАЕТ РАСТИ",
    disclaimer: "Сертификат подтверждает результат на WPMTest и не является официальным документом о квалификации.",
    download: "Скачать", print: "Печать / Сохранить в PDF", fileName: "WPMTest-Sertifikat-Russkiy"
  }
};
