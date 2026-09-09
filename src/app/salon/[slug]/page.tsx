import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialImage } from "@/components/editorial-image/EditorialImage";
import { PageHero } from "@/components/page-hero/PageHero";
import {
  getSalonBySlug,
  salons,
} from "@/data/salons";
import styles from "./salon-detail.module.css";

type SalonDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return salons.map((salon) => ({
    slug: salon.slug,
  }));
}

export default async function SalonDetailPage({
  params,
}: SalonDetailPageProps) {
  const { slug } = await params;
  const salon = getSalonBySlug(slug);

  if (!salon) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <PageHero
          eyebrow={salon.locationLabel}
          title={salon.name}
          subtitle={salon.tagline}
        />
      </section>

      <section className={styles.visual}>
        <EditorialImage
          image={salon.heroImage}
          sizes="100vw"
          className={styles.heroImage}
        />
      </section>

      <section className={styles.intro}>
        <p className={styles.label}>
          ABOUT
        </p>

        <p className={styles.description}>
          {salon.description}
        </p>
      </section>

      <section className={styles.details}>
        <div className={styles.detailBlock}>
          <p className={styles.label}>
            SPECIALTIES
          </p>

          <ul className={styles.specialties}>
            {salon.specialties.map(
              (specialty) => (
                <li key={specialty}>
                  {specialty}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className={styles.detailBlock}>
          <p className={styles.label}>
            ATMOSPHERE
          </p>

          <p className={styles.detailText}>
            {salon.atmosphere}
          </p>
        </div>

        <div className={styles.detailBlock}>
          <p className={styles.label}>
            ADDRESS
          </p>

          <p className={styles.detailText}>
            {salon.address}
          </p>
        </div>

        <div className={styles.detailBlock}>
          <p className={styles.label}>
            OPEN
          </p>

          <p className={styles.detailText}>
            {salon.hours}
          </p>
        </div>

        <div className={styles.detailBlock}>
          <p className={styles.label}>
            ACCESS
          </p>

          <p className={styles.detailText}>
            {salon.access}
          </p>
        </div>
      </section>

      <section className={styles.reserve}>
        <p className={styles.label}>
          BOOK YOUR MOOD
        </p>

        <h2 className={styles.reserveTitle}>
          READY FOR A NEW MOOD?
        </h2>

        <Link
          href="/reserve"
          className={styles.reserveLink}
        >
          RESERVE →
        </Link>
      </section>
    </div>
  );
}