import Plus from "@/icons/Plus";
import Button from "../Button";
import Checkbox from "../Checkbox";
import TextField from "../TextField";
import { useState } from "react";
import AttributeItem, { AttributeItemProps } from "../AttributeItem";
import LabelField from "../LabelField";
import Trash from "@/icons/Trash";

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
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return;

  const handleAddOption = () => {
    setOptions((prev) => [...prev, EMPTY_VARIANT]);
  };

  return (
    <div className="flex flex-col p-2 md:p-4 border-2 border-blueGray-200 rounded-lg gap-2 md:gap-4">
      <LabelField label="Título:" className="w-full">
        <TextField
          name="attribute-title"
          placeholder="Ex: Tamanho, Acompanhamento, Sabor, Cor, Etc..."
          defaultValue={title}
        />
      </LabelField>
      <div className="flex flex-col">
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
      {options.map((option, idx) => (
        <AttributeItem key={idx} {...option} />
      ))}
      <div className="flex justify-between mt-2 py-2 border-dashed border-blueGray-200 border-t-2">
        <Button
          size="small"
          className="flex w-fit "
          variant="secondary"
          onClick={() => handleAddOption()}
          type="button"
        >
          <Plus className="h-4 w-4 mr-1" /> Adicionar opção
        </Button>
        <Button
          className=""
          size="small"
          variant="secondary"
          onClick={() => setIsActive(false)}
          type="button"
        >
          <Trash className="h-4 w-4 mr-1" />
        </Button>
      </div>
    </div>
  );
};

export default AttributeVariant;
