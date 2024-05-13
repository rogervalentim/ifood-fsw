import Image, { ImageProps } from "next/image";

export function PromoBanner(props: ImageProps) {
  return (
    <Image
      className="h-auto w-full object-contain"
      height={0}
      width={0}
      sizes="100vw"
      quality={100}
      {...props}
    />
  );
}
