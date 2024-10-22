import Plus from "@/icons/Plus";
import Button from "../Button";
import Checkbox from "../Checkbox";
import TextField from "../TextField";
import { useState } from "react";
import AttributeItem, { AttributeItemProps } from "../AttributeItem";

export type AttributeVariantProps = {};

const EMPTY_VARIANT = {
  name: "",
};

const AttributeVariant = () => {
  const [options, setOptions] = useState<AttributeItemProps[]>([]);

  const handleAddOption = () => {
    setOptions((prev) => [...prev, EMPTY_VARIANT]);
  };

  return (
    <div className="flex flex-col p-2 md:p-4 border-2 border-blueGray-200 rounded-lg gap-2 md:gap-4">
      <div className="flex gap-1 md:gap-2">
        <TextField name="variant-name" placeholder="Nome da variante" />
        <div className="flex flex-col">
          <Checkbox label="Obrigatório" className="text-xs" />
          <Checkbox label="Múltipla escolha" className="text-xs" />
        </div>
      </div>
      {options.map((option, idx) => (
        <AttributeItem key={idx} {...option} />
      ))}
      <Button
        size="small"
        className="flex w-fit"
        variant="secondary"
        onClick={() => handleAddOption()}
      >
        <Plus className="h-4 w-4 mr-1" /> Adicionar opção
      </Button>
    </div>
  );
};

export default AttributeVariant;
