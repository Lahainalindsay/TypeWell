import photos from './hawaiianPhotos.json';
import { Photo } from './Photo';
import styles from '../../../app/blog/hawaiian-language-revival/article.module.css';

export default function HawaiianPhotoEssay({ chapter }: { chapter: number }) {
  if (chapter === 1) return <aside className={styles.photoEssay} aria-labelledby="waialee-photo-title">
    <header><p className={styles.eyebrow}>The institutional record</p><h3 id="waialee-photo-title">Waialeʻe: the place behind the record</h3><p>The archival photograph and the building’s exterior bring a physical place into the historical account.</p></header>
    <div className={styles.archivePair}><Photo photo={photos['waialee-historical']} /><Photo photo={photos['waialee-building']} /></div>
    <p className={styles.contextNote}>The community research project <a href="https://naleipoinaole.com/blog/restoring-relationships-for-l-hoihoi-ea">Nā Lei Poina ʻOle</a> places Waialeʻe within a history of incarceration, separation, and institutional harm. Photographs are a point of entry; the records and people’s experiences give them context.</p>
  </aside>;
  if (chapter === 2) return <aside className={`${styles.photoEssay} ${styles.learningEssay}`} aria-labelledby="learning-photo-title">
    <header><p className={styles.eyebrow}>People make renewal possible</p><h3 id="learning-photo-title">A language needs someone to answer.</h3><p>A classroom, a book, a conversation: the spaces of learning matter because of the people who bring them to life.</p></header>
    <Photo photo={photos['learning-together']} />
  </aside>;
  if (chapter === 3) return <aside className={styles.photoEssay} aria-labelledby="community-photo-title">
    <header><p className={styles.eyebrow}>Beyond a single classroom</p><h3 id="community-photo-title">Learning, culture, and the next generation</h3><p>Language renewal reaches into relationships, cultural practice, and everyday life. The next generation needs opportunities to learn, participate, and belong.</p></header>
    <div className={styles.communityGallery}><Photo photo={photos['learning-on-the-land']} /><Photo photo={photos['culture-and-community']} /><Photo photo={photos['next-generation']} /></div>
  </aside>;
  return null;
}
