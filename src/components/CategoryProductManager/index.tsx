import { Category } from "@/types/category";
import { Product as ProductType } from "@/types/product";
import Accordion from "../Accordion";
import Image from "../Image";
import Button from "../Button";
import ProductManager from "../ProductManager";

export type CategoryProductManagerProps = {
  category: Category;
  products: ProductType[];
};

const CategoryProductManager = ({
  category,
  products,
}: CategoryProductManagerProps) => {
  return (
    <Accordion
      open={false}
      detailsClassName="w-full max-w-lg"
      title={
        <div
          className="flex flex-col w-full gap-2"
          title="Clique para expandir/colapsar"
        >
          <Image
            src={category.image}
            className="max-h-32"
            alt={category.title}
          />
          {category.title}
          <span className="text-blueGray-600 font-normal">
            {category.description}
          </span>
          <Button variant="secondary">Gerenciar categoria</Button>
        </div>
      }
    >
      <div className="flex flex-col">
        {products?.length ? (
          <div className="grid gap-4">
            {products.map((product) => (
              <ProductManager key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <i className="text-blueGray-600 mt-4">
            Esta categoria está vazia. Clique em &ldquo;Novo Produto&ldquo; para
            cadastrar um produto!
          </i>
        )}
        <Button variant="primary" className="mt-4">
          Novo Produto
        </Button>
      </div>
    </Accordion>
  );
};

export default CategoryProductManager;
