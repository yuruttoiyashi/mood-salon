import { CouponCard } from "@/components/coupon-card/CouponCard";
import { PageHero } from "@/components/page-hero/PageHero";
import { SalonCard } from "@/components/salon-card/SalonCard";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { TextLink } from "@/components/text-link/TextLink";
import { coupons } from "@/data/coupons";
import { menuCategories } from "@/data/menus";
import { salons } from "@/data/salons";
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

      <section className={styles.contentSection}>
        <div className={styles.sectionInner}>
          <SectionHeading
            eyebrow="MENU"
            title="OUR SERVICES"
            description="色、長さ、質感、毎日のケアまで。今の気分に合わせて選べる4つのアプローチ。"
          />

          <div className={styles.serviceGrid}>
            {menuCategories.map((category) => (
              <article
                key={category.id}
                className={styles.serviceItem}
              >
                <p className={styles.serviceNumber}>
                  0{menuCategories.indexOf(category) + 1}
                </p>
                <h3 className={styles.serviceTitle}>
                  {category.label}
                </h3>
                <p className={styles.serviceConcept}>
                  {category.concept}
                </p>
              </article>
            ))}
          </div>

          <TextLink href="/menu">
            VIEW MENU
          </TextLink>
        </div>
      </section>

      <section className={styles.salonSection}>
        <div className={styles.sectionInner}>
          <SectionHeading
            eyebrow="SHIBUYA / OMOTESANDO / SHINJUKU"
            title="OUR SALONS"
            description="違うムード、ひとつのMOOD.。なりたい雰囲気に合わせて、3つの架空店舗から選べます。"
          />

          <div className={styles.salonGrid}>
            {salons.map((salon) => (
              <SalonCard
                key={salon.slug}
                salon={salon}
              />
            ))}
          </div>

          <TextLink href="/salon">
            VIEW SALONS
          </TextLink>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionInner}>
          <SectionHeading
            eyebrow="COUPON"
            title="SPECIAL OFFERS"
            description="ブランドの体験を気軽に試せる、ポートフォリオ用の架空プラン。"
          />

          <div className={styles.couponGrid}>
            {coupons.slice(0, 2).map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
              />
            ))}
          </div>

          <TextLink href="/coupon">
            VIEW COUPONS
          </TextLink>
        </div>
      </section>
    </>
  );
}
