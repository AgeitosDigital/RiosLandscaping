import Image from "next/image";
import { SITE } from "@/lib/constants";

type LogoProps = {
  className?: string;
  height?: number;
};

export function Logo({ className = "", height = 56 }: LogoProps) {
  return (
    <Image
      src={SITE.logo}
      alt={`${SITE.name} logo`}
      width={500}
      height={500}
      className={`h-auto w-auto rounded-md bg-white object-contain ${className}`}
      style={{ height, width: "auto", maxWidth: height * 2.2 }}
      priority
    />
  );
}
