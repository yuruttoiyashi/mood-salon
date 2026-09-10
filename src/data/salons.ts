export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SalonSlug =
  | "shibuya"
  | "omotesando"
  | "shinjuku";

export type Salon = {
  slug: SalonSlug;
  name: string;
  locationLabel: string;
  tagline: string;
  description: string;
  specialties: string[];
  atmosphere: string;
  address: string;
  hours: string;
  access: string;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
};

export const salons: readonly Salon[] = [
  {
    slug: "shibuya",
    name: "MOOD. SHIBUYA",
    locationLabel: "SHIBUYA",
    tagline: "COLOR OUTSIDE THE LINES.",
    description:
      "ハイトーン、ビビッドカラー、エクステで、気分ごと大胆に変わるためのMOOD.。",
    specialties: [
      "HIGH TONE COLOR",
      "VIVID COLOR",
      "EXTENSION",
    ],
    atmosphere:
      "CHARCOAL / CHROME / CONCRETE",
    address:
      "東京都渋谷区神南1-00-00 MOOD. BUILDING 4F（架空住所）",
    hours: "11:00–21:00",
    access:
      "渋谷駅から徒歩5分（架空設定）",
    heroImage: {
      src: "/images/salons/shibuya-hero.jpg",
      alt: "チャコールとクロームを基調にしたMOOD. SHIBUYAの架空サロン内装",
      width: 1600,
      height: 1100,
    },
    gallery: [
      {
        src: "/images/salons/shibuya-detail-1.jpg",
        alt: "コンクリートとメタル素材を使ったMOOD. SHIBUYAの架空セット面",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/salons/shibuya-detail-2.jpg",
        alt: "ハイトーンスタイルをイメージしたMOOD. SHIBUYAの架空ビジュアル",
        width: 1200,
        height: 900,
      },
    ],
  },

  {
    slug: "omotesando",
    name: "MOOD. OMOTESANDO",
    locationLabel: "OMOTESANDO",
    tagline: "LIGHT, SHINE, TEXTURE.",
    description:
      "透明感カラーと髪質改善で、光をまとったようなやわらかさとツヤを整えるMOOD.。",
    specialties: [
      "SHEER COLOR",
      "HAIR REPAIR",
      "GLOSS CARE",
    ],
    atmosphere:
      "WHITE / SILVER / DAYLIGHT",
    address:
      "東京都港区北青山3-00-00 MOOD. AOYAMA 2F（架空住所）",
    hours: "10:00–20:00",
    access:
      "表参道駅から徒歩3分（架空設定）",
    heroImage: {
      src: "/images/salons/omotesando-hero.jpg",
      alt: "白と淡いシルバーに自然光が差し込むMOOD. OMOTESANDOの架空サロン内装",
      width: 1600,
      height: 1100,
    },
    gallery: [
      {
        src: "/images/salons/omotesando-detail-1.jpg",
        alt: "明るい自然光と柔らかな素材を使ったMOOD. OMOTESANDOの架空セット面",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/salons/omotesando-detail-2.jpg",
        alt: "透明感とツヤのあるヘアスタイルをイメージした架空ビジュアル",
        width: 1200,
        height: 900,
      },
    ],
  },

  {
    slug: "shinjuku",
    name: "MOOD. SHINJUKU",
    locationLabel: "SHINJUKU",
    tagline: "SEOUL MOOD, TOKYO RHYTHM.",
    description:
      "韓国カラーとレイヤーカットを軸に、トレンドも似合わせも楽しめるオールラウンドなMOOD.。",
    specialties: [
      "KOREAN COLOR",
      "LAYER CUT",
      "ALL ROUND",
    ],
    atmosphere:
      "WHITE / BLACK / SILVER",
    address:
      "東京都新宿区新宿3-00-00 MOOD. TERRACE 6F（架空住所）",
    hours: "11:00–21:00",
    access:
      "新宿三丁目駅から徒歩2分（架空設定）",
    heroImage: {
      src: "/images/salons/shinjuku-hero.jpg",
      alt: "白黒とシルバーを基調にしたMOOD. SHINJUKUの架空サロン内装",
      width: 1600,
      height: 1100,
    },
    gallery: [
      {
        src: "/images/salons/shinjuku-detail-1.jpg",
        alt: "白と黒の直線的なデザインを取り入れたMOOD. SHINJUKUの架空セット面",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/salons/shinjuku-detail-2.jpg",
        alt: "韓国風レイヤースタイルをイメージしたMOOD. SHINJUKUの架空ビジュアル",
        width: 1200,
        height: 900,
      },
    ],
  },
];

export function getSalonBySlug(
  slug: string,
): Salon | undefined {
  return salons.find(
    (salon) => salon.slug === slug,
  );
}