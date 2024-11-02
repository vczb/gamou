import React, {
  useRef,
  InputHTMLAttributes,
  useCallback,
  useState,
  ChangeEvent,
} from "react";
import Image from "../Image";
import Button from "../Button";
import { MEGABITE } from "@/utils/constants";
import { trackUploadImageFailBySizeExceeded } from "@/utils/analytics";

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
  const [isOverSize, setIsOverSize] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = inputRef.current?.files?.[0];

    const maxSize = MEGABITE;

    if ((file?.size || 0) > maxSize) {
      setIsOverSize(true);
      e.target.value = "";
      trackUploadImageFailBySizeExceeded();
      return;
    }
    setIsOverSize(false);

    if (file && imgRef.current) {
      const reader = new FileReader();
      reader.onload = () => {
        if (imgRef.current) {
          imgRef.current.classList.remove("hidden");
          imgRef.current.src = reader.result as string;
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
          alt=""
          className={`${rest.className} ${defaultValue ? "" : "hidden"}`}
        />
      </div>
      {isOverSize && (
        <span className="text-sm text-red-500">
          O arquivo de imagem excede o limite máximo de tamanho permitido para
          upload (1MB). Por favor, comprima a imagem ou escolha outra com
          tamanho menor.
        </span>
      )}
    </div>
  );
};

export default UploadImage;
