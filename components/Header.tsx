import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center p-3 bg-light/50">
      <Image
        src="/images/color-palette.png"
        width={30}
        height={30}
        alt="logo"
      />
      <div className="ml-2 text-lg font-medium">GetPalette</div>
    </div>
  );
};

export default Header;
