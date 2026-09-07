import { PageHero } from "@/components/page-hero/PageHero";
import { TextLink } from "@/components/text-link/TextLink";
import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <PageHero
            eyebrow="TOKYO / SHIBUYA · OMOTESANDO · SHINJUKU"
            title="MOOD."
            subtitle="BE YOUR OWN MOOD."
          />

          <div className={styles.heroBottom}>
            <p className={styles.copy}>
              派手も、透明感も、ツヤも。
              <br />
              なりたい雰囲気を、髪から。
            </p>

            <TextLink href="/reserve">
              RESERVE
            </TextLink>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <p className={styles.introLabel}>
          COLOR / EXTENSION / REPAIR / HOME CARE
        </p>

        <p className={styles.introText}>
  <span>自分らしさは、ひとつじゃない。</span>
  <span>その日の気分も、なりたい自分も、</span>
  <span>髪から自由にデザインする。</span>
</p>
      </section>
    </>
  );
}