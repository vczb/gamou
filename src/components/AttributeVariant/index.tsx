import Plus from "@/icons/Plus";
import Button from "../Button";
import Checkbox from "../Checkbox";
import TextField from "../TextField";
import { useState } from "react";
import AttributeItem, { AttributeItemProps } from "../AttributeItem";
import LabelField from "../LabelField";

export type AttributeVariantProps = {
  title: string;
  isRequired?: boolean;
  isMultiple?: boolean;
  variants?: AttributeItemProps[];
};

const EMPTY_VARIANT = {
  name: "",
};

const AttributeVariant = ({
  title,
  isRequired,
  isMultiple,
  variants = [],
}: AttributeVariantProps) => {
  const [options, setOptions] = useState<AttributeItemProps[]>(variants);

  const handleAddOption = () => {
    setOptions((prev) => [...prev, EMPTY_VARIANT]);
  };

  return (
    <div className="flex flex-col p-2 md:p-4 border-2 border-blueGray-200 rounded-lg gap-2 md:gap-4">
      <div className="flex gap-1 md:gap-2">
        <LabelField label="Título:">
          <TextField
            name="variant-name"
            placeholder="Ex: Tamanho, Acompanhamento, Sabor, Cor, Etc..."
            defaultValue={title}
          />
        </LabelField>
        <div className="flex flex-col relative top-5 ">
          <Checkbox
            label="Obrigatório"
            className="text-xs"
            defaultChecked={isRequired}
          />
          <Checkbox
            label="Múltipla escolha"
            className="text-xs"
            defaultChecked={isMultiple}
          />
        </div>
      </div>
      {options.map((option, idx) => (
        <AttributeItem key={idx} {...option} />
      ))}
      <Button
        size="small"
        className="flex w-fit mt-2"
        variant="secondary"
        onClick={() => handleAddOption()}
      >
        <Plus className="h-4 w-4 mr-1" /> Adicionar opção
      </Button>
    </div>
  );
};

export default AttributeVariant;
