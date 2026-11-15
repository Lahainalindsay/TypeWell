import { breadcrumbList } from "../lib/seo/structured";

export type Crumb = { name: string; url: string };

export function Breadcrumbs({ items, homeName = "Home", includeSchema = true }: { items: readonly Crumb[]; homeName?: string; includeSchema?: boolean }) {
  const trail = [{ name: homeName, url: "/" }, ...items];
  return <>
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map(({ name, url }, index) => <li key={url}>
          {index === trail.length - 1 ? <span aria-current="page">{name}</span> : <a href={url}>{name}</a>}
        </li>)}
      </ol>
    </nav>
    {includeSchema && <JsonLd data={breadcrumbList(trail)} />}
  </>;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c"),
  }} />;
}
