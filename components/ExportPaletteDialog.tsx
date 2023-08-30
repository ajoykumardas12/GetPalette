import React, { useEffect } from "react";
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
import LinkIcon from "./icons/LinkIcon";
import { generatePaletteLink } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

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
        <div className="p-4 grid place-items-center gap-2 border border-mid/80 focus:bg-mid/20 hover:bg-mid/20 transition-colors rounded">
          <CSSIcon iconClass="w-6 h-6 xs:w-8 xs:h-8" />
          CSS
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xs xs:max-w-sm sm:max-w-lg">
        <DialogHeader>CSS</DialogHeader>
        <div className="border border-mid/40 rounded overflow-hidden">
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

const LinkExport = () => {
  const palette = usePaletteStore((state) => state.palette);
  let link = "";
  if (palette) {
    link = generatePaletteLink(palette);
  }

  const [copied, copy, resetCopied] = useCopy();
  const { toast } = useToast();

  return (
    <button
      onClick={() => {
        copy(link);
        resetCopied();
        toast({
          variant: "success",
          description: "Link copied in your clipboard.",
        });
      }}
    >
      <div
        className="p-4 grid place-items-center gap-2 border border-mid/80 focus:bg-mid/20 hover:bg-mid/20 transition-colors rounded"
        title="Copy Link"
      >
        <LinkIcon iconClass="w-6 h-6 xs:w-8 xs:h-8 stroke-[#41375d]" />
        Link
      </div>
    </button>
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

export default ExportPaletteDialog;
