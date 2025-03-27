import Accordion from '../Accordion';
import Heading from '../Heading';

const DATA = [
  {
    question: 'Como faço para cadastrar meus produtos no sistema?',
    answer:
      'Basta criar uma conta, acessar o painel do comerciante e adicionar seus produtos com fotos, descrições e preços. Em poucos minutos, seu catálogo estará disponível para os clientes.',
  },
  {
    question: 'Como recebo os pagamentos pelos pedidos?',
    answer:
      'O pagamento é realizado diretamente entre você e o cliente via métodos que você já utiliza, como transferência bancária, Pix, ou outro acordo feito via WhatsApp. Nosso sistema facilita a comunicação, mas o controle do pagamento é seu.',
  },
  {
    question: 'Posso gerenciar estoque dentro do sistema?',
    answer:
      'Sim! Nosso sistema permite que você gerencie o estoque de cada produto. Assim, seus clientes sempre saberão quais produtos estão disponíveis ou esgotados.',
  },
  {
    question: 'Posso atender clientes em diferentes localidades?',
    answer:
      'Sim, você pode configurar sua loja para atender clientes de qualquer região, definindo as regras de entrega e acordos diretamente pelo WhatsApp',
  },
  {
    question: 'O sistema oferece algum tipo de suporte?',
    answer:
      'Sim, oferecemos suporte via e-mail ou WhatsApp para tirar dúvidas e ajudar com qualquer dificuldade que você possa enfrentar ao configurar sua loja ou gerenciar pedidos.',
  },
  {
    question: 'O sistema é seguro para proteger os dados dos clientes?',
    answer:
      'Sim, usamos tecnologias de segurança de ponta para garantir que os dados dos seus clientes e transações sejam protegidos de forma segura e confidencial.',
  },
];

const QuestionsAndAnswers = () => {
  return (
    <div className=" bg-white py-8 p-6 pb-24" id="perguntas-respostas">
      <div className="container mx-auto grid grid-cols-1 gap-8 w-full">
        <Heading text="Perguntas e Respostas" tag="h2" />
        {DATA.map((item) => (
          <Accordion
            title={item.question}
            key={item.question}
            detailsClassName="w-full"
          >
            <p className="text-black">{item.answer}</p>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
