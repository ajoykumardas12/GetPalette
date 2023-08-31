import { IconClass } from "@/types";
import Image from "next/image";

const SVGIcon = ({ iconClass }: IconClass) => {
  return (
    <Image
      src="/icons/svg.png"
      width={50}
      height={50}
      alt="svg icon"
      className={`${iconClass} inline`}
    />
  );
};

export default SVGIcon;
