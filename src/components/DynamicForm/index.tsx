import Button, { ButtonProps } from "../Button";
import Form from "../Form";
import Heading from "../Heading";
import Link from "../Link";
import TextArea from "../TextArea";
import TextField from "../TextField";

type FormSubmit = {
  text: string;
  disabled?: boolean;
  variant?: ButtonProps["variant"];
};

type FormLink = {
  text: string;
  target: string;
};

export type FieldFormSchema = {
  name: string;
  label?: string;
  type: "email" | "password" | "text" | "description" | "paragraph";
  defaultValue?: string;
  placeholder?: string;
  editable?: boolean;
  required?: boolean;
};

export type DynamicFormProps = {
  formId: string;
  schema: FieldFormSchema[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  headingText?: string;
  linkProps?: FormLink;
  btnProps: FormSubmit;
};

const DynamicForm = ({
  formId,
  onSubmit,
  schema,
  headingText,
  linkProps,
  btnProps,
}: DynamicFormProps) => {
  const renderField = (field: FieldFormSchema) => {
    const {
      name,
      label,
      type,
      editable = true,
      required = false,
      defaultValue,
      placeholder,
    } = field;

    switch (type) {
      case "email":
      case "text":
      case "password":
        return (
          <label className="flex flex-col" key={name}>
            {label && <b className="text-black">{label}</b>}
            <TextField
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
              {...(editable
                ? { defaultValue }
                : { value: defaultValue, disabled: true })}
            />
          </label>
        );
      case "paragraph":
        return (
          <label className="flex flex-col" key={name}>
            {label && <b className="text-black">{label}</b>}
            <p>{field.defaultValue}</p>
          </label>
        );
      case "description":
        return (
          <label className="flex flex-col" key={name}>
            {label && <b className="text-black">{label}</b>}
            <TextArea
              name={name}
              required={required}
              placeholder={placeholder}
              {...(editable
                ? { defaultValue }
                : { value: defaultValue, disabled: true })}
            />
          </label>
        );
      default:
        throw new Error(
          `Não há suporte para o tipo ${type} no formulário dinâmico!`
        );
    }
  };

  return (
    <Form id={formId} onSubmit={onSubmit}>
      {headingText && <Heading text={headingText} />}
      {schema.map((field) => renderField(field))}
      <Button
        type="submit"
        className="mt-2"
        variant={btnProps.variant}
        disabled={btnProps.disabled}
      >
        {btnProps?.text || "Confirmar"}
      </Button>
      {linkProps && (
        <Link href={linkProps.target} className="ml-auto text-blueGray-600">
          {linkProps.text}
        </Link>
      )}
    </Form>
  );
};

export default DynamicForm;
