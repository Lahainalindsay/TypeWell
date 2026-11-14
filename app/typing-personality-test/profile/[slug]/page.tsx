import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { personalities } from "../../../../src/features/typingPersonality";
import { absoluteUrl } from "../../../../src/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return personalities.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = personalities.find(item => item.slug === slug);
  if (!profile) return { title: "Typing personality not found | WPMTest", robots: { index: false } };
  const title = `I'm ${profile.name}! What's Your Typing Personality? | WPMTest`;
  const description = `${profile.description} Discover your own typing personality with the free WPMTest typing personality test.`;
  const url = absoluteUrl(`/typing-personality-test/profile/${slug}/`);
  const image = absoluteUrl(`/images/personalities/${slug}.webp`);
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: image, width: 960, height: 640, alt: `${profile.name} typing personality character` }] },
    twitter: { card: "summary_large_image", title, description, images: [image] }
  };
}
export default async function SharedPersonality({ params }: Props) {
  const { slug } = await params;
  const profile = personalities.find(item => item.slug === slug);
  if (!profile) notFound();
  return <main id="main-content" tabIndex={-1} className="seo-prerender" style={{ maxWidth: 820, margin: "0 auto", padding: "2rem 1rem" }}>
    <p>WPMTEST · KEYBOARD ALL-STARS</p>
    <h1>I'm {profile.name}!</h1>
    <img src={`/images/personalities/${profile.slug}.webp`} srcSet={`/images/personalities/${profile.slug}-480.webp 480w, /images/personalities/${profile.slug}.webp 960w`} sizes="(max-width: 820px) calc(100vw - 2rem), 788px" alt={`Illustrated ${profile.name} typing personality character at a keyboard`} width={960} height={640} style={{ width: "100%", height: "auto", borderRadius: 16 }} />
    <p style={{ fontSize: "1.2rem" }}>{profile.description}</p>
    <h2>What's YOUR typing personality?</h2>
    <p>One typing test. Nine keyboard alter egos. Your speed, accuracy and consistency decide which character you get. No signup required.</p>
    <p><Link className="button primary" href="/typing-personality-test/">Take the free personality test</Link></p>
    <h2>Meet {profile.name}</h2>
    {profile.story.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    <p><strong>How this character is assigned:</strong> {profile.rule}. Results are playful editorial labels based on one typing attempt, not psychological assessments.</p>
    <p><Link href="/typing-personality-test/">Discover your own keyboard alter ego →</Link></p>
  </main>;
}
