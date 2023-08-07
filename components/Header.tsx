import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center px-4 py-3 bg-light/50">
      <Image
        src="/images/color-palette.png"
        width={30}
        height={30}
        alt="logo"
      />
      <div className="ml-2 text-lg font-semibold">GetPalette</div>
      <div className="ml-auto">
        <Link href="/community-palettes">Explore</Link>
      </div>
    </header>
  );
};

export default Header;
