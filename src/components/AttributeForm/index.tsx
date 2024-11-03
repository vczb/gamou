import { Product } from "@/types/product";
import Form from "../Form";
import { slugify } from "@/utils/formatters";
import Heading from "../Heading";
import Radio from "../Radio";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { useCallback } from "react";

type FormDataObject = {
  [key: string]: FormDataEntryValue | FormDataEntryValue[];
};

export type AttributeFormProps = {
  formId: string;
  variants?: Product["variants"];
  onSubmit?: (data: FormDataObject) => void;
};

const AttributeForm = ({ formId, onSubmit, variants }: AttributeFormProps) => {
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
            <label htmlFor={titleSlug}>
              <Heading text={variant.title} tag="h3" />
            </label>

            <i className="text-xs text-blueGray-600">
              {variant.isMultiple
                ? "Selecione uma ou mais opções"
                : "Selecione uma opção"}
            </i>

            {variant.options?.map((option) => {
              return variant.isMultiple ? (
                <Checkbox
                  id={titleSlug}
                  key={option.name}
                  label={option.name}
                  name={variant.title}
                  value={option.name}
                  required={variant.isRequired}
                />
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
          </div>
        );
      })}
      <Button className="mt-6">Confirmar</Button>
    </Form>
  );
};

export default AttributeForm;
