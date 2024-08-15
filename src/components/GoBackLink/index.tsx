import Link from "@/components/Link";
import Arrow from "@/icons/Arrow";

type GoBackLinkProps = {
  path: string;
  text: string;
};

const GoBackLink = ({ path, text }: GoBackLinkProps) => {
  return (
    <Link href={path} className="flex items-center">
      <Arrow className="h-5 rotate-180 mr-3" />
      <b className="text-primary-600 text-sm">{text}</b>
    </Link>
  );
};

export default GoBackLink;
