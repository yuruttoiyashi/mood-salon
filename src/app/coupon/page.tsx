import { CouponCard } from "@/components/coupon-card/CouponCard";
import { PageHero } from "@/components/page-hero/PageHero";
import { TextLink } from "@/components/text-link/TextLink";
import { coupons } from "@/data/coupons";
import styles from "./coupon.module.css";

export default function CouponPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <PageHero
          eyebrow="SPECIAL OFFER"
          title="COUPON"
          subtitle="FIND YOUR NEXT MOOD."
        />
      </section>

      <section className={styles.intro}>
        <p className={styles.introLabel}>
          SELECT YOUR MOOD
        </p>

        <p className={styles.introText}>
          初めてのカラーから、
          ハイトーンや髪質改善まで。
          今なりたい雰囲気から選べる、
          MOOD.の架空クーポンです。
        </p>
      </section>

      <section
        className={styles.grid}
        aria-label="クーポン一覧"
      >
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
          />
        ))}
      </section>

      <section className={styles.note}>
        <div>
          <p className={styles.noteLabel}>
            DEMO NOTICE
          </p>

          <h2 className={styles.noteTitle}>
            FICTIONAL OFFER
          </h2>
        </div>

        <div className={styles.noteContent}>
          <p className={styles.noteText}>
            掲載されているクーポン・価格・店舗情報は、
            ポートフォリオ制作のために作成した架空の内容です。
            RESERVEから実際の予約や決済が行われることはありません。
          </p>

          <TextLink href="/menu">
            VIEW MENU
          </TextLink>
        </div>
      </section>
    </div>
  );
}