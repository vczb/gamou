import ControlCard from "@/components/ControlCard";
import Astronaut from "@/icons/Astronaut";
import Cart from "@/icons/Cart";
import Diamond from "@/icons/Diamond";
import Layer from "@/icons/Layer";
import Shop from "@/icons/Shop";
import Tags from "@/icons/Tags";

export default function Control() {
  return (
    <div className="container mx-auto px-4 pb-28 pt-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-8 max-w-4xl mx-auto">
        <ControlCard icon={Astronaut} label="Meus Dados" link="/painel/eu" />
        <ControlCard icon={Shop} label="Loja" link="/painel/loja/" />
        <ControlCard
          icon={Layer}
          label="Categorias"
          link="/painel/categorias/"
        />

        <ControlCard icon={Diamond} label="Produtos" link="/painel/produtos/" />
        <ControlCard icon={Cart} label="Pedidos " link="/painel/pedidos/" />

        <ControlCard icon={Tags} label="Promoções" link="/painel/promo/" />
      </div>
    </div>
  );
}
