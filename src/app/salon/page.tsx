import { PageHero } from "@/components/page-hero/PageHero";
import { SalonCard } from "@/components/salon-card/SalonCard";
import { salons } from "@/data/salons";
import styles from "./salon.module.css";

export default function SalonPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <PageHero
          eyebrow="TOKYO / 3 LOCATIONS"
          title="SALON"
          subtitle="CHOOSE YOUR PLACE."
        />
      </section>

      <section className={styles.intro}>
        <p className={styles.introLabel}>
          FIND YOUR MOOD
        </p>

        <p className={styles.introText}>
          ハイトーン、透明感、韓国スタイル。
          それぞれ違うムードを持つ3つのサロンから、
          今なりたい自分に合う場所を選んでください。
        </p>
      </section>

      <section
        className={styles.grid}
        aria-label="MOOD.店舗一覧"
      >
        {salons.map((salon) => (
          <SalonCard
            key={salon.slug}
            salon={salon}
          />
        ))}
      </section>
    </div>
  );
}