import type { MenuCategoryId } from "./menus";
import type { ImageAsset, SalonSlug } from "./salons";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  description: string;
  usage: string;
  image: ImageAsset;
  availableAt: SalonSlug[];
  relatedMenuCategory: MenuCategoryId;
};

export const products: readonly Product[] = [
  {
    id: "care-shampoo",
    name: "MOOD. CARE SHAMPOO",
    subtitle: "COLOR KEEP / DAILY",
    price: "¥3,300",
    description:
      "カラー後の髪をやさしく洗い、褪色を抑えながら軽やかなツヤを保つデイリーシャンプー。",
    usage:
      "ぬれた髪になじませて泡立て、頭皮をやさしく洗ってからよくすすいでください。",
    image: {
      src: "/images/products/care-shampoo.jpg",
      alt: "白いボトルに入ったMOOD. LAB CARE SHAMPOOの架空プロダクトパッケージ",
      width: 1200,
      height: 1200,
    },
    availableAt: ["shibuya", "omotesando", "shinjuku"],
    relatedMenuCategory: "home-care",
  },
  {
    id: "repair-mask",
    name: "MOOD. REPAIR MASK",
    subtitle: "DEEP MOISTURE / WEEKLY",
    price: "¥4,400",
    description:
      "乾燥や熱によるダメージを受けた毛先へ濃密なうるおいを届け、しっとりまとまる髪へ整える集中マスク。",
    usage:
      "シャンプー後に毛先中心になじませ、3分ほど置いてから丁寧にすすいでください。",
    image: {
      src: "/images/products/repair-mask.jpg",
      alt: "マットなジャーに入ったMOOD. LAB REPAIR MASKの架空プロダクトパッケージ",
      width: 1200,
      height: 1200,
    },
    availableAt: ["omotesando", "shinjuku"],
    relatedMenuCategory: "hair-repair",
  },
  {
    id: "color-veil-oil",
    name: "MOOD. COLOR VEIL OIL",
    subtitle: "GLOSS / HEAT CARE",
    price: "¥3,850",
    description:
      "光をやわらかく反射する薄いヴェールで髪を包み、カラーの透明感と熱スタイリング後のなめらかさを引き立てるオイル。",
    usage:
      "タオルドライ後または乾いた髪の中間から毛先に、少量ずつなじませてください。",
    image: {
      src: "/images/products/color-veil-oil.jpg",
      alt: "細身のポンプボトルに入ったMOOD. LAB COLOR VEIL OILの架空プロダクトパッケージ",
      width: 1200,
      height: 1200,
    },
    availableAt: ["shibuya", "omotesando", "shinjuku"],
    relatedMenuCategory: "color",
  },
  {
    id: "extension-serum",
    name: "MOOD. EXTENSION SERUM",
    subtitle: "SMOOTH / LIGHT",
    price: "¥3,520",
    description:
      "エクステと自髪の境目を軽やかになじませ、絡まりを防ぎながら指通りのよい質感へ導くシルキーなセラム。",
    usage:
      "乾いた髪の毛先や絡まりやすい部分に少量をなじませ、やさしくブラッシングしてください。",
    image: {
      src: "/images/products/extension-serum.jpg",
      alt: "小さなノズルボトルに入ったMOOD. LAB EXTENSION SERUMの架空プロダクトパッケージ",
      width: 1200,
      height: 1200,
    },
    availableAt: ["shibuya"],
    relatedMenuCategory: "extension",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
