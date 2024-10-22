import { useState } from "react";
import TextField from "../TextField";
import Button from "../Button";
import Trash from "@/icons/Trash";

export type AttributeItemProps = {
  name: string;
  price_modifier?: number;
  amount_modifier?: number;
};

const AttributeItem = (item: AttributeItemProps) => {
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return;

  return (
    <div className="flex flex-col ml-4 gap-2 md:gap-4 lg:flex-row">
      <TextField name="variant-name" placeholder="Nome da variante" />
      <TextField
        name="variant-name"
        placeholder="Preco"
        type="number"
        step={0.1}
      />
      <div className="flex gap-4">
        <TextField name="variant-name" placeholder="Qtd" type="number" />
        <Button
          className="flex w-fit items-center justify-center ml-auto lg:ml-0"
          size="small"
          variant="light"
          onClick={() => setIsActive(false)}
        >
          <Trash className="h-4 w-4 mr-1" />
        </Button>
      </div>
    </div>
  );
};

export default AttributeItem;
