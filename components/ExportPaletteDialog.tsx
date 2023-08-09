import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import CSSIcon from "./icons/CSSIcon";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { usePaletteStore } from "@/store/paletteStore";
import { generatePaleteCSS } from "@/lib/generatePaletteCSS";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useCopy } from "@/hooks/useCopy";
import CopyIcon from "./icons/CopyIcon";

const ExportPaletteDialog = () => {
  const palette = usePaletteStore((state) => state.palette);
  let paletteCSS = "";
  if (palette) paletteCSS = generatePaleteCSS(palette);

  const [copied, copy, resetCopied] = useCopy();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Export Palette</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 p-4">
        <Dialog>
          <DialogTrigger>
            <div className="w-20 h-20 p-4 flex flex-col items-center justify-center border border-mid/80 focus:bg-mid/20 hover:bg-mid/20 transition-colors rounded">
              <CSSIcon iconClass="" />
              CSS
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>CSS</DialogHeader>
            <div className="p-2 border border-mid/40 rounded">
              <ScrollArea className="h-72">
                <pre>{paletteCSS}</pre>
              </ScrollArea>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  copy(paletteCSS);
                  resetCopied();
                }}
                className="w-40"
              >
                {copied ? (
                  "Copied!"
                ) : (
                  <>
                    Copy <CopyIcon iconClass="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ExportPaletteDialog;
