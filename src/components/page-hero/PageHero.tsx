import styles from "./page-hero.module.css";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <header className={styles.hero}>
      {eyebrow && (
        <p className={styles.eyebrow}>
          {eyebrow}
        </p>
      )}

      <h1 className={styles.title}>
        {title}
      </h1>

      {subtitle && (
        <p className={styles.subtitle}>
          {subtitle}
        </p>
      )}
    </header>
  );
}