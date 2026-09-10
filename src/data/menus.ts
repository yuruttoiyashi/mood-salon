import type { SalonSlug } from "./salons";

export type MenuCategoryId =
  | "color"
  | "extension"
  | "hair-repair"
  | "home-care";

export type MenuCategory = {
  id: MenuCategoryId;
  label:
    | "COLOR"
    | "EXTENSION"
    | "HAIR REPAIR"
    | "HOME CARE";
  concept: string;
};

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  price: string;
  description: string;
  recommendedSalon?: SalonSlug;
};

export const menuCategories: readonly MenuCategory[] = [
  {
    id: "color",
    label: "COLOR",
    concept: "色で、その日のムードを変える。",
  },
  {
    id: "extension",
    label: "EXTENSION",
    concept: "長さも質感も、自由に足す。",
  },
  {
    id: "hair-repair",
    label: "HAIR REPAIR",
    concept: "ツヤと手触りを、土台から整える。",
  },
  {
    id: "home-care",
    label: "HOME CARE",
    concept: "サロン帰りの質感を、毎日に。",
  },
];

export const menuItems: readonly MenuItem[] = [
  {
    id: "one-color",
    category: "color",
    name: "ONE COLOR",
    price: "¥8,800",
    description:
      "髪の状態と肌なじみに合わせて、今の気分に似合う色をつくるワンカラー。",
  },
  {
    id: "transparency-color",
    category: "color",
    name: "TRANSPARENCY COLOR",
    price: "¥10,500",
    description:
      "赤みを抑え、光に透けるような柔らかな発色をつくる透明感カラー。",
    recommendedSalon: "omotesando",
  },
  {
    id: "bleach-color",
    category: "color",
    name: "BLEACH + COLOR",
    price: "¥17,600",
    description:
      "ブリーチでベースを明るくし、ハイトーンや鮮やかな色味まで表現するカラー。",
    recommendedSalon: "shibuya",
  },
  {
    id: "extension-40",
    category: "extension",
    name: "EXTENSION 40 PIECES",
    price: "¥16,500",
    description:
      "自然なボリュームアップやポイント使いにおすすめの40本エクステ。",
    recommendedSalon: "shibuya",
  },
  {
    id: "extension-60",
    category: "extension",
    name: "EXTENSION 60 PIECES",
    price: "¥22,000",
    description:
      "長さとボリュームをしっかり変えたい人向けの60本エクステ。",
    recommendedSalon: "shibuya",
  },
  {
    id: "extension-80",
    category: "extension",
    name: "EXTENSION 80 PIECES",
    price: "¥27,500",
    description:
      "ロングへの大胆なスタイルチェンジにも対応する80本エクステ。",
    recommendedSalon: "shibuya",
  },
  {
    id: "standard-repair",
    category: "hair-repair",
    name: "STANDARD REPAIR",
    price: "¥9,900",
    description:
      "乾燥やダメージをケアし、指通りのよい扱いやすい髪へ整える基本ケア。",
  },
  {
    id: "premium-repair",
    category: "hair-repair",
    name: "PREMIUM REPAIR",
    price: "¥14,300",
    description:
      "髪内部まで集中ケアし、ツヤとまとまりを高めるプレミアム髪質改善。",
    recommendedSalon: "omotesando",
  },
  {
    id: "ultimate-repair",
    category: "hair-repair",
    name: "ULTIMATE REPAIR",
    price: "¥17,600",
    description:
      "複合ダメージへ多段階でアプローチするMOOD.最高ラインの集中ケア。",
    recommendedSalon: "omotesando",
  },
  {
    id: "home-care-shampoo",
    category: "home-care",
    name: "MOOD. CARE SHAMPOO",
    price: "¥3,300",
    description:
      "カラー後の髪をやさしく洗い上げ、サロン帰りの質感を保つホームケア。",
  },
  {
    id: "home-care-mask",
    category: "home-care",
    name: "MOOD. REPAIR MASK",
    price: "¥4,400",
    description:
      "週に数回の集中ケアで、乾燥しやすい毛先へうるおいとまとまりを与えるマスク。",
  },
];

export function getMenuItemsByCategory(
  category: MenuCategoryId,
): readonly MenuItem[] {
  return menuItems.filter(
    (item) => item.category === category,
  );
}