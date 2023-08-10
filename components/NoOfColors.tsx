import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const NoOfColors = ({
  noOfCol,
  setNoOfCol,
}: {
  noOfCol: number;
  setNoOfCol: (no: number) => void;
}) => {
  return (
    <div className="mb-6 grid gap-3">
      <Label htmlFor="noOfColors">No of colors</Label>
      <Select
        defaultValue={noOfCol.toString()}
        value={noOfCol.toString()}
        onValueChange={(value) => setNoOfCol(Number(value))}
      >
        <SelectTrigger id="noOfColors">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="">
          {[3, 4, 5, 6, 7, 8].map((num) => {
            return (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default NoOfColors;
