import { useSortStore } from "@/store/sortStore";
import SortIcon from "@/components/icons/SortIcon";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const SortPalettes = () => {
  const sortBy = useSortStore((state) => state.sortBy);
  const order = useSortStore((state) => state.order);
  const setSortBy = useSortStore((state) => state.setSortBy);
  const setOrder = useSortStore((state) => state.setOrder);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="px-2 sm:text-base">
          Sort <SortIcon iconClass="w-3 h-4 sm:w-4 sm:h-5 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[16rem] border border-stone-400 bg-stone-200 p-0 sm:max-w-md">
        <h4 className="px-3 py-2 font-semibold leading-none">
          Sort community palettes
        </h4>
        <Separator className="bg-stone-300" />
        <div className="grid gap-4 p-4">
          <div className="flex gap-4">
            <p className="font-semibold">Sort by:</p>
            <RadioGroup
              className="my-1"
              value={sortBy}
              onValueChange={(value) => {
                if (value === "createdAt") {
                  setSortBy("createdAt");
                } else if (value == "like") setSortBy("like");
              }}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value="createdAt" id="date" />
                <Label htmlFor="date">Date</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="like" id="like" />
                <Label htmlFor="like">Like</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex gap-4">
            <p className="font-semibold">Order:</p>
            <RadioGroup
              className="my-1"
              value={order}
              onValueChange={(value) => {
                if (value === "ascending") {
                  setOrder("ascending");
                } else if (value == "descending") setOrder("descending");
              }}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value="ascending" id="ascending" />
                <Label htmlFor="ascending">Ascending</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="descending" id="descending" />
                <Label htmlFor="descending">Descending</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortPalettes;
