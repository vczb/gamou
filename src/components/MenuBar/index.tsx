import Button from "../Button";

export type MenuBarProps = {
  items: {
    target: string;
    text: string;
    type: "link" | "button";
  }[];
};

const MenuBar = (props: MenuBarProps) => {
  const { items } = props;
  return (
    <ul className="list-reset lg:flex justify-end flex-1 items-center">
      {items.map((item) => {
        if (item.type === "link") {
          return (
            <li className="mr-3" key={item.target}>
              <a
                className={`inline-block py-2 px-4 no-underline hover:text-gray-800 text-gray-800`}
                href={item.target}
              >
                {item.text}
              </a>
            </li>
          );
        }
        return (
          <a href={item.target} key={item.target}>
            <Button variant={"primary"} className="mx-auto">
              {item.text}
            </Button>
          </a>
        );
      })}
    </ul>
  );
};

export default MenuBar;
