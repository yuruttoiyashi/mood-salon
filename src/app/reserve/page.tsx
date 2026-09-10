import type { Metadata } from "next";
import { ReserveFlow } from "@/components/reserve-flow/ReserveFlow";
import styles from "./reserve.module.css";

export const metadata: Metadata = {
  title: "RESERVE | MOOD.",
};

export default function ReservePage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>DEMO RESERVATION</p>
        <h1>RESERVE</h1>
        <p>
          架空の予約フローを体験するためのポートフォリオ用デモです。入力内容は送信・保存されず、実際の予約にはなりません。
        </p>
      </header>

      <ReserveFlow />
    </div>
  );
}
