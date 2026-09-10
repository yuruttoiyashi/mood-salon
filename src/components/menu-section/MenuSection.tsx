import type {
  MenuCategory,
  MenuItem,
} from "@/data/menus";
import styles from "./menu-section.module.css";

type MenuSectionProps = {
  category: MenuCategory;
  items: readonly MenuItem[];
};

export function MenuSection({
  category,
  items,
}: MenuSectionProps) {
  return (
    <section
      id={category.id}
      className={styles.section}
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow}>
          SERVICE
        </p>

        <h2 className={styles.title}>
          {category.label}
        </h2>

        <p className={styles.concept}>
          {category.concept}
        </p>
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.id}
            className={styles.item}
          >
            <div className={styles.itemText}>
              <h3 className={styles.itemName}>
                {item.name}
              </h3>

              <p className={styles.description}>
                {item.description}
              </p>
            </div>

            <p className={styles.price}>
              {item.price}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}