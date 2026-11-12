import styles from '../../../app/blog/hawaiian-language-revival/article.module.css';

export interface EditorialPhoto {
  src: string;
  smallSrc?: string;
  mediumSrc?: string;
  mobileSrc?: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
  creditUrl?: string;
  license?: string;
  licenseUrl?: string;
}

export function PhotoCredit({ photo }: { photo: EditorialPhoto }) {
  return <span className={styles.photoCredit}>Photo: {photo.creditUrl ? <a href={photo.creditUrl} target="_blank" rel="noopener noreferrer">{photo.credit}</a> : photo.credit}{photo.license && <> · {photo.licenseUrl ? <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a> : photo.license}</>}</span>;
}

export function Photo({ photo, priority = false, className = '', sizes = '(max-width: 700px) 100vw, (max-width: 1100px) 80vw, 1100px' }: { photo: EditorialPhoto; priority?: boolean; className?: string; sizes?: string }) {
  return <figure className={`${styles.editorialPhoto} ${className}`}>
    <picture>
      {photo.mobileSrc && <source media="(max-width: 600px)" srcSet={photo.mobileSrc} />}
      <img src={photo.src} {...responsivePhoto(photo, sizes)} alt={photo.alt} width={photo.width} height={photo.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
    </picture>
    <figcaption>{photo.caption}<PhotoCredit photo={photo} /></figcaption>
  </figure>;
}

export function responsivePhoto(photo: EditorialPhoto, sizes: string) {
  if (!photo.smallSrc || !photo.mediumSrc) return {};
  return {
    srcSet: `${photo.smallSrc} 600w, ${photo.mediumSrc} 1000w, ${photo.src} ${photo.width}w`,
    sizes: photo.mobileSrc ? "(max-width: 900px) 1000px, 1600px" : sizes
  };
}
