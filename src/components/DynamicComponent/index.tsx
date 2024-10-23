import Checkbox from "../Checkbox";
import Link from "../Link";
import NumberField from "../NumberField";
import Select from "../Select";
import TextArea from "../TextArea";
import TextField from "../TextField";
import UploadImage from "../UploadImage";

type DynamicComponentProps = {
  type: string;
} & any;

const DynamicComponent = ({ type, ...props }: DynamicComponentProps) => {
  switch (type) {
    case "email":
    case "text":
    case "password":
      return <TextField {...props} />;
    case "link":
      const value = (props?.defaultValue as string) || "";
      return (
        <Link
          {...props}
          className={`text-primary-500 hover:text-secondary-600 ${props?.className}`}
          href={value}
        >
          {value}
        </Link>
      );
    case "paragraph":
      return <p {...props}>{props?.defaultValue || ""}</p>;
    case "description":
      return <TextArea {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    case "text-number":
      return <TextField type={"number"} {...props} />;
    case "number":
      return <NumberField {...props} inputDisabled={false} />;
    case "select":
      return <Select {...props} options={props?.selectOptions || []} />;
    case "upload-image":
      return <UploadImage {...props} />;
    default:
      throw new Error(
        `The type "${type}" is not supported in the dynamic form!`
      );
  }
};

export default DynamicComponent;
