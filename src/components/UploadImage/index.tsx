import React, { useRef, InputHTMLAttributes } from "react";

type UploadImageProps = {
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
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        name={name}
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        {...rest}
      />
      <div className="mt-4">
        <input type="hidden" name={`${name}-src`} value={defaultValue} />
        <img ref={imgRef} src={defaultValue} alt="Preview" />
      </div>
    </div>
  );
};

export default UploadImage;
