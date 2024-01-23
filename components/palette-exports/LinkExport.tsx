import { usePaletteStore } from "@/store/paletteStore";
import { useCopy } from "@/hooks/useCopy";
import { generatePaletteLink } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import LinkIcon from "../icons/LinkIcon";

const LinkExport = () => {
  const palette = usePaletteStore((state) => state.palette);
  let link = "";
  if (palette) {
    link = generatePaletteLink(palette);
  }

  // eslint-disable-next-line no-unused-vars
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
        className="grid place-items-center gap-2 rounded border border-mid/80 p-4 transition-colors hover:bg-mid/20 focus:bg-mid/20"
        title="Copy Link"
      >
        <LinkIcon iconClass="w-6 h-6 xs:w-8 xs:h-8 stroke-[#41375d]" />
        Link
      </div>
    </button>
  );
};

export default LinkExport;
