import type { Metadata } from "next";
import LocalizedTypingPage from "../../../src/features/localized/LocalizedTypingPage";
import { hawaiianTypingContent as content } from "../../../src/features/localized/pacificContent";
import { localizedTypingMetadata, localizedTypingSchema } from "../../../src/features/localized/seo";

export const metadata: Metadata = localizedTypingMetadata(content);

export default function HawaiianTypingTestPage() {
  return <><LocalizedTypingPage content={content} /><aside className="seo-prerender"><h2>ʻŌlelo Hawaiʻi: a living language</h2><p><a href="/blog/hawaiian-language-revival/">Read about Hawaiian language revival, speakers, schools, and everyday practice.</a></p></aside><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedTypingSchema(content)) }} /></>;
}
