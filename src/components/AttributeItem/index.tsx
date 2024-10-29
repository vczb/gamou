import { useState } from "react";
import TextField from "../TextField";
import Button from "../Button";
import Trash from "@/icons/Trash";
import LabelField from "../LabelField";
// import { DECIMAL_PATTERN } from "@/utils/regex";
// import NumberField from "../NumberField";

export type AttributeItemProps = {
  name: string;
  fieldName?: string;
  // price?: number;
  // amount?: number;
};

const AttributeItem = ({ name, fieldName }: AttributeItemProps) => {
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return;

  return (
    <div className="flex flex-col ml-4 gap-1 md:gap-2 lg:gap-4 xlg:flex-row">
      <div className="flex gap-4 items-center">
        <LabelField label="Nome:" className="text-xs w-full">
          <TextField
            name={fieldName}
            placeholder="Nome da variante"
            defaultValue={name}
            required
          />
        </LabelField>
        <Button
          className="relative top-2 flex items-center justify-center ml-auto lg:ml-0"
          size="small"
          variant="light"
          onClick={() => setIsActive(false)}
          type="button"
        >
          <Trash className="h-4 w-4 mr-1" />
        </Button>
      </div>
      {/* <LabelField label="Preço: (opcional)" className="text-xs">
        <TextField
          name="variant-price"
          placeholder="99,99"
          helperText="O valor deve ser em formato decimal ou inteiro separado por virgula ou ponto. Exemplo 99,99"
          defaultValue={price}
          pattern={DECIMAL_PATTERN.source}
          step={0.1}
        />
      </LabelField> */}
      {/* <div className="flex gap-4 items-center">
        <LabelField label="Qtd: (opcional)" className="text-xs">
          <NumberField
            name="variant-amount"
            defaultValue={amount}
            inputDisabled={false}
            inputSize="medium"
          />
        </LabelField>
        <Button
          className="relative top-2 flex items-center justify-center ml-auto lg:ml-0"
          size="small"
          variant="light"
          onClick={() => setIsActive(false)}
          type="button"
        >
          <Trash className="h-4 w-4 mr-1" />
        </Button>
      </div> */}
    </div>
  );
};

export default AttributeItem;
