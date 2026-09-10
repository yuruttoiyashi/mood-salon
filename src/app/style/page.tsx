import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero/PageHero";
import { StyleGallery } from "@/components/style-gallery/StyleGallery";
import { TextLink } from "@/components/text-link/TextLink";
import { hairStyles } from "@/data/styles";
import styles from "./style.module.css";

export const metadata: Metadata = {
  title: "STYLE | MOOD.",
};

export default function StylePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <PageHero
          eyebrow="STYLE COLLECTION"
          title="STYLE"
          subtitle="FIND YOUR NEXT MOOD."
        />
      </section>

      <section className={styles.intro}>
        <p className={styles.introLabel}>MOOD. LOOKBOOK</p>
        <p className={styles.introText}>
          カラー、質感、シルエットから今の気分を見つける、
          MOOD.の架空のスタイルコレクションです。
        </p>
      </section>

      <StyleGallery styles={hairStyles} />

      <section className={styles.reserve}>
        <p className={styles.reserveText}>
          気になるスタイルを、あなたらしいムードに。
        </p>
        <TextLink href="/reserve">RESERVE</TextLink>
      </section>
    </div>
  );
}
