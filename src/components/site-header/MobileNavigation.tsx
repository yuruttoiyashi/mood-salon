"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import styles from "./site-header.module.css";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.mobileNavigation}>
      <button
        className={styles.menuButton}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      {open && (
        <nav
          id="mobile-navigation"
          className={styles.mobilePanel}
          aria-label="モバイルナビゲーション"
        >
          <div className={styles.mobileLinks}>
            {siteConfig.navigation.map((item) => (
              <Link
                className={styles.mobileLink}
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className={styles.mobileMeta}>
            TOKYO / SHIBUYA · OMOTESANDO · SHINJUKU
          </p>
        </nav>
      )}
    </div>
  );
}