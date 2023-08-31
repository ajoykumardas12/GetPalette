import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { usePaletteStore } from "@/store/paletteStore";
import { Button } from "../ui/button";
import CSSExport from "./CSSExport";
import SVGExport from "./SVGExport";
import LinkExport from "./LinkExport";

const ExportPaletteDialog = () => {
  const palette = usePaletteStore((state) => state.palette);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" disabled={!palette}>
            Export Palette
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xs xs:max-w-sm sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Export Palette</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 p-2 xs:p-4">
            <CSSExport />
            <LinkExport />
            <SVGExport />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExportPaletteDialog;
