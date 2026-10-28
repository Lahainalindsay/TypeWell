import type { Metadata } from "next";
import WPMTestApp from "../../src/ClientApp";
import { absoluteUrl } from "../../src/lib/seo/site";
const title = "Typing Personality Test | Discover Your Keyboard Alter Ego";
const description = "Take a typing test and reveal your typing personality on a playful baseball card based on your speed, accuracy and consistency.";
export const metadata: Metadata = {title,description,alternates:{canonical:absoluteUrl("/typing-personality-test/")},openGraph:{title,description,images:[absoluteUrl("/images/typing-personality.webp")]}};
export default function PersonalityTest() {return <><WPMTestApp initialPath="/typing-personality-test/" /><section className="seo-prerender"><h2>Your keyboard alter ego awaits</h2><p>Type the passage to start. Finish the test to reveal your personality card, complete with your speed and accuracy. Retake it to see how your result changes.</p><p>Based on this attempt’s performance. Just for fun.</p><a href="/blog/typing-personality-test/">Find out why your typing results are judging you →</a></section></>;}
