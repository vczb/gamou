import React from "react";
import Button, { ButtonProps } from "../Button";
import Form from "../Form";
import Heading from "../Heading";
import Link, { LinkProps } from "../Link";
import { CheckboxProps } from "../Checkbox";
import { SelectProps } from "../Select";
import { TextAreaProps } from "../TextArea";
import { TextFieldProps } from "../TextField";
import { UploadImageProps } from "../UploadImage";
import { NumberFieldProps } from "../NumberField";
import DynamicComponent from "../DynamicComponent";
import LabelField, { LabelFieldProps } from "../LabelField";

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
    | "link"
    | "checkbox"
    | "select"
    | "upload-image"
    | "text-number"
    | "number";
  selectOptions?: {
    label: string;
    value: string;
  }[];
  checkboxLabel?: string;
} & SelectProps &
  TextAreaProps &
  TextFieldProps &
  UploadImageProps &
  NumberFieldProps &
  CheckboxProps &
  LinkProps &
  LabelFieldProps;

export type DynamicFormProps = {
  formId: string;
  schema: FieldFormSchema[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  headingText?: string;
  linkProps?: FormLink;
  btnProps?: FormSubmit;
  className?: string;
};

const DynamicForm = ({
  formId,
  onSubmit,
  schema,
  headingText,
  linkProps,
  btnProps,
}: DynamicFormProps) => {
  return (
    <Form id={formId} onSubmit={onSubmit} aria-labelledby={`${formId}-heading`}>
      {headingText && <Heading text={headingText} />}
      {schema.map((field) => {
        const fieldId = `${formId}-${field?.name}`;
        return (
          <LabelField
            key={field.name}
            htmlFor={fieldId}
            label={<b>{field?.label || ""}</b>}
            sublabel={field?.sublabel || ""}
          >
            <DynamicComponent {...field} />
          </LabelField>
        );
      })}
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
