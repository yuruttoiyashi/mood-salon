import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image/EditorialImage";
import type { StaffMember } from "@/data/staff";
import type { HairStyle } from "@/data/styles";
import styles from "./staff-card.module.css";

type StaffCardProps = {
  member: StaffMember;
  salonLabel: string;
  styles: readonly HairStyle[];
};

export function StaffCard({
  member,
  salonLabel,
  styles: relatedStyles,
}: StaffCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <EditorialImage
          image={member.image}
          sizes="(max-width: 699px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.role}>{member.role}</p>
        <h2 className={styles.name}>{member.name}</h2>
        <p className={styles.salon}>{salonLabel}</p>
        <p className={styles.specialties}>
          {member.specialties.join(" / ")}
        </p>
        <p className={styles.bio}>{member.bio}</p>

        {relatedStyles.length > 0 && (
          <p className={styles.relatedStyles}>
            {relatedStyles.map((style) => style.title).join(" / ")}
          </p>
        )}

        <div className={styles.links}>
          <Link
            href={`/salon/${member.salonSlug}`}
            className={styles.link}
          >
            VIEW SALON →
          </Link>
          <Link href="/reserve" className={styles.link}>
            RESERVE →
          </Link>
        </div>
      </div>
    </article>
  );
}
