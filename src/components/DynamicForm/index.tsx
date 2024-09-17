import Button from "../Button";
import Form from "../Form";
import Heading from "../Heading";
import Link from "../Link";
import TextArea from "../TextArea";
import TextField from "../TextField";

type FormLink = {
  text: string;
  target: string;
};

type FieldFormSchema = {
  name: string;
  label: string;
  type: "email" | "password" | "text" | "description";
  defaultValue?: string;
  editable: boolean;
  required: boolean;
};

export type DynamicFormProps = {
  formId: string;
  schema: FieldFormSchema[];
  onSubmit: () => void;
  headingText?: string;
  actionLink?: FormLink;
  buttonText?: string;
};

const DynamicForm = ({
  formId,
  onSubmit,
  schema,
  headingText,
  actionLink,
  buttonText = "Confirmar",
}: DynamicFormProps) => {
  const renderField = (field: FieldFormSchema) => {
    const { name, label, type, editable, required, defaultValue } = field;

    switch (type) {
      case "email":
      case "text":
      case "password":
        return (
          <label className="flex flex-col" key={name}>
            <b className="text-black">{label}</b>
            <TextField
              type={type}
              name={name}
              required={required}
              {...(editable
                ? { defaultValue }
                : { value: defaultValue, disabled: true })}
            />
          </label>
        );

      case "description":
        return (
          <label className="flex flex-col" key={name}>
            <b className="text-black">{label}</b>
            <TextArea
              name={name}
              required={required}
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
      <Button type="submit">{buttonText}</Button>
      {actionLink && (
        <Link href={actionLink.target} className="ml-auto text-blueGray-600">
          {actionLink.text}
        </Link>
      )}
    </Form>
  );
};

export default DynamicForm;
