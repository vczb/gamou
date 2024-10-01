import { selectInventoryByCompanySlugModel } from "@/models/store";
import { serverError, ok, unprocessableEntity } from "@/utils/http-helpers";
import { fetchCompanyBySlug } from "./companies";
import { fetchAllProductsByCompanyId } from "./products";
import { fetchAllCategoriesByUserId } from "./categories";

// TODO: Refactor for using Promise.all
export const fetchStoreBySlug = async ({ slug }: { slug: string }) => {
  try {
    const { data: companyData } = await fetchCompanyBySlug({ slug });

    const { company } = companyData;

    const { data: productsData } = await fetchAllProductsByCompanyId({
      userId: company.user_id,
    });

    const { products } = productsData;

    const { data: categoriesData } = await fetchAllCategoriesByUserId({
      userId: company.user_id,
    });

    const { categories } = categoriesData;

    if (!company || !products || !categories) {
      return unprocessableEntity("Dados da loja não foram encontrados");
    }

    return ok("Dados da loja carregados com sucesso!", {
      company,
      products,
      categories,
    });
  } catch (error) {
    console.error("Error fetching store by slug:", error);
    return serverError("Internal server error.");
  }
};

export const fetchInventoryByQuery = async ({
  slug,
  query,
}: {
  slug: string;
  query: string;
}) => {
  try {
    const inventory = await selectInventoryByCompanySlugModel({ slug });

    if (!inventory) {
      return unprocessableEntity("Inventory not found.");
    }

    // Assuming query is used to filter inventory, add your filtering logic here

    return ok("Inventory data retrieved successfully", inventory);
  } catch (error) {
    console.error("Error fetching inventory by query:", error);
    return serverError("Internal server error.");
  }
};
