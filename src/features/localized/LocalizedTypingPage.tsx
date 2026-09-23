import LocalizedTypingTest from "./LocalizedTypingTest";
import type { LocalizedTypingContent } from "./content";
import { typingTestLanguagePaths } from "../../lib/seo/localized";
import styles from "./LocalizedTypingPage.module.css";

const mobileQuestions = {
  fr: "Puis-je m'entraîner sur mon téléphone ?",
  it: "Posso esercitarmi sul telefono?",
  hi: "क्या मैं फ़ोन पर टाइपिंग का अभ्यास कर सकता हूँ?",
  es: "¿Puedo practicar en mi teléfono?",
  de: "Kann ich auf dem Smartphone üben?",
  pt: "Posso praticar no celular?",
  ru: "Можно ли тренироваться на телефоне?"
};

export default function LocalizedTypingPage({ content }: { content: LocalizedTypingContent }) {
  return (
    <main className={styles.page} lang={content.lang}>
      <header className={styles.siteHeader}>
        <a className={styles.brand} href="/" aria-label={content.nav.home}>WPM<span>Test</span></a>
        <nav aria-label={content.nav.languageLabel}>
          <details className={styles.languageMenu}>
            <summary aria-label={content.nav.languageLabel}>{content.nav.languages[content.lang]}</summary>
            <div>
              {(Object.keys(typingTestLanguagePaths) as Array<keyof typeof typingTestLanguagePaths>).map((language) => (
                <a
                  className={language === content.lang ? styles.currentLanguage : ""}
                  href={typingTestLanguagePaths[language]}
                  hrefLang={language === "pt" ? "pt-BR" : language}
                  lang={language === "pt" ? "pt-BR" : language}
                  aria-current={language === content.lang ? "page" : undefined}
                  key={language}
                >{content.nav.languages[language]}</a>
              ))}
            </div>
          </details>
        </nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h1>{content.h1}</h1>
        <p>{content.intro}</p>
      </section>

      <LocalizedTypingTest content={content} />

      <section className={styles.keyboardSection} aria-labelledby={`${content.lang}-keyboard-heading`}>
        <div>
          <p className={styles.eyebrow}>{content.keyboard.name}</p>
          <h2 id={`${content.lang}-keyboard-heading`}>{content.keyboard.heading}</h2>
          <p>{content.keyboard.intro}</p>
          <ol>{content.keyboard.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p className={styles.keyboardNote}>{content.keyboard.note}</p>
        </div>
        <div className={styles.keyboard} aria-label={content.keyboard.name}>
          {content.keyboard.rows.map((row, rowIndex) => (
            <div className={styles.keyboardRow} key={rowIndex}>
              {row.map((key, keyIndex) => <span className={key.length > 5 ? styles.wideKey : ""} key={`${key}-${keyIndex}`}>{key}</span>)}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.guideGrid}>
        {content.guide.map((section) => (
          <section className={styles.guideCard} key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
      </div>

      <section className={styles.faq} aria-labelledby={`${content.lang}-faq-heading`}>
        <h2 id={`${content.lang}-faq-heading`}>{content.faqHeading}</h2>
        {content.faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
        <details>
          <summary>{mobileQuestions[content.lang as keyof typeof mobileQuestions]}</summary>
          <p>{content.ui.mobileNote}</p>
        </details>
      </section>

      <footer className={styles.footer}>
        <strong>WPMTest</strong>
        <span>{content.footer}</span>
        <nav aria-label={content.nav.languageLabel}>
          <a href="/privacy/">{content.nav.privacy}</a>
          <a href="/terms/">{content.nav.terms}</a>
        </nav>
      </footer>
    </main>
  );
}
