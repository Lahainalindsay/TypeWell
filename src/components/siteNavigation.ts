import { typingTestLanguagePaths } from "../lib/seo/localized";

const linkStandardTypingTest = ["/", "Standard Typing Test"] as const;
const linkMinuteTest = ["/1-minute-typing-test/", "1 Minute Test"] as const;
const linkMinuteTest3 = ["/3-minute-typing-test/", "3 Minute Test"] as const;
const linkMinuteTest5 = ["/5-minute-typing-test/", "5 Minute Test"] as const;
const linkMinuteTest10 = ["/10-minute-typing-test/", "10 Minute Test"] as const;
const linkTypingPersonalityTest = ["/typing-personality-test/", "Typing Personality Test"] as const;
const linkPageTypingTests = ["/1-page-typing-test/", "Page Typing Tests"] as const;
const linkNumbersTest = ["/typing-test-with-numbers/", "Numbers Test"] as const;
const linkPunctuationTest = ["/typing-test-with-punctuation/", "Punctuation Test"] as const;
const linkMobileTypingTest = ["/mobile-typing-test/", "Mobile Typing Test"] as const;
const linkEmploymentTypingTest = ["/typing-test-for-employment/", "Employment Typing Test"] as const;
const linkDataEntryTypingTest = ["/data-entry-typing-test/", "Data Entry Typing Test"] as const;
const linkCustomerServiceTypingTest = ["/customer-service-typing-test/", "Customer Service Typing Test"] as const;
const linkKeyTypingTest = ["/10-key-typing-test/", "10-Key Typing Test"] as const;
const linkKphTypingTest = ["/kph-typing-test/", "KPH Typing Test"] as const;
const linkAlphanumeric = ["/data-entry-practice/alphanumeric/", "Alphanumeric"] as const;
const linkNamesAddresses = ["/data-entry-practice/names-addresses/", "Names & Addresses"] as const;
const linkCurrencyDates = ["/data-entry-practice/currency-dates/", "Currency & Dates"] as const;
const linkInvoicesOrders = ["/data-entry-practice/invoices-orders/", "Invoices & Orders"] as const;
const linkProfessionalTypingTests = ["/professionals/", "Professional Typing Tests"] as const;
const linkTypingPractice = ["/typing-practice/", "Typing Practice"] as const;
const linkTouchTypingLessons = ["/learn/", "Touch Typing Lessons"] as const;
const linkWeakKeyPractice = ["/practice/weak-keys/", "Weak-Key Practice"] as const;
const linkTypingGames = ["/typing-games/", "Typing Games"] as const;
const linkRhythmTrainer = ["/rhythm/", "Rhythm Trainer"] as const;
const linkProgress = ["/progress/", "Progress"] as const;
const enLanguage = [typingTestLanguagePaths.en, "English"] as const;
const frLanguage = [typingTestLanguagePaths.fr, "Français"] as const;
const itLanguage = [typingTestLanguagePaths.it, "Italiano"] as const;
const hiLanguage = [typingTestLanguagePaths.hi, "हिन्दी"] as const;
const esLanguage = [typingTestLanguagePaths.es, "Español"] as const;
const deLanguage = [typingTestLanguagePaths.de, "Deutsch"] as const;
const ptLanguage = [typingTestLanguagePaths.pt, "Português (Brasil)"] as const;
const ruLanguage = [typingTestLanguagePaths.ru, "Русский"] as const;
const filLanguage = [typingTestLanguagePaths.fil, "Filipino"] as const;
const hawLanguage = [typingTestLanguagePaths.haw, "ʻŌlelo Hawaiʻi"] as const;
const linkDataEntryPractice = ["/data-entry-practice/", "Data Entry Practice"] as const;
const linkArticles = ["/blog/", "Articles"] as const;
const linkScoringMethodology = ["/blog/wpm-vs-kph/", "Scoring Methodology"] as const;
const linkWpmCalculator = ["/wpm-calculator/", "WPM Calculator"] as const;
const linkAverageSpeed = ["/average-typing-speed/", "Average Speed"] as const;
const linkCertificate = ["/typing-certificate/", "Certificate"] as const;
const linkSampleCertificate = ["/certificate/sample/", "Sample Certificate"] as const;
const linkVerifyACertificate = ["/certificate/verify/", "Verify a Certificate"] as const;
const linkEducators = ["/educators/", "Educators"] as const;
const linkStudents = ["/typing-test-for-students/", "Students"] as const;
const linkAbout = ["/about/", "About"] as const;
const linkCorrectionsPolicy = ["/about/#corrections", "Corrections Policy"] as const;
const linkContact = ["/contact/", "Contact"] as const;
const linkPrivacy = ["/privacy/", "Privacy"] as const;
const linkTerms = ["/terms/", "Terms"] as const;
const linkSettings = ["/settings/", "Settings"] as const;
const linkLanguageRevival = ["/language-revival/", "Language Revival"] as const;

export const articlesLink = linkArticles;
export const languageRevivalLink = linkLanguageRevival;

export const navigationGroups = [
  { label: "Tests", sections: [
    { title: "Standard tests", links: [linkStandardTypingTest, linkMinuteTest, linkMinuteTest3, linkMinuteTest5, linkMinuteTest10] },
    { title: "Specialized tests", links: [linkTypingPersonalityTest, linkPageTypingTests, linkNumbersTest, linkPunctuationTest, linkMobileTypingTest] }
  ] },
  { label: "Professional", sections: [
    { title: "Professional tests", links: [linkEmploymentTypingTest, linkDataEntryTypingTest, linkCustomerServiceTypingTest, linkKeyTypingTest, linkKphTypingTest] },
    { title: "Data entry practice", links: [linkAlphanumeric, linkNamesAddresses, linkCurrencyDates, linkInvoicesOrders] }
  ], hub: linkProfessionalTypingTests },
  { label: "Practice", sections: [
    { title: "Build your skills", links: [linkTypingPractice, linkTouchTypingLessons, linkWeakKeyPractice, linkTypingGames, linkRhythmTrainer, linkProgress] }
  ] },
  { label: "Languages", sections: [
    { title: "Typing test language", links: [enLanguage, frLanguage, itLanguage, hiLanguage, esLanguage, deLanguage, ptLanguage, ruLanguage, filLanguage, hawLanguage] }
  ], hub: languageRevivalLink }
] as const;

export const footerColumns = [
  ["Typing & practice", linkStandardTypingTest, linkMinuteTest, linkMinuteTest3, linkMinuteTest5, linkPageTypingTests, linkMobileTypingTest, linkTypingPractice, linkTouchTypingLessons, linkWeakKeyPractice, linkRhythmTrainer, linkProgress],
  ["Professional & tools", linkProfessionalTypingTests, linkDataEntryTypingTest, linkCustomerServiceTypingTest, linkDataEntryPractice, linkKeyTypingTest, linkKphTypingTest, linkScoringMethodology, linkWpmCalculator, linkAverageSpeed, linkCertificate, linkSampleCertificate, linkVerifyACertificate, linkEducators, linkStudents],
  ["Articles & languages", linkArticles, linkLanguageRevival, frLanguage, itLanguage, hiLanguage, esLanguage, deLanguage, ptLanguage, ruLanguage, filLanguage, hawLanguage],
  ["Company", linkAbout, linkCorrectionsPolicy, linkContact, linkPrivacy, linkTerms, linkSettings],
] as const;
