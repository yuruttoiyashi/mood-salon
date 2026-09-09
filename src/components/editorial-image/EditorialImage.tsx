import Image from "next/image";
import type { ImageAsset } from "@/data/salons";
import styles from "./editorial-image.module.css";

type EditorialImageProps = {
  image: ImageAsset;
  sizes: string;
  className?: string;
};

export function EditorialImage({
  image,
  sizes,
  className,
}: EditorialImageProps) {
  const classes = [
    styles.image,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      className={classes}
    />
  );
}