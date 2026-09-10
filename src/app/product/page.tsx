import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero/PageHero";
import { ProductCard } from "@/components/product-card/ProductCard";
import { getSalonBySlug } from "@/data/salons";
import { products } from "@/data/products";
import styles from "./product.module.css";

export const metadata: Metadata = {
  title: "PRODUCT | MOOD.",
  description:
    "A fictional MOOD. LAB product range for the MOOD. salon portfolio project.",
};

export default function ProductPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <PageHero
          eyebrow="HOME CARE"
          title="PRODUCT"
          subtitle="CARE FOR YOUR MOOD."
        />
      </section>

      <section className={styles.intro}>
        <p className={styles.introLabel}>MOOD. LAB</p>
        <p className={styles.introText}>
          サロンで仕上げた質感を、毎日のケアへ。MOOD. LABは、
          髪の色・ツヤ・手触りを心地よく保つための架空プロダクトレンジです。
        </p>
      </section>

      <section className={styles.grid} aria-label="MOOD. LAB商品一覧">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            salonLabels={product.availableAt.map((slug) => {
              const salon = getSalonBySlug(slug);
              return salon?.name ?? slug.toUpperCase();
            })}
          />
        ))}
      </section>

      <section className={styles.notice}>
        <p className={styles.noticeLabel}>DEMO NOTICE</p>
        <p className={styles.noticeText}>
          掲載している商品・価格・取扱店舗はポートフォリオ用の架空設定です。
        </p>
        <p className={styles.noticeText}>購入機能はありません。</p>
      </section>
    </div>
  );
}
