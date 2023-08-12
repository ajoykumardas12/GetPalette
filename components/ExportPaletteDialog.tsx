import React, { useEffect, useRef } from "react";
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
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/github.css";
import CheckCircleIcon from "./icons/CheckCircleIcon";

const ExportPaletteDialog = () => {
  const palette = usePaletteStore((state) => state.palette);
  const paletteName = usePaletteStore((state) => state.paletteName);
  const colorNames = usePaletteStore((state) => state.colorNames);
  let paletteCSS = "";
  if (palette && paletteName && colorNames)
    paletteCSS = generatePaleteCSS(palette, paletteName, colorNames);

  const [copied, copy, resetCopied] = useCopy();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" disabled={!palette}>
            Export Palette
          </Button>
        </DialogTrigger>
        <DialogContent>
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
                <div className="border border-mid/40 rounded overflow-hidden">
                  <ScrollArea className="h-72">
                    <HighlightedCSSCode paletteCSS={paletteCSS} />
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
                      <>
                        Copied! <CheckCircleIcon iconClass="ml-2 w-4 h-4" />
                      </>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

const HighlightedCSSCode = ({ paletteCSS }: { paletteCSS: string }) => {
  hljs.registerLanguage("css", css);
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <pre className="text-sm">
      <code className="language-css hljs">{paletteCSS}</code>
    </pre>
  );
};

export default ExportPaletteDialog;
