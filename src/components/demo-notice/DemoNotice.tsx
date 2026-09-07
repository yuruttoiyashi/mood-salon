import styles from "./demo-notice.module.css";

type DemoNoticeProps = {
  context?: "site" | "reservation" | "order";
};

const messages = {
  site: "このサイトは架空の美容サロンを題材にしたポートフォリオ作品です。",
  reservation:
    "このサイトはポートフォリオ用デモです。実際の予約は送信されません。",
  order:
    "このサイトはポートフォリオ用デモです。実際の購入・決済は行われません。",
} as const;

export function DemoNotice({
  context = "site",
}: DemoNoticeProps) {
  return (
    <aside
      className={styles.notice}
      aria-label="デモサイトについて"
    >
      <strong className={styles.label}>
        FICTIONAL PORTFOLIO PROJECT
      </strong>

      <p className={styles.message}>
        {messages[context]}
      </p>
    </aside>
  );
}