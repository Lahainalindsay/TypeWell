import {glossikaAffiliateUrl,glossikaArticlePath,glossikaDisclosure,glossikaAccessNote,glossikaCourses} from './glossika';
import styles from './GlossikaCard.module.css';
export default function GlossikaCard({id,name}:{id?:string;name?:string}) {
 const course=id?glossikaCourses[id]:undefined;
 if(id&&!course&&!name)return null;
 const label=course?.name??name;
 return <aside className={styles.card} lang="en" aria-label="Glossika affiliate learning resource">
  <div className={styles.brand}><img className={styles.logo} src="/images/partners/glossika-owl.png" width="64" height="64" alt="Glossika owl logo" loading="lazy"/><span className={styles.label}>Our language-learning affiliate partner</span></div>
  <h2>{label?`Give your ${label} practice a voice`:'From written practice to spoken sentences'}</h2>
  <p>{course?.focus??`Explore ${label?label+' listening and speaking':'sentence-based language training'} with Glossika, using audio and spaced review alongside your keyboard practice.`}</p>
  <p className={styles.disclosure}>{glossikaDisclosure}</p>
  <a className={styles.button} href={glossikaAffiliateUrl} rel="sponsored noopener noreferrer" target="_blank">Explore Glossika{label?` · choose ${label}`:''} →</a>
  <p className={styles.note}>{label&&(!course||!course.free)?`${label} is outside the nine-course free list. `:''}{glossikaAccessNote}</p>
  <p><a href={glossikaArticlePath}>How Glossika works, course guide, and our partnership →</a></p>
 </aside>;
}
