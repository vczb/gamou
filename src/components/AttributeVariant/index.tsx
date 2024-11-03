import Plus from "@/icons/Plus";
import Button from "../Button";
import Checkbox from "../Checkbox";
import TextField from "../TextField";
import { useMemo, useState } from "react";
import AttributeItem, { AttributeItemProps } from "../AttributeItem";
import LabelField from "../LabelField";
import Trash from "@/icons/Trash";
import { slugify } from "@/utils/formatters";

export type AttributeVariantProps = {
  title: string;
  /** fieldName is used only for internal checking */
  fieldName?: string;
  isRequired?: boolean;
  isMultiple?: boolean;
  options?: AttributeItemProps[];
};

const EMPTY_OPTION = {
  name: "",
};

const AttributeVariant = ({
  title,
  fieldName,
  isRequired,
  isMultiple,
  options = [],
}: AttributeVariantProps) => {
  const [optionsState, setOptionsState] =
    useState<AttributeItemProps[]>(options);
  const [isActive, setIsActive] = useState(true);
  const [titleState, setTitleState] = useState(title);

  if (!isActive) return;

  const handleAddOption = () => {
    setOptionsState((prev) => [...prev, EMPTY_OPTION]);
  };

  return (
    <div className="flex flex-col p-2 md:p-4 border-2 border-blueGray-200 rounded-lg gap-2 md:gap-4">
      <LabelField label="Título:" className="w-full">
        <TextField
          name={`${fieldName}-title`}
          placeholder="Ex: Tamanho, Acompanhamento, Sabor, Cor, Etc..."
          defaultValue={titleState}
          onChange={(e) => setTitleState(e.target.value)}
        />
      </LabelField>
      <div className="flex flex-col">
        <Checkbox
          name={`${fieldName}-required`}
          label="Obrigatório"
          className="text-xs"
          defaultChecked={isRequired}
        />
        <Checkbox
          name={`${fieldName}-multiple`}
          label="Múltipla escolha"
          className="text-xs"
          defaultChecked={isMultiple}
        />
      </div>
      {optionsState.map((option, idx) => (
        <AttributeItem
          key={idx}
          fieldName={`${fieldName}-item-${idx}`}
          {...option}
        />
      ))}
      <div className="flex justify-between mt-4 py-2 border-dashed border-blueGray-200 border-t-2">
        <Button
          size="small"
          className="flex w-fit "
          variant="secondary"
          onClick={() => handleAddOption()}
          type="button"
        >
          <Plus className="h-4 w-4 mr-1" /> Novo item
        </Button>
        <Button
          className="w-fit h-fit px-1 py-1"
          size="small"
          variant="secondary"
          onClick={() => setIsActive(false)}
          type="button"
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default AttributeVariant;
