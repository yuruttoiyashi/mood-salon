import type { SalonSlug } from "./salons";

export type Coupon = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  targetSalon?: SalonSlug;
  notes: string[];
};

export const coupons: readonly Coupon[] = [
  {
    id: "first-visit",
    eyebrow: "FIRST VISIT",
    title: "CUT + COLOR + CARE",
    description:
      "MOOD.を初めて利用する方へ。カラーとケアを組み合わせた架空の体験プラン。",
    price: "¥11,000",
    originalPrice: "¥14,300",
    notes: [
      "初回限定の架空クーポン",
      "実際の予約・決済は行われません",
    ],
  },
  {
    id: "color-focus",
    eyebrow: "COLOR MOOD",
    title: "DOUBLE COLOR + TREATMENT",
    description:
      "ハイトーンや鮮やかな色を楽しみたい方向けの架空カラープラン。",
    price: "¥16,500",
    originalPrice: "¥19,800",
    targetSalon: "shibuya",
    notes: [
      "SHIBUYA推奨",
      "髪の状態により施術内容が変わる想定です",
    ],
  },
  {
    id: "hair-repair",
    eyebrow: "GLOSS CARE",
    title: "SHEER COLOR + PREMIUM REPAIR",
    description:
      "透明感カラーと髪質改善コンセプトのケアを組み合わせた架空プラン。",
    price: "¥18,700",
    originalPrice: "¥22,000",
    targetSalon: "omotesando",
    notes: [
      "OMOTESANDO推奨",
      "実際の予約・決済は行われません",
    ],
  },
];