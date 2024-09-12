import ControlCardList from "@/components/ControlCardList";
import Astronaut from "@/icons/Astronaut";
import Cart from "@/icons/Cart";
import Diamond from "@/icons/Diamond";
import Layer from "@/icons/Layer";
import Shop from "@/icons/Shop";

const CONTROL_ACTIONS = [
  {
    link: "/painel/eu",
    label: "Meus Dados",
    icon: Astronaut,
  },
  {
    link: "/painel/loja",
    label: "Loja",
    icon: Shop,
  },
  {
    link: "/painel/categorias",
    label: "Categorias",
    icon: Layer,
  },
  {
    link: "/painel/produtos",
    label: "Produtos",
    icon: Diamond,
  },
  {
    link: "/painel/pedidos",
    label: "Pedidos",
    icon: Cart,
  },
];

export default function Control() {
  return (
    <div className="container mx-auto px-4 pb-28 pt-8">
      <ControlCardList items={CONTROL_ACTIONS} />
    </div>
  );
}
