import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image/EditorialImage";
import type { Product } from "@/data/products";
import styles from "./product-card.module.css";

type ProductCardProps = {
  product: Product;
  salonLabels: readonly string[];
};

export function ProductCard({
  product,
  salonLabels,
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <EditorialImage
          image={product.image}
          sizes="(max-width: 759px) 100vw, 50vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.subtitle}>{product.subtitle}</p>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>{product.price}</p>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.detail}>
          <p className={styles.label}>HOW TO USE</p>
          <p className={styles.detailText}>{product.usage}</p>
        </div>

        <div className={styles.detail}>
          <p className={styles.label}>AVAILABLE AT</p>
          <p className={styles.detailText}>{salonLabels.join(" / ")}</p>
        </div>

        <div className={styles.links}>
          <Link
            href={`/menu#${product.relatedMenuCategory}`}
            className={styles.link}
          >
            RELATED MENU →
          </Link>
          <Link href="/salon" className={styles.link}>
            SALON LIST →
          </Link>
        </div>
      </div>
    </article>
  );
}
