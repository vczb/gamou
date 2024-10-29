import { useState } from "react";
import Button from "../Button";
import AttributeVariant, { AttributeVariantProps } from "../AttributeVariant";
import Plus from "@/icons/Plus";

export type AttributeButtonProps = {
  attributeVariants?: AttributeVariantProps[];
};

const EMPTY_ATTRIBUTE = {
  title: "",
  fieldName: "",
};

const AttributeButton = ({ attributeVariants = [] }: AttributeButtonProps) => {
  const [attributesState, setAttributesState] =
    useState<AttributeVariantProps[]>(attributeVariants);

  const handleAddAttribute = () => {
    setAttributesState((prev) => [...prev, EMPTY_ATTRIBUTE]);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {attributesState.map((attribute, idx) => (
          <AttributeVariant
            key={idx}
            {...attribute}
            fieldName={`attribute-${idx}`}
          />
        ))}
        <Button
          onClick={() => handleAddAttribute()}
          className="flex items-center w-fit"
          type="button"
        >
          <Plus className="h-4 w-4 mr-1" /> Adicionar opção
        </Button>
      </div>
    </>
  );
};
export default AttributeButton;
