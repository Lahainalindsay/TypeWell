export type ArticleCategory = "Guides" | "Data entry" | "Comparisons" | "Language revival" | "Fun";

type Thumbnail = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ArticleCardProps = {
  href: string;
  title: string;
  description: string;
  category: ArticleCategory;
  date: string;
  image: Thumbnail;
  affiliate?: boolean;
};

const displayDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

export function ArticleCard({ href, title, description, category, date, image, affiliate }: ArticleCardProps) {
  return <article className="article-card">
    <a href={href} className="article-card-link">
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
      <div className="article-card-copy">
        <p className="article-card-meta">{category} <span aria-hidden="true">·</span> <time dateTime={date}>{displayDate.format(new Date(date))}</time></p>
        {affiliate && <p className="article-card-affiliate">Contains affiliate links</p>}
        <h2>{title}</h2>
        <p>{description}</p>
        <span className="article-card-action">Read <span aria-hidden="true">→</span></span>
      </div>
    </a>
  </article>;
}
