import React, { useRef, InputHTMLAttributes, useCallback } from "react";
import Image from "../Image";
import Button from "../Button";

export type UploadImageProps = {
  name: string;
  defaultValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const UploadImage: React.FC<UploadImageProps> = ({
  name,
  defaultValue = "",
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleChange = () => {
    const file = inputRef.current?.files?.[0];
    if (file && imgRef.current) {
      const reader = new FileReader();
      reader.onload = () => {
        if (imgRef.current) {
          imgRef.current.src = reader.result as string;
          console.log(file.size);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = useCallback(() => {
    inputRef?.current?.click();
  }, []);

  return (
    <div>
      <input
        {...rest}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
      <Button
        size="small"
        variant="secondary"
        onClick={handleClick}
        type="button"
      >
        {defaultValue ? "Atualizar arquivo" : "Carregar arquivo"}
      </Button>
      <div className="mt-4">
        <input type="hidden" name={`${name}-src`} value={defaultValue} />
        <Image
          ref={imgRef}
          src={defaultValue}
          alt="Preview"
          className={rest.className}
        />
      </div>
      {imgRef.current?.sizes}
    </div>
  );
};

export default UploadImage;
