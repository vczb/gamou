import { CategoryProductListProps } from "@/components/CategoryProductList";
import { Product } from "@/types/product";

export function groupProductsByCategory(products: Product[]): CategoryProductListProps[] {
  return Object.values(
    products.reduce((acc, product) => {
      const categoryUid = product.category_id.toString();

      if (!acc[categoryUid]) {
        acc[categoryUid] = {
          uid: categoryUid,
          name: product.categoryTitle || "",
          products: []
        };
      }

      acc[categoryUid].products.push({
        uid: `p${product.id}`,
        title: product.title,
        image: product.image,
        description: product.description,
        price: product.price
      });

      return acc;
    }, {} as Record<string, CategoryProductListProps>)
  );
}
