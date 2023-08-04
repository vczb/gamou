import { InputHTMLAttributes } from "react";
import TextField from "../TextField";
import Search from "../../icons/Search";
import Button from "../Button";

export type SearchFieldProps = {} & InputHTMLAttributes<HTMLInputElement>;

const SearchField = ({ ...props }: SearchFieldProps) => {
  return (
    <div className="flex">
      <TextField className="rounded-none w-full" {...props} />
      <Button className="rounded-none rounded-e-lg">
        <Search className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default SearchField;
