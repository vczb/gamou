"use client";

import { FormEvent, InputHTMLAttributes, useCallback } from "react";
import TextField from "../TextField";
import Search from "../../icons/Search";
import Button from "../Button";
import Trash from "@/icons/Trash";
import { useRouter } from "next/navigation";

export type SearchFieldProps = {
  searchPath: string;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchField = ({ searchPath, ...props }: SearchFieldProps) => {
  const router = useRouter();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      const searchTerm = data.get("search-term") || "";

      if (!searchTerm) return;

      const path = searchPath + `?q=${searchTerm}`;

      router.push(path);
    },
    [searchPath, router]
  );

  return (
    <form className="flex" onSubmit={onSubmit}>
      <TextField
        className="rounded-none w-full"
        {...props}
        type="search"
        name="search-term"
        required
      />
      <Button className="rounded-none rounded-e-lg" type="submit">
        <Search className="w-6 h-6" />
      </Button>
    </form>
  );
};

export default SearchField;
