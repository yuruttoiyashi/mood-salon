import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <Link className={styles.logo} href="/">
            MOOD.
          </Link>

          <p className={styles.tagline}>
            BE YOUR OWN MOOD.
          </p>
        </div>

        <nav
          className={styles.navigation}
          aria-label="フッターナビゲーション"
        >
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.bottom}>
          <p>
            TOKYO / SHIBUYA · OMOTESANDO · SHINJUKU
          </p>

          <p>
            © MOOD. — Portfolio Demo
          </p>
        </div>
      </div>
    </footer>
  );
}