import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

const Header = () => {
  return (
    <>
      <header className="flex items-center px-4 py-3 bg-light/50">
        <Link href="/" className="flex">
          <Image
            src="/images/color-palette.png"
            width={30}
            height={30}
            alt="logo"
          />
          <div className="ml-2 text-lg font-semibold">GetPalette</div>
        </Link>
        <div className="ml-auto font-medium">
          <Link href="/browse">Explore</Link>
        </div>
      </header>
      <Separator />
    </>
  );
};

export default Header;
