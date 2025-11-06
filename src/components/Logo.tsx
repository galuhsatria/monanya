import { useTheme } from "next-themes";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/" className="flex gap-1">
      <Image
        src={
          theme === "dark"
            ? "/monanya-logo-white.png"
            : "/monanya-logo-black.png"
        }
        width={100}
        height={30}
        alt="Monanya Logo"
        unoptimized
      />
      <Badge className="bg-green-500/10 text-green-500 rounded-full text-xs h-max font-bold">
        beta
      </Badge>
    </Link>
  );
}
