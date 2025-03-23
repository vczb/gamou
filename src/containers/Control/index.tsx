import ControlCardList from '@/components/ControlCardList';
import Astronaut from '@/icons/Astronaut';
import Layer from '@/icons/Layer';
import Shop from '@/icons/Shop';
import Box from '@/icons/Box';

const CONTROL_ACTIONS = [
  {
    link: '/painel/eu',
    label: 'Meus Dados',
    icon: Astronaut,
  },
  {
    link: '/painel/loja',
    label: 'Loja',
    icon: Shop,
  },
  {
    link: '/painel/estoque',
    label: 'Estoque',
    icon: Layer,
  },
  {
    link: '/painel/pedidos',
    label: 'Pedidos',
    icon: Box,
  },
];

export default function Control() {
  return (
    <div className="container mx-auto px-4 pb-28 pt-8">
      <ControlCardList items={CONTROL_ACTIONS} />
    </div>
  );
}
