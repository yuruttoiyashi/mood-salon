import type { ImageAsset, SalonSlug } from "./salons";

export type StyleCategory = "color" | "sheer" | "korean" | "repair";

export type StyleCategoryOption = {
  id: StyleCategory;
  label: "COLOR" | "SHEER" | "KOREAN" | "REPAIR";
};

export type HairStyle = {
  id: string;
  title: string;
  category: StyleCategory;
  description: string;
  salonSlug: SalonSlug;
  staffId: string;
  image: ImageAsset;
};

export const styleCategories: readonly StyleCategoryOption[] = [
  { id: "color", label: "COLOR" },
  { id: "sheer", label: "SHEER" },
  { id: "korean", label: "KOREAN" },
  { id: "repair", label: "REPAIR" },
];

export const hairStyles: readonly HairStyle[] = [
  {
    id: "neon-bob",
    title: "NEON BOB",
    category: "color",
    description: "鮮やかなネオンカラーが輪郭を際立たせる、エッジィなミニボブです。",
    salonSlug: "shibuya",
    staffId: "ren-aoki",
    image: {
      src: "/images/salons/shibuya-detail-2.jpg",
      alt: "ネオンカラーで切りそろえたシャープなミニボブ",
      width: 1200,
      height: 900,
    },
  },
  {
    id: "vivid-layer",
    title: "VIVID LAYER",
    category: "color",
    description: "ビビッドな発色と軽やかなレイヤーで、動くたびに表情が変わるスタイルです。",
    salonSlug: "shibuya",
    staffId: "mio-tachibana",
    image: {
      src: "/images/styles/vivid-layer.jpg",
      alt: "鮮やかなカラーが重なり合う動きのあるレイヤーヘア",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "midnight-wolf",
    title: "MIDNIGHT WOLF",
    category: "color",
    description: "深いネイビーの陰影を効かせた、無造作な質感のウルフレイヤーです。",
    salonSlug: "shibuya",
    staffId: "ren-aoki",
    image: {
      src: "/images/styles/midnight-wolf.jpg",
      alt: "深いブルーの陰影をまとった軽やかなウルフレイヤー",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "pearl-sheer",
    title: "PEARL SHEER",
    category: "sheer",
    description: "パールのような透け感とやわらかなツヤを重ねた、繊細なミディアムヘアです。",
    salonSlug: "omotesando",
    staffId: "hina-kurosawa",
    image: {
      src: "/images/salons/omotesando-detail-2.jpg",
      alt: "光を透かすようなやわらかなツヤのミディアムスタイル",
      width: 1200,
      height: 900,
    },
  },
  {
    id: "silk-long",
    title: "SILK LONG",
    category: "sheer",
    description: "なめらかなロングに透明感のある色をのせた、空気を含むような仕上がりです。",
    salonSlug: "omotesando",
    staffId: "hina-kurosawa",
    image: {
      src: "/images/styles/silk-long.jpg",
      alt: "やわらかな光を受けて流れる透明感のあるロングヘア",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "seoul-layer",
    title: "SEOUL LAYER",
    category: "korean",
    description: "顔まわりのくびれと毛流れで、軽やかな韓国風シルエットをつくります。",
    salonSlug: "shinjuku",
    staffId: "sora-minami",
    image: {
      src: "/images/salons/shinjuku-detail-2.jpg",
      alt: "顔まわりにくびれをつくった韓国風のロングレイヤー",
      width: 1200,
      height: 900,
    },
  },
  {
    id: "mocha-wave",
    title: "MOCHA WAVE",
    category: "korean",
    description: "まろやかなモカブラウンと大きなカールで、抜け感のあるウェーブに仕上げます。",
    salonSlug: "shinjuku",
    staffId: "sora-minami",
    image: {
      src: "/images/styles/mocha-wave.jpg",
      alt: "モカブラウンにゆるやかな大きいカールを重ねたウェーブヘア",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "gloss-bob",
    title: "GLOSS BOB",
    category: "repair",
    description: "毛先まで整えた丸みのあるボブに、みずみずしいツヤを与えたデザインです。",
    salonSlug: "omotesando",
    staffId: "yui-shiraishi",
    image: {
      src: "/images/styles/gloss-bob.jpg",
      alt: "毛先までなめらかに輝く丸みのあるグロッシーボブ",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "dark-gloss",
    title: "DARK GLOSS",
    category: "repair",
    description: "ダークトーンの奥行きと均一なツヤで、端正なストレートを引き立てます。",
    salonSlug: "shinjuku",
    staffId: "rina-fujimoto",
    image: {
      src: "/images/styles/dark-gloss.jpg",
      alt: "深みのあるダークカラーが艶めく端正なストレートヘア",
      width: 1200,
      height: 1500,
    },
  },
];

export function getHairStyleById(id: string): HairStyle | undefined {
  return hairStyles.find((style) => style.id === id);
}

export function getHairStylesByCategory(
  category: StyleCategory,
): readonly HairStyle[] {
  return hairStyles.filter((style) => style.category === category);
}
