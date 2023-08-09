"use client";

import data from "@/__mock__/data";
import { createContext, useContext } from "react";

export type CompanyProviderProps = {
  children: React.ReactNode;
};

type Workhour = {
  open_time: string;
  close_time: string;
  week_day_id: number;
};

type Company = {
  uid: string;
  name: string;
  image: string;
  currency: string;
  workhour: Workhour[];
};

export type CompanyContextData = {
  company: Company;
  loading: boolean;
};

export const CompanyContextDefaultValues = {
  company: {
    uid: "",
    name: "",
    image: "",
    currency: "",
    workhour: [],
  },
  loading: false,
};

export const CompanyContext = createContext<CompanyContextData>(
  CompanyContextDefaultValues
);

const CompanyProvider = ({ children }: CompanyProviderProps) => {
  const company = data.company as unknown as Company;

  return (
    <CompanyContext.Provider
      value={{
        company,
        loading: false,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

const useCompany = () => useContext(CompanyContext);

export { CompanyProvider, useCompany };
