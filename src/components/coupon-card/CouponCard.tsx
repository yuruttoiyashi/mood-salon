import Link from "next/link";
import type { Coupon } from "@/data/coupons";
import styles from "./coupon-card.module.css";

type CouponCardProps = {
  coupon: Coupon;
};

export function CouponCard({
  coupon,
}: CouponCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.eyebrow}>
        {coupon.eyebrow}
      </p>

      <h3 className={styles.title}>
        {coupon.title}
      </h3>

      <p className={styles.description}>
        {coupon.description}
      </p>

      <div className={styles.prices}>
        {coupon.originalPrice && (
          <p className={styles.originalPrice}>
            {coupon.originalPrice}
          </p>
        )}

        <p className={styles.price}>
          {coupon.price}
        </p>
      </div>

      <ul className={styles.notes}>
        {coupon.notes.map((note) => (
          <li key={note}>
            {note}
          </li>
        ))}
      </ul>

      <Link
        href="/reserve"
        className={styles.link}
      >
        RESERVE →
      </Link>
    </article>
  );
}