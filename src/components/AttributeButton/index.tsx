import { useState } from "react";
import Button from "../Button";
import AttributeVariant, { AttributeVariantProps } from "../AttributeVariant";
import Plus from "@/icons/Plus";

export type AttributeButtonProps = {};

const EMPTY_ATTRIBUTE = {
  title: "",
};

const AttributeButton = () => {
  const [attributes, setAttributes] = useState<AttributeVariantProps[]>([]);

  const handleAddAttribute = () => {
    setAttributes((prev) => [...prev, EMPTY_ATTRIBUTE]);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {attributes.map((attribute) => (
          <AttributeVariant key={attribute.title} {...attribute} />
        ))}
        <Button
          onClick={() => handleAddAttribute()}
          className="flex items-center w-fit"
          type="button"
        >
          <Plus className="h-4 w-4 mr-1" /> Novo atributo
        </Button>
      </div>
    </>
  );
};
export default AttributeButton;
