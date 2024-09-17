import Link from "../Link";

type BreadcrumbProps = {
  items: {
    link: string;
    label: string;
    active?: boolean;
  }[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex gap-1">
      {items.map((item, index) => (
        <div
          className={`flex gap-1 font-bold ${
            item.active ? "text-primary-400" : "text-black"
          }`}
          key={index}
        >
          <Link
            href={item.link}
            key={item.link}
            className={`${item.active ? "pointer-events-none" : ""}`}
          >
            {item.label}
          </Link>
          {items.length - 1 !== index && (
            <b className="text-blueGray-400 pointer-events-none">/</b>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
