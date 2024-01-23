"use client";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { usePaletteStore } from "@/store/paletteStore";
import { useCopy } from "@/hooks/useCopy";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/github.css";
import CSSIcon from "../icons/CSSIcon";
import CopyIcon from "../icons/CopyIcon";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import { generatePaleteCSS } from "@/lib/generatePaletteCSS";

const CSSExport = () => {
  const palette = usePaletteStore((state) => state.palette);
  const paletteName = usePaletteStore((state) => state.paletteName);
  const colorNames = usePaletteStore((state) => state.colorNames);
  let paletteCSS = "";
  if (palette && paletteName && colorNames)
    paletteCSS = generatePaleteCSS(palette, paletteName, colorNames);

  const [copied, copy, resetCopied] = useCopy();

  return (
    <Dialog>
      <DialogTrigger>
        <div className="grid place-items-center gap-2 rounded border border-mid/80 p-4 transition-colors hover:bg-mid/20 focus:bg-mid/20">
          <CSSIcon iconClass="w-6 h-6 xs:w-8 xs:h-8" />
          CSS
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xs xs:max-w-sm sm:max-w-lg">
        <DialogHeader>CSS</DialogHeader>
        <div className="overflow-hidden rounded border border-mid/40">
          <ScrollArea className="h-64 xs:h-72">
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
  );
};

const HighlightedCSSCode = ({ paletteCSS }: { paletteCSS: string }) => {
  hljs.registerLanguage("css", css);
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <pre className="text-xs xs:text-sm">
      <code className="language-css hljs">{paletteCSS}</code>
    </pre>
  );
};

export default CSSExport;
