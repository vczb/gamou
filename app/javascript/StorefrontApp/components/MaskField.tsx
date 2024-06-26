import { TextField, TextFieldProps } from "@mui/material";
import { useMemo } from "react";

import InputMask from "react-input-mask";

type MaskFieldProps = {
  maskValue?: string;
  mask?: "dni" | "phone";
} & TextFieldProps;

const MaskField = ({ maskValue, mask, ...props }: MaskFieldProps) => {
  const maskField = useMemo(() => {
    switch (mask) {
      case "phone":
        return "+99 (99) 99999-9999";
      case "dni":
      default:
        return "999.999.999-99";
    }
  }, [mask]);

  return (
    <InputMask mask={maskField} defaultValue={maskValue}>
      {/* @ts-ignore */}
      {() => <TextField fullWidth {...props} />}
    </InputMask>
  );
};

export default MaskField;
