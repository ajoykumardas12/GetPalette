import { palette } from "@/data";
import { Separator } from "./ui/separator";
import CopyIcon from "./icons/CopyIcon";
import { Button } from "./ui/button";

const CopyPalettes = () => {
  return (
    <div className="w-full flex justify-center gap-6 my-4">
      {palette.map((colorFromPalette) => {
        return <Color key={colorFromPalette.hex} hex={colorFromPalette.hex} />;
      })}
    </div>
  );
};

const Color = ({ hex }: { hex: string }) => {
  return (
    <Button
      className="h-32 w-32 flex flex-col items-center cursor-pointer rounded-lg hover:-translate-y-1 focus:-translate-y-1 transition-transform"
      style={{ background: `${hex}` }}
    >
      <div className="flex flex-grow items-center">
        <CopyIcon iconClass="w-7 h-7 stroke-brand" />
      </div>
      <Separator className="mt-auto bg-stone-400/50" />
      <div className="p-1 text-brand">{hex}</div>
    </Button>
  );
};

export default CopyPalettes;
