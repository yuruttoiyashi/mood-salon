"use client";

import { useState } from "react";
import { getSalonBySlug } from "@/data/salons";
import { getStaffById } from "@/data/staff";
import {
  styleCategories,
  type HairStyle,
  type StyleCategory,
} from "@/data/styles";
import { StyleCard } from "@/components/style-card/StyleCard";
import styles from "./style-gallery.module.css";

type StyleGalleryProps = {
  styles: readonly HairStyle[];
};

export function StyleGallery({ styles: hairStyles }: StyleGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | StyleCategory>(
    "all",
  );
  const visibleStyles =
    activeCategory === "all"
      ? hairStyles
      : hairStyles.filter(({ category }) => category === activeCategory);

  return (
    <section aria-label="スタイルコレクション">
      <div className={styles.filters} aria-label="スタイルカテゴリー">
        <button
          className={styles.filter}
          type="button"
          aria-pressed={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          ALL
        </button>

        {styleCategories.map(({ id, label }) => (
          <button
            key={id}
            className={styles.filter}
            type="button"
            aria-pressed={activeCategory === id}
            onClick={() => setActiveCategory(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className={styles.resultCount} aria-live="polite">
        {visibleStyles.length} {visibleStyles.length === 1 ? "STYLE" : "STYLES"}
      </p>

      {visibleStyles.length > 0 ? (
        <div className={styles.grid}>
          {visibleStyles.map((style) => {
            const staff = getStaffById(style.staffId);
            const salon = getSalonBySlug(style.salonSlug);

            return (
              <StyleCard
                key={style.id}
                style={style}
                staffName={staff?.name ?? "STAFF INFORMATION UNAVAILABLE"}
                salonLabel={salon?.name ?? "SALON INFORMATION UNAVAILABLE"}
              />
            );
          })}
        </div>
      ) : (
        <p className={styles.emptyState}>
          NO STYLES ARE AVAILABLE IN THIS CATEGORY.
        </p>
      )}
    </section>
  );
}
