import { Fragment } from 'react';
import styles from '../../../app/blog/hawaiian-language-revival/article.module.css';

const inlinePattern = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\(https:\/\/[^)\s]+\))/g;

function inline(text: string): React.ReactNode {
  return text.split(inlinePattern).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{inline(part.slice(2, -2))}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{inline(part.slice(1, -1))}</em>;
    const link = /^\[([^\]]+)\]\((https:\/\/[^)\s]+)\)$/.exec(part);
    if (link) return <a key={index} href={link[2].replace(/^https:\/\/wpmtest\.app\//, '/')} rel={link[2].startsWith('https://ai.glossika.com/r/') ? 'sponsored' : undefined}>{link[1]}</a>;
    if (part === 'Practice Hawaiian typing →') return <a key={index} href="/haw/hawaiian-typing-test/">{part}</a>;
    return part;
  });
}

export default function ReviewCopy({ body }: { body: string }) {
  const blocks = body.replace(/^---[ \t]*$/gm, '').trim().split(/\n\s*\n/);
  return <>{blocks.map((block, index) => {
    if (block.startsWith('### ')) return <h3 key={index}>{inline(block.slice(4))}</h3>;
    if (/^\d+\. /.test(block)) {
      if (/^\d+\. /.test(blocks[index - 1] ?? '')) return null;
      const items = [];
      for (let cursor = index; cursor < blocks.length && /^\d+\. /.test(blocks[cursor]); cursor++) {
        items.push(...blocks[cursor].split(/\n(?=\d+\. )/).map(item => item.replace(/^\d+\. /, '')));
      }
      return <ol key={index}>{items.map(item => <li key={item}>{inline(item)}</li>)}</ol>;
    }
    const lines = block.split(/ {2,}\n/);
    return <p key={index}>{lines.map((line, lineIndex) => <Fragment key={lineIndex}>{lineIndex > 0 && <br />}{inline(line)}</Fragment>)}</p>;
  })}</>;
}

export function reviewSectionId(heading: string, index: number) {
  if (heading.startsWith('Turning Points')) return 'timeline';
  if (heading.startsWith('Practise ')) return 'practice';
  if (heading.startsWith('Sources, ')) return 'sources';
  return `history-${index}`;
}

export function reviewSectionClass(heading: string) {
  if (heading.startsWith('Turning Points')) return styles.timelineSection;
  if (heading.startsWith('Practise ')) return styles.writingPanel;
  if (heading.startsWith('Sources, ')) return styles.editorialSources;
  return styles.storyChapter;
}
