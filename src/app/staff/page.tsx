import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero/PageHero";
import { StaffCard } from "@/components/staff-card/StaffCard";
import { getSalonBySlug } from "@/data/salons";
import { staffMembers } from "@/data/staff";
import { getHairStyleById } from "@/data/styles";
import styles from "./staff.module.css";

export const metadata: Metadata = {
  title: "STAFF | MOOD.",
  description: "Fictional staff profiles for the MOOD. salon portfolio project.",
};

export default function StaffPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <PageHero
          eyebrow="MEET THE TEAM"
          title="STAFF"
          subtitle="FIND YOUR NEXT MOOD MAKER."
        />
      </section>

      <section className={styles.intro}>
        <p className={styles.introLabel}>MOOD. PEOPLE</p>
        <p className={styles.introText}>
          すべて架空のプロフィールです。得意なデザインやヘアの気分から、
          あなたに合うスタイリストを見つけてください。
        </p>
      </section>

      <section className={styles.grid} aria-label="スタッフ一覧">
        {staffMembers.map((member) => {
          const salon = getSalonBySlug(member.salonSlug);
          const relatedStyles = member.styleIds.flatMap((styleId) => {
            const style = getHairStyleById(styleId);
            return style ? [style] : [];
          });

          if (!salon) {
            return null;
          }

          return (
            <StaffCard
              key={member.id}
              member={member}
              salonLabel={salon.name}
              styles={relatedStyles}
            />
          );
        })}
      </section>
    </div>
  );
}
