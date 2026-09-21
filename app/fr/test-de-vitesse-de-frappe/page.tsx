import type { Metadata } from "next";
import LocalizedTypingPage from "../../../src/features/localized/LocalizedTypingPage";
import { frenchTypingContent as content } from "../../../src/features/localized/content";
import { localizedTypingMetadata, localizedTypingSchema } from "../../../src/features/localized/seo";

export const metadata: Metadata = localizedTypingMetadata(content);

export default function FrenchTypingTestPage() {
  return <><LocalizedTypingPage content={content} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedTypingSchema(content)) }} /></>;
}
