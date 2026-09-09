import { PageHero } from "@/components/page-hero/PageHero";
import { MenuSection } from "@/components/menu-section/MenuSection";
import { TextLink } from "@/components/text-link/TextLink";
import {
  getMenuItemsByCategory,
  menuCategories,
} from "@/data/menus";
import styles from "./menu.module.css";

export default function MenuPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <PageHero
          eyebrow="SERVICE / PRICE"
          title="MENU"
          subtitle="CHOOSE YOUR MOOD."
        />
      </section>

      <nav
        className={styles.categoryNav}
        aria-label="メニューカテゴリー"
      >
        {menuCategories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className={styles.categoryLink}
          >
            {category.label}
          </a>
        ))}
      </nav>

      <div className={styles.sections}>
        {menuCategories.map((category) => (
          <MenuSection
            key={category.id}
            category={category}
            items={getMenuItemsByCategory(
              category.id,
            )}
          />
        ))}
      </div>

      <section className={styles.note}>
        <p className={styles.noteLabel}>
          PRICE NOTE
        </p>

        <p className={styles.noteText}>
          掲載価格はポートフォリオ用の架空価格です。
          実際のサロンでは、髪の長さ・状態・施術の組み合わせなどにより
          料金が変わる想定です。
        </p>

        <TextLink href="/coupon">
          VIEW COUPON
        </TextLink>
      </section>
    </div>
  );
}