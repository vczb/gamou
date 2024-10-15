import { Category } from "@/types/category";
import { Product as ProductType } from "@/types/product";
import Accordion from "../Accordion";
import Image from "../Image";
import Button from "../Button";
import ProductManager from "../ProductManager";
import { useContext, useState } from "react";
import Modal from "../Modal";
import CategoryForm from "../CategoryForm";
import { CategoryContext } from "@/hooks/use-category";

export type CategoryProductManagerProps = {
  category: Category;
  products: ProductType[];
};

const CategoryProductManager = ({
  category,
  products,
}: CategoryProductManagerProps) => {
  const [open, setOpen] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>(category);
  const categories = useContext(CategoryContext);

  const handleEditCategory = (updatedCategory?: Category) => {
    if (updatedCategory) {
      setCategoryState(updatedCategory);
      setOpen(false);
    }
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} showCloseButton>
        <CategoryForm
          category={categoryState}
          action="edit"
          handleSubmit={handleEditCategory}
        />
      </Modal>
      <Accordion
        open={false}
        detailsClassName="w-full max-w-lg"
        title={
          <div
            className="flex flex-col w-full gap-2"
            title="Clique para expandir/colapsar"
          >
            <Image
              src={categoryState.image}
              className="max-h-32 font-normal text-sm text-blueGray-400"
              placeholder="Adicione uma image para esta categoria"
              alt={`Image da categoria ${categoryState.title}`}
            />
            {categoryState.title}
            <span className="text-blueGray-600 font-normal">
              {categoryState.description}
            </span>
            <Button variant="secondary" onClick={() => setOpen(true)}>
              Gerenciar categoria
            </Button>
          </div>
        }
      >
        <div className="flex flex-col">
          {products?.length ? (
            <div className="grid gap-4">
              {products.map((product) => (
                <ProductManager
                  key={product.id}
                  product={product}
                  categories={categories}
                />
              ))}
            </div>
          ) : (
            <i className="text-blueGray-600 mt-4">
              Esta categoria está vazia. Clique em &ldquo;Novo Produto&ldquo;
              para cadastrar um produto!
            </i>
          )}
          <Button variant="primary" className="mt-4">
            Novo Produto
          </Button>
        </div>
      </Accordion>
    </>
  );
};

export default CategoryProductManager;
