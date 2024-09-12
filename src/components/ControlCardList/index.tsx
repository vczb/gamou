import ControlCard, { ControlCardProps } from "../ControlCard";

export type ControlCardListProps = {
  items: ControlCardProps[];
};

const ControlCardList = ({ items }: ControlCardListProps) => {
  if (!items.length) return <></>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-8 max-w-4xl mx-auto">
      {items.map((item) => (
        <ControlCard {...item} key={item.link} />
      ))}
    </div>
  );
};

export default ControlCardList;
