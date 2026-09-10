import { EditorialImage } from "@/components/editorial-image/EditorialImage";
import type { HairStyle } from "@/data/styles";
import styles from "./style-card.module.css";

type StyleCardProps = {
  style: HairStyle;
  staffName: string;
  salonLabel: string;
};

export function StyleCard({
  style,
  staffName,
  salonLabel,
}: StyleCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <EditorialImage
          image={style.image}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.category}>{style.category}</p>
        <h2 className={styles.title}>{style.title}</h2>
        <p className={styles.description}>{style.description}</p>
        <p className={styles.details}>
          {staffName} / {salonLabel}
        </p>
      </div>
    </article>
  );
}
