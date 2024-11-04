import { Product } from "@/types/product";
import Form from "../Form";
import { slugify } from "@/utils/formatters";
import Heading from "../Heading";
import Radio from "../Radio";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { useCallback, useRef, useState } from "react";
import { FormDataObject } from "@/types/browser";

export type AttributeFormProps = {
  formId: string;
  variants?: Product["variants"];
  onSubmit?: (data: FormDataObject) => void;
};

const AttributeForm = ({ formId, onSubmit, variants }: AttributeFormProps) => {
  const [checkedCounts, setCheckedCounts] = useState<Record<string, number>>(
    {}
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const dataObject: FormDataObject = {};

      formData.forEach((value, key) => {
        if (dataObject[key]) {
          // If the key already exists, convert it to an array or add to the array
          dataObject[key] = Array.isArray(dataObject[key])
            ? [...dataObject[key], value]
            : [dataObject[key], value];
        } else {
          // If it's the first entry for the key, simply assign the value
          dataObject[key] = value;
        }
      });

      onSubmit?.(dataObject);
    },
    [onSubmit]
  );

  const handleCheckboxChange = (variantTitle: string, isChecked: boolean) => {
    setCheckedCounts((prevCounts) => ({
      ...prevCounts,
      [variantTitle]: isChecked
        ? (prevCounts[variantTitle] || 0) + 1
        : (prevCounts[variantTitle] || 1) - 1,
    }));
  };

  if (!variants?.length) {
    return <></>;
  }
  return (
    <Form id={formId} className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Heading
        text="Selecione para continuar"
        tag="h2"
        className="border-dashed border-blueGray-200 pb-2 border-b-2"
      />
      {variants.map((variant) => {
        const titleSlug = slugify(variant.title);

        return (
          <div key={variant.title} className="flex flex-col gap-1">
            <label htmlFor={titleSlug}>{variant.title}</label>

            <i className="text-xs text-blueGray-600">
              {variant.isMultiple
                ? `Selecione uma ou mais opções ${
                    variant.isRequired ? "(obrigatório)" : "(opcional)"
                  }`
                : `Selecione uma opção ${
                    variant.isRequired ? "(obrigatório)" : "(opcional)"
                  }`}
            </i>
            <fieldset className="flex flex-col">
              {variant.options?.map((option) => {
                return variant.isMultiple ? (
                  <div key={option.name}>
                    <input
                      id={titleSlug}
                      type="checkbox"
                      required={variant.isRequired}
                      /**  TODO: Fix this error: 
                        You provided a `checked` prop to a form field without an `onChange` handler. 
                        This will render a read-only field. If the field should be mutable use `defaultChecked`. 
                        Otherwise, set either `onChange` or `readOnly`
                      */
                      checked={checkedCounts[variant.title] > 0}
                      className="hidden"
                    />
                    <Checkbox
                      id={titleSlug}
                      label={option.name}
                      name={variant.title}
                      value={option.name}
                      onChange={(e) =>
                        handleCheckboxChange(variant.title, e.target.checked)
                      }
                    />
                  </div>
                ) : (
                  <Radio
                    id={titleSlug}
                    key={option.name}
                    label={option.name}
                    name={variant.title}
                    value={option.name}
                    required={variant.isRequired}
                  />
                );
              })}
            </fieldset>
          </div>
        );
      })}
      <Button className="mt-6">Confirmar</Button>
    </Form>
  );
};

export default AttributeForm;
