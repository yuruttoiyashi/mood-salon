import Link from "next/link";
import styles from "./text-link.module.css";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function TextLink({
  href,
  children,
}: TextLinkProps) {
  return (
    <Link className={styles.link} href={href}>
      {children}
      <span aria-hidden="true"> →</span>
    </Link>
  );
}