import React from "react";
import Button, { ButtonProps } from "../Button";
import Checkbox from "../Checkbox";
import Form from "../Form";
import Heading from "../Heading";
import Link from "../Link";
import Select from "../Select";
import TextArea from "../TextArea";
import TextField from "../TextField";
import UploadImage from "../UploadImage";

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
  type:
    | "email"
    | "password"
    | "text"
    | "description"
    | "paragraph"
    | "checkbox"
    | "select"
    | "upload-image";
  defaultValue?: string | boolean;
  placeholder?: string;
  editable?: boolean;
  required?: boolean;
  checked?: boolean;
  selectOptions?: {
    label: string;
    value: string;
  }[];
  checkboxLabel?: string;
};

export type DynamicFormProps = {
  formId: string;
  schema: FieldFormSchema[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  headingText?: string;
  linkProps?: FormLink;
  btnProps?: FormSubmit;
};

const DynamicForm = ({
  formId,
  onSubmit,
  schema,
  headingText,
  linkProps,
  btnProps,
}: DynamicFormProps) => {
  const renderLabeledField = (
    key: string,
    label: string | undefined,
    fieldComponent: React.ReactNode,
    fieldId: string
  ) => (
    <div className="flex flex-col" key={key}>
      {label && (
        <label htmlFor={fieldId} className="text-black">
          <b>{label}</b>
        </label>
      )}
      {fieldComponent}
    </div>
  );

  const renderField = (field: FieldFormSchema) => {
    const {
      name,
      label,
      type,
      editable = true,
      required = false,
      defaultValue,
      placeholder,
      checked,
      selectOptions,
      checkboxLabel,
    } = field;

    const fieldId = `${formId}-${name}`;

    switch (type) {
      case "email":
      case "text":
      case "password":
        return renderLabeledField(
          name,
          label,
          <TextField
            id={fieldId}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            {...(editable
              ? { defaultValue: defaultValue as string }
              : { value: defaultValue as string, disabled: true })}
          />,
          fieldId
        );
      case "paragraph":
        return renderLabeledField(
          name,
          label,
          <p id={fieldId}>{(defaultValue as string) || ""}</p>,
          fieldId
        );
      case "description":
        return renderLabeledField(
          name,
          label,
          <TextArea
            id={fieldId}
            name={name}
            required={required}
            placeholder={placeholder}
            {...(editable
              ? { defaultValue: defaultValue as string }
              : { value: defaultValue as string, disabled: true })}
          />,
          fieldId
        );
      case "checkbox":
        return renderLabeledField(
          name,
          label,
          <Checkbox
            id={fieldId}
            name={name}
            required={required}
            defaultChecked={checked}
            label={checkboxLabel || "Sim"}
          />,
          fieldId
        );
      case "select":
        return renderLabeledField(
          name,
          label,
          <Select
            id={fieldId}
            name={name}
            required={required}
            defaultValue={defaultValue as string}
            options={selectOptions || []}
          />,
          fieldId
        );
      case "upload-image":
        return renderLabeledField(
          name,
          label,
          <UploadImage
            id={fieldId}
            name={name}
            defaultValue={defaultValue as string}
          />,
          fieldId
        );
      default:
        throw new Error(
          `The type "${type}" is not supported in the dynamic form!`
        );
    }
  };

  return (
    <Form id={formId} onSubmit={onSubmit} aria-labelledby={`${formId}-heading`}>
      {headingText && <Heading text={headingText} />}
      {schema.map((field) => renderField(field))}
      <Button
        type="submit"
        className="mt-2"
        variant={btnProps?.variant || "secondary"}
        disabled={btnProps?.disabled}
      >
        {btnProps?.text || "Confirm"}
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
