import { Category } from "@/types/category";
import { Product as ProductType } from "@/types/product";
import Accordion from "../Accordion";
import Button from "../Button";
import ProductManager from "../ProductManager";
import { useCallback, useContext, useState } from "react";
import Modal from "../Modal";
import CategoryForm from "../CategoryForm";
import { CategoryContext, useCategory } from "@/hooks/use-category";
import ProductForm from "../ProductForm";
import PenSquare from "@/icons/PenSquare";

export type CategoryProductManagerProps = {
  category: Category;
  products: ProductType[];
};

const CategoryProductManager = ({
  category,
  products,
}: CategoryProductManagerProps) => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [categoryState, setCategoryState] = useState<Category | undefined>(
    category
  );
  const [productsState, setProductsState] = useState<ProductType[]>(products);

  const { categories } = useContext(CategoryContext);

  const { deleteCategory, loading: categoryLoading } = useCategory();

  const handleEditCategory = (updatedCategory?: Category) => {
    if (updatedCategory) {
      setCategoryState(updatedCategory);
      setCategoryModalOpen(false);
    }
  };

  const handleCreateProduct = (newProduct?: ProductType) => {
    if (newProduct) {
      setProductsState((prev) => [...prev, newProduct]);
      setProductModalOpen(false);
    }
  };

  const handleDeleteCategory = useCallback(
    async (categoryId: number) => {
      if (!categoryId) return;

      if (
        window.confirm(
          `Você tem certeza que quer deletar esta categoria?\n\nEsta ação não pode ser desfeita!`
        )
      ) {
        await deleteCategory(categoryId);
        setCategoryModalOpen(false);
        setCategoryState(undefined);
      }
    },
    [deleteCategory]
  );

  if (!categoryState) return <></>;

  return (
    <>
      <Modal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        showCloseButton
      >
        <CategoryForm
          category={categoryState}
          action="edit"
          handleSubmit={handleEditCategory}
        />
        <Button
          variant="light"
          type="button"
          size="small"
          className="flex ml-auto mt-2"
          onClick={() => handleDeleteCategory(categoryState.id)}
          disabled={categoryLoading}
        >
          Deletar categoria
        </Button>
      </Modal>
      <Modal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        showCloseButton
      >
        <ProductForm
          categories={categories}
          product={{ category_id: category.id }}
          action="create"
          handleSubmit={handleCreateProduct}
        />
      </Modal>
      <Accordion
        open={false}
        detailsClassName={`w-full max-w-lg ${
          !categoryState.active && "bg-blueGray-200"
        }`}
        title={
          <div className="flex items-center justify-between">
            {categoryState.title}
            {!categoryState.active && (
              <i className="text-xs ml-2 text-error">Desativada</i>
            )}
            <Button
              size="small"
              variant="light"
              onClick={() => setCategoryModalOpen(true)}
            >
              <PenSquare className="h-4 w-4" />
            </Button>
          </div>
        }
      >
        <div className="flex flex-col">
          {productsState?.length ? (
            <div className="grid gap-4">
              {productsState.map((product) => (
                <div
                  className="border-dashed border-blueGray-200 pb-4 border-b-2"
                  key={product.id}
                >
                  <ProductManager product={product} categories={categories} />
                </div>
              ))}
            </div>
          ) : (
            <i className="text-blueGray-600 mt-4">
              Esta categoria está vazia. Clique em &ldquo;Novo Produto&ldquo;
              para cadastrar um produto!
            </i>
          )}
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => setProductModalOpen(true)}
          >
            Novo Produto
          </Button>
        </div>
      </Accordion>
    </>
  );
};

export default CategoryProductManager;
