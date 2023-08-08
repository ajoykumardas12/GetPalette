import { useImageStore } from "@/store/imageStore";
import ImageIcon from "./icons/ImageIcon";
import { Button } from "./ui/button";
import { ChangeEvent } from "react";

const ImageInput = () => {
  const setImage = useImageStore((state) => state.setImage);
  const imageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setImage(URL.createObjectURL(target.files[0]));
    }
  };
  return (
    <Button variant="outline" className="border-dashed border-brand/50 p-0">
      <input
        type="file"
        accept="image/png, image/jpeg"
        id="image"
        hidden
        onChange={(e) => imageInputChange(e)}
      />
      <label
        htmlFor="image"
        className="w-full h-full flex items-center justify-center gap-2 cursor-pointer"
      >
        <ImageIcon iconClass="w-5 h-5" /> Upload Image
      </label>
    </Button>
  );
};

export default ImageInput;
