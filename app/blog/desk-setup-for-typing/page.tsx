import type { Metadata } from "next";
import { AuthorByline } from "../../../src/features/editorial/ArticleVisual";
import styles from "../../../src/features/editorial/editorial.module.css";
import { absoluteUrl } from "../../../src/lib/seo/site";

const title = "Set Yourself Up for Success: A Desk That Works With You";
const description = "Set up your desk for typing at school or work. Adjust your chair, keyboard, lighting, and papers before deciding which accessories you need.";
const url = absoluteUrl("/blog/desk-setup-for-typing/");

export const metadata: Metadata = {
  title: `${title} | WPMTest`,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article", images: ["/images/typing-editorial-desk.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/typing-editorial-desk.webp"] }
};

function AmazonLink({ href, product }: { href: string; product: string }) {
  return <a href={href} rel="sponsored">See {product} on Amazon (paid link)</a>;
}

export default function DeskSetupPage() {
  return <main id="main-content" tabIndex={-1} className={styles.page}>
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Articles</a> › <span>Desk setup</span></nav>
    <article>
      <header className={styles.header}>
        <h1>{title}</h1>
        <p>A practical desk setup for school, work, and typing practice. Start with what you already have, then buy only what solves a problem.</p>
        <AuthorByline date="2026-11-13" />
      </header>
      <div className={styles.body}>
        <p>As an Amazon Associate I earn from qualifying purchases.</p>
        <p>Try this before buying anything. Sit down, let your shoulders drop, and reach for your keyboard. If the reach pulls your elbows forward or bends your wrists up, bring the keyboard closer or adjust its height. Your desk doesn’t need a makeover for that to make a difference.</p>

        <section>
          <h2>Start with the chair</h2>
          <p>Adjust your seat so your feet rest flat on the floor or on a footrest. Sit back and check whether the armrests let you move close enough to reach the keyboard. If they hit the desk first, check whether they can be lowered or moved out of the way.</p>
          <p><AmazonLink href="https://link.amazon/B07QjEfRC" product="the office chair with lumbar support and a headrest" /></p>
        </section>

        <section>
          <h2>Make room for the keyboard and pointer</h2>
          <p>Center the part of the keyboard you type on. Keep the mouse within easy reach. If your desktop is too high, a slide-out tray can move both down. Measure your desk edge, the space available under it, and your keyboard and mouse together before buying a tray.</p>
          <p><AmazonLink href="https://www.amazon.com/dp/B0DCFZV2GP?tag=islandtech04-20" product="the under-desk slide-out keyboard platform" /></p>
          <p>A compact keyboard can free up mouse space. A built-in touchpad can also be handy on a small desk. If you regularly enter columns of numbers, leave room for a number pad.</p>
          <p><AmazonLink href="https://link.amazon/B05m8GSt6" product="the Arteck Bluetooth keyboard with touchpad" /></p>
        </section>

        <section>
          <h2>Use padding where you actually need it</h2>
          <p>A keyboard rest gives your palms somewhere to land during pauses. If the desk edge digs into your forearms, a cushion fitted to the edge addresses that spot. Check the height of either accessory against your keyboard so your wrists can stay in line with your forearms.</p>
          <ul>
            <li><AmazonLink href="https://link.amazon/B0cPfK7w9" product="the Vaydeer memory-foam wrist rest" /></li>
            <li><AmazonLink href="https://link.amazon/B0fYQgNUs" product="the MILENTII desk-edge cushion" /></li>
          </ul>
        </section>

        <section>
          <h2>Put papers and light where you need them</h2>
          <p>If you copy from paper, try propping the page beside your screen at a similar height and distance. For a quick test, use a clipboard and a bookstand you already own. Aim a desk lamp at the page and move it if it reflects off the screen.</p>
        </section>

        <section>
          <h2>Give the setup a one-minute trial</h2>
          <p>Take a <a href="/1-minute-typing-test/">one-minute typing test</a>. Notice where you reach, which hand moves farthest, and whether your chair still feels right once you start typing. Change one thing and repeat with the same test duration before deciding what to keep.</p>
          <p>See OSHA’s workstation guidance for <a href="https://www.osha.gov/etools/computer-workstations/components/keyboards/">keyboard placement</a>, <a href="https://www.osha.gov/etools/computer-workstations/components/document-holders">document holders</a>, and <a href="https://www.osha.gov/etools/computer-workstations/workstation-environment">lighting</a>.</p>
        </section>
      </div>
    </article>
  </main>;
}
