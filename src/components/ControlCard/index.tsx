import { ElementType } from "react";
import Link from "../Link";

type ControlCardProps = {
  icon: ElementType;
  label: string;
  link: string;
};

const ControlCard = ({ icon, label, link }: ControlCardProps) => {
  const Icon = icon;

  return (
    <Link
      href={link}
      className="p-4 flex flex-col items-center justify-center transition-all shadow-sm hover:shadow-lg w-full gap-4 rounded border-blueGray-200 border-2 group"
    >
      <Icon className="max-w-[4rem]" />
      <b className="transition-all group-hover:text-primary-500">{label}</b>
    </Link>
  );
};

export default ControlCard;
