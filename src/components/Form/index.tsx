import renderFlashMessage from "@/utils/renderFlashMessage";
import { FormHTMLAttributes, ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  id: string;
} & FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, className = "", ...props }: FormProps) => {
  const handleInvalid = (e: React.InvalidEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    const { validity, id } = target;

    const label = document.querySelector(`label[for="${id}"]`);
    const labelText = label ? label?.textContent?.replace(/:/g, "") : undefined;

    let errorMessage = labelText ? `Erro em ${labelText}. ` : "";

    if (validity.valueMissing) {
      errorMessage += `Este campo é obrigatório.`;
    } else if (validity.typeMismatch) {
      errorMessage += `O tipo de dado inserido não é válido.`;
    } else if (validity.patternMismatch) {
      errorMessage += `O valor não corresponde ao padrão esperado.`;
    } else if (validity.tooLong) {
      errorMessage += `O valor inserido é muito longo.`;
    } else if (validity.tooShort) {
      errorMessage += `O valor inserido é muito curto.`;
    } else if (validity.rangeUnderflow) {
      errorMessage += `O valor é menor que o mínimo permitido.`;
    } else if (validity.rangeOverflow) {
      errorMessage += `O valor é maior que o máximo permitido.`;
    } else if (validity.stepMismatch) {
      errorMessage += `O valor deve seguir o passo especificado.`;
    } else if (validity.badInput) {
      errorMessage += `Entrada inválida, verifique o valor inserido.`;
    } else if (validity.customError) {
      errorMessage += `Erro personalizado: verifique o valor.`;
    } else {
      errorMessage += `Por favor, corrija este campo.`;
    }

    e.target.focus();

    renderFlashMessage({
      message: errorMessage,
      variant: "alert",
    });
  };

  return (
    <form
      {...props}
      onInvalid={handleInvalid}
      className={`shadow-lg border-sold border-2  bg-white border-b-blueGray-200 p-6 flex flex-col mx-auto  gap-2 w-full max-w-lg ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;
