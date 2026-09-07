import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { MobileNavigation } from "./MobileNavigation";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/">
          MOOD.
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label="メインナビゲーション"
        >
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileNavigation />
      </div>
    </header>
  );
}