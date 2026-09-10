import type { ImageAsset, SalonSlug } from "./salons";

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  salonSlug: SalonSlug;
  specialties: readonly string[];
  styleIds: readonly string[];
  bio: string;
  image: ImageAsset;
};

export const staffMembers: readonly StaffMember[] = [
  {
    id: "ren-aoki",
    name: "青木 蓮",
    role: "ART DIRECTOR",
    salonSlug: "shibuya",
    specialties: ["HIGH TONE", "DESIGN COLOR"],
    styleIds: ["neon-bob", "midnight-wolf"],
    bio: "大胆なハイトーンとデザインカラーで、その人らしい輪郭を引き出します。色の重なりまで計算した、印象に残るスタイルを提案します。",
    image: {
      src: "/images/staff/ren-aoki.jpg",
      alt: "黒いジャケットをまとったアートディレクター青木蓮のポートレート",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "mio-tachibana",
    name: "橘 美緒",
    role: "STYLIST",
    salonSlug: "shibuya",
    specialties: ["VIVID COLOR", "FACE FRAME"],
    styleIds: ["vivid-layer"],
    bio: "ビビッドカラーと顔まわりのデザインで、気分が上がる変化をつくります。初めてのカラーも、似合うバランスから一緒に見つけます。",
    image: {
      src: "/images/staff/mio-tachibana.jpg",
      alt: "明るい表情のスタイリスト橘美緒のポートレート",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "hina-kurosawa",
    name: "黒沢 陽菜",
    role: "SALON DIRECTOR",
    salonSlug: "omotesando",
    specialties: ["SHEER COLOR", "LONG HAIR"],
    styleIds: ["pearl-sheer", "silk-long"],
    bio: "透けるようなカラーとロングヘアの質感づくりを大切にしています。日常の光の中でもやわらかく見える髪へ導きます。",
    image: {
      src: "/images/staff/hina-kurosawa.jpg",
      alt: "やわらかな光の中に立つサロンディレクター黒沢陽菜のポートレート",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "yui-shiraishi",
    name: "白石 結衣",
    role: "CARE STYLIST",
    salonSlug: "omotesando",
    specialties: ["HAIR REPAIR", "GLOSS CARE"],
    styleIds: ["gloss-bob"],
    bio: "髪の状態を見極めながら、補修とツヤの両方をかなえるケアを提案します。触れたくなるなめらかさを、毎日の扱いやすさにつなげます。",
    image: {
      src: "/images/staff/yui-shiraishi.jpg",
      alt: "穏やかな微笑みを見せるケアスタイリスト白石結衣のポートレート",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "sora-minami",
    name: "南 空",
    role: "TOP STYLIST",
    salonSlug: "shinjuku",
    specialties: ["KOREAN LAYER", "WAVE"],
    styleIds: ["seoul-layer", "mocha-wave"],
    bio: "韓国風レイヤーとやわらかなウェーブで、今の気分に合う抜け感を形にします。骨格や髪の動きに合わせて、再現しやすいシルエットを整えます。",
    image: {
      src: "/images/staff/sora-minami.jpg",
      alt: "洗練された装いのトップスタイリスト南空のポートレート",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "rina-fujimoto",
    name: "藤本 凛",
    role: "STYLIST",
    salonSlug: "shinjuku",
    specialties: ["DARK TONE", "GLOSS COLOR"],
    styleIds: ["dark-gloss"],
    bio: "ダークトーンに奥行きと透明感を宿すカラーを得意としています。落ち着いた印象の中にも、光を受けたときのツヤを忍ばせます。",
    image: {
      src: "/images/staff/rina-fujimoto.jpg",
      alt: "端正な佇まいのスタイリスト藤本凛のポートレート",
      width: 1200,
      height: 1500,
    },
  },
];

export function getStaffById(id: string): StaffMember | undefined {
  return staffMembers.find((member) => member.id === id);
}

export function getStaffBySalon(
  salonSlug: SalonSlug,
): readonly StaffMember[] {
  return staffMembers.filter((member) => member.salonSlug === salonSlug);
}
