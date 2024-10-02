"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Link from "@/components/Link";
import Table, { TableRow } from "@/components/Table";
import { useProduct } from "@/hooks/use-product";
import { Product } from "@/types/product";
import { useCallback, useMemo } from "react";

const BREADCUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/estoque", label: "Estoque" },
  { link: "/painel/estoque/produtos", label: "Produtos", active: true },
];

type ProductsProps = {
  products: Product[];
};

const PRODUCTS_TABLE_COLUMNS = [
  { title: "Ações", key: "actions" },
  { title: "Imagem", key: "image" },
  { title: "Título", key: "title" },
  { title: "Preço", key: "price" },
  { title: "Quantidade", key: "amount" },
  { title: "Descrição", key: "description" },
  { title: "Categoria", key: "categoryTitle" },
  { title: "Ativa", key: "active" },
];

const Products = ({ products }: ProductsProps) => {
  const { deleteProduct } = useProduct();

  const handleDelete = useCallback(
    async (productId: number) => {
      if (!productId) return;

      if (
        window.confirm(
          `Você tem certeza que quer deletar esta produto?\n\nEsta ação não pode ser desfeita!`
        )
      ) {
        await deleteProduct(productId);
      }
    },
    [deleteProduct]
  );

  const tableData = useMemo(() => {
    return products.map((product) => {
      return {
        ...product,
        image: (
          <Image
            className="w-32 h-24"
            src={product.image}
            alt={`Imagem da produto ${product.title}`}
          />
        ),
        active: product.active ? "Sim" : "Não",
        actions: (
          <div className="flex flex-col gap-4">
            <Link href={`/painel/estoque/produtos/editar/${product.id}`}>
              <Button variant="secondary" size="small" className="w-full">
                Editar
              </Button>
            </Link>
            <Button
              variant="light"
              size="small"
              className="w-full"
              onClick={() => handleDelete(product.id)}
            >
              Deletar
            </Button>
          </div>
        ),
      } as unknown as TableRow;
    });
  }, [products, handleDelete]);

  return (
    <div className="container mx-auto px-4 pb-28 pt-8 ">
      <Breadcrumb items={BREADCUMB} />
      <div className="mt-4 text-end">
        <Link href="/painel/estoque/produtos/adicionar">
          <Button variant="secondary">Adicionar produto</Button>
        </Link>
      </div>
      <div className="mt-8">
        {products.length ? (
          <div className="shadow-lg rounded-sm">
            <Table columns={PRODUCTS_TABLE_COLUMNS} data={tableData} />
          </div>
        ) : (
          <p className="text-blueGray-600 text-center">
            Não há produtos, crie um novo
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
