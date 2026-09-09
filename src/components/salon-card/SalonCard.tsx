import Link from "next/link";
import type { Salon } from "@/data/salons";
import { EditorialImage } from "@/components/editorial-image/EditorialImage";
import styles from "./salon-card.module.css";

type SalonCardProps = {
  salon: Salon;
};

export function SalonCard({
  salon,
}: SalonCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <EditorialImage
          image={salon.heroImage}
          sizes="(max-width: 899px) 100vw, 33vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.location}>
          {salon.locationLabel}
        </p>

        <h3 className={styles.tagline}>
          {salon.tagline}
        </h3>

        <p className={styles.specialties}>
          {salon.specialties.join(" / ")}
        </p>

        <Link
          href={`/salon/${salon.slug}`}
          className={styles.link}
        >
          VIEW {salon.locationLabel} →
        </Link>
      </div>
    </article>
  );
}