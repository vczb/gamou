"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Link from "@/components/Link";
import Table from "@/components/Table";
import { useCategory } from "@/hooks/use-category";
import { Category } from "@/types/category";
import { useCallback, useMemo } from "react";

const BREADCUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/estoque", label: "Estoque" },
  { link: "/painel/estoque/categorias", label: "Categorias", active: true },
];

type CategoriesProps = {
  categories: Category[];
};

const CATEGORIES_TABLE_COLUMNS = [
  { title: "Ações", key: "actions" },
  { title: "Imagem", key: "image" },
  { title: "Título", key: "title" },
  { title: "Descrição", key: "description" },
  { title: "Ativa", key: "active" },
];

const Categories = ({ categories }: CategoriesProps) => {
  const { deleteCategory } = useCategory();

  const handleDelete = useCallback(
    async (categoryId: number) => {
      if (!categoryId) return;

      if (
        window.confirm(
          `Você tem certeza que quer deletar esta categoria?\n\nEsta ação não pode ser desfeita!`
        )
      ) {
        await deleteCategory(categoryId);
      }
    },
    [deleteCategory]
  );

  const tableData = useMemo(() => {
    return categories.map((category) => {
      return {
        ...category,
        image: (
          <Image
            className="w-32 h-24"
            src={category.image}
            alt={`Imagem da categoria ${category.title}`}
          />
        ),
        active: category.active ? "Sim" : "Não",
        actions: (
          <div className="flex flex-col gap-4">
            <Link href={`/painel/estoque/categorias/editar/${category.id}`}>
              <Button variant="secondary" size="small" className="w-full">
                Editar
              </Button>
            </Link>
            <Button
              variant="light"
              size="small"
              className="w-full"
              onClick={() => handleDelete(category.id)}
            >
              Deletar
            </Button>
          </div>
        ),
      };
    });
  }, [categories, handleDelete]);

  return (
    <div className="container mx-auto px-4 pb-28 pt-8">
      <Breadcrumb items={BREADCUMB} />
      <div className="mt-4 text-end">
        <Link href="/painel/estoque/categorias/adicionar">
          <Button variant="secondary">Adicionar categoria</Button>
        </Link>
      </div>
      <div className="mt-8">
        {categories.length ? (
          <div className="shadow-lg rounded-sm">
            <Table columns={CATEGORIES_TABLE_COLUMNS} data={tableData} />
          </div>
        ) : (
          <p className="text-blueGray-600 text-center">
            Não há categorias, crie uma nova
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
