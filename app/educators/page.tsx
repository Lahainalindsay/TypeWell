import type { Metadata } from "next";
import { absoluteUrl } from "../../src/lib/seo/site";

const canonical = absoluteUrl("/educators/");
const ogImage = absoluteUrl("/og-default.svg");

export const metadata: Metadata = {
  title: "Typing for Educators – Classroom Typing Lessons & Games | WPMTest",
  description: "Explore WPMTest for educators: classroom typing lessons, student practice, typing games, progress tracking, assignments and certificates. Classroom tools coming soon.",
  alternates: { canonical },
  openGraph: {
    title: "Typing for Educators – Classroom Typing Lessons & Games | WPMTest",
    description: "Explore WPMTest for educators: classroom typing lessons, student practice, typing games, progress tracking, assignments and certificates. Classroom tools coming soon.",
    url: canonical,
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "WPMTest typing tools" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing for Educators – Classroom Typing Lessons & Games | WPMTest",
    description: "Explore WPMTest for educators: classroom typing lessons, student practice, typing games, progress tracking, assignments and certificates. Classroom tools coming soon.",
    images: [ogImage]
  },
  robots: { index: true, follow: true }
};

const features = [
  ["Classroom Typing Races", "Students race by typing accurately while boats, cars or other racers move with their correct progress."],
  ["Student Progress", "Give teachers a simple view of speed, accuracy, lesson completion and improvement over time."],
  ["Assignments", "Assign lessons, practice topics, custom text or typing tests to a class."],
  ["Subject-Based Practice", "Let students practice keyboarding while typing age-appropriate science, history, astronomy and other educational topics."],
  ["Custom Classroom Text", "Teachers can provide class material for students to practice typing without turning every session into a timed test."],
  ["Kids Certificates", "Celebrate completed tests, lessons and milestones with classroom-friendly typing certificates."]
];

export default function EducatorsPage() {
  return <main className="tw-standalone">
    <span className="tw-kicker">Coming soon</span>
    <h1>Typing for Educators</h1>
    <p className="lead">A classroom-friendly typing experience is in development for teachers and students, combining structured keyboarding lessons, engaging practice, progress tools and multiplayer-style typing races.</p>
    <div className="tw-standalone-grid">
      {features.map(([title,text]) => <article className="tw-standalone-card" key={title}><h2>{title}</h2><p>{text}</p></article>)}
    </div>
    <section className="tw-coming"><h2>Use WPMTest now</h2><p>The free typing test, open-ended practice, touch-typing lessons, rhythm trainer and typing games are available now while the classroom management tools are being built.</p><p><a href="/typing-practice/">Start typing practice</a> · <a href="/learn/">Explore typing lessons</a> · <a href="/typing-games/">Play typing games</a></p></section>
  </main>;
}
