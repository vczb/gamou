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
import NumberField from "../NumberField";
import AttributeButton from "../AttributeButton";
import { AttributeVariantProps } from "../AttributeVariant";

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
    | "number"
    | "variants";
  defaultValue?: string | boolean;
  placeholder?: string;
  editable?: boolean;
  required?: boolean;
  checked?: boolean;
  hidden?: boolean;
  className?: string;
  target?: string;
  pattern?: string;
  helperText?: string;
  step?: "1" | "0.1";
  selectOptions?: {
    label: string;
    value: string;
  }[];
  checkboxLabel?: string;
  sublabel?: string;
  variants?: AttributeVariantProps[];
  maxLength?: number;
  active?: boolean;
};

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
  const renderLabeledField = (
    key: string,
    label: string | undefined,
    fieldComponent: React.ReactNode,
    fieldId: string,
    sublabel?: string,
    hidden?: boolean
  ) => (
    <div
      className={`flex flex-col ${hidden && "hidden pointer-events-none"}`}
      key={key}
    >
      {label && (
        <label htmlFor={fieldId} className="text-black w-fit">
          <b>{label}</b>
        </label>
      )}
      {sublabel && (
        <span className="text-xs text-blueGray-800 w-fit">{sublabel}</span>
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
      className,
      step,
      hidden,
      target,
      pattern,
      sublabel,
      helperText,
      variants,
      maxLength,
      active = true,
    } = field;

    if (!active) {
      return null;
    }

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
            pattern={pattern}
            helperText={helperText}
            maxLength={maxLength}
            {...(editable
              ? { defaultValue: defaultValue as string }
              : { value: defaultValue as string, disabled: true })}
          />,
          fieldId,
          sublabel,
          hidden
        );
      case "link":
        const value = (defaultValue as string) || "";
        return renderLabeledField(
          name,
          label,
          <Link
            className={`text-primary-500 hover:text-secondary-600 ${className}`}
            href={value}
            target={target}
          >
            {value}
          </Link>,
          fieldId,
          sublabel,
          hidden
        );
      case "paragraph":
        return renderLabeledField(
          name,
          label,
          <p className={className} id={fieldId}>
            {(defaultValue as string) || ""}
          </p>,
          fieldId,
          sublabel,
          hidden
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
            maxLength={maxLength}
            {...(editable
              ? { defaultValue: defaultValue as string }
              : { value: defaultValue as string, disabled: true })}
          />,
          fieldId,
          sublabel,
          hidden
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
          fieldId,
          sublabel,
          hidden
        );
      case "text-number":
        return renderLabeledField(
          name,
          label,
          <TextField
            id={fieldId}
            type={"number"}
            step={step}
            name={name}
            placeholder={placeholder}
            pattern={pattern}
            required={required}
            helperText={helperText}
            {...(editable
              ? { defaultValue: defaultValue as string }
              : { value: defaultValue as string, disabled: true })}
          />,
          fieldId,
          sublabel,
          hidden
        );
      case "number":
        return renderLabeledField(
          name,
          label,
          <NumberField
            id={fieldId}
            name={name}
            required={required}
            inputDisabled={false}
            defaultValue={defaultValue as number | undefined}
          />,
          fieldId,
          sublabel,
          hidden
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
          fieldId,
          sublabel,
          hidden
        );
      case "upload-image":
        return renderLabeledField(
          name,
          label,
          <UploadImage
            id={fieldId}
            name={name}
            required={required}
            defaultValue={defaultValue as string}
            className={className}
          />,
          fieldId,
          sublabel,
          hidden
        );
      case "variants":
        return renderLabeledField(
          name,
          label,
          <AttributeButton
            attributeVariants={variants}
            editable={editable}
            className={className}
          />,
          fieldId,
          sublabel,
          hidden
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
