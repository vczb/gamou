import { FormEvent, InputHTMLAttributes, useCallback, useState } from "react";
import TextField from "../TextField";
import Search from "../../icons/Search";
import Button from "../Button";
import Trash from "@/icons/Trash";

export type SearchFieldProps = {
  handleSearch: (searchTerm: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchField = ({ handleSearch, ...props }: SearchFieldProps) => {
  const [searchIcon, setSearchIcon] = useState(true);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      const searchTerm = data.get("search-term") || "";

      setSearchIcon(!searchTerm);

      e.currentTarget.reset();

      return handleSearch(searchTerm as string);
    },
    [handleSearch]
  );

  return (
    <form className="flex" onSubmit={onSubmit}>
      <TextField
        className="rounded-none w-full"
        {...props}
        type="search"
        name="search-term"
      />
      <Button className="rounded-none rounded-e-lg" type="submit">
        {searchIcon ? (
          <Search className="w-6 h-6" />
        ) : (
          <Trash className="w-6 h-6" />
        )}
      </Button>
    </form>
  );
};

export default SearchField;
